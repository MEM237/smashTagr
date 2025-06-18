import 'dart:convert';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:crypto/crypto.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/data_schema.dart';
import 'api_service.dart';

class AuthService extends ChangeNotifier {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final ApiService _apiService = ApiService();
  
  User? get currentUser => _auth.currentUser;
  Stream<User?> get authStateChanges => _auth.authStateChanges();

  /// Authenticate user by generating SmashTag through backend API
  /// This is the main method called during onboarding
  Future<bool> authenticateUser() async {
    try {
      // Step 1: Generate SmashTag tokens from backend API
      final tokens = await _apiService.generateSmashTag();
      final cmid = tokens['cmid']!;
      final diit = tokens['diit']!;

      // Step 2: Create anonymous Firebase account
      final UserCredential result = await _auth.signInAnonymously();
      
      if (result.user != null) {
        // Step 3: Store tokens securely in Firestore
        await _createSmashTagProfile(result.user!, cmid, diit);
        notifyListeners();
        return true;
      }
      return false;
    } catch (e) {
      print('Authentication error: $e');
      return false;
    }
  }

  /// Creates user profile with API-generated tokens
  Future<void> _createSmashTagProfile(User user, String cmid, String diit) async {
    final userProfile = UserProfile(
      uid: user.uid,
      cmid: cmid,
      diit: diit,
      email: user.email ?? '',
      displayName: 'SmashUser_${cmid.substring(cmid.length - 4)}',
      createdAt: DateTime.now(),
      lastActive: DateTime.now(),
      permissions: {
        'location': false,
        'notifications': false,
      },
    );

    await _firestore.collection('users').doc(user.uid).set(userProfile.toJson());
  }

  /// Test connection to backend API
  Future<bool> testBackendConnection() async {
    return await _apiService.testConnection();
  }

  /// Get user profile from Firestore
  Future<UserProfile?> getUserProfile(String uid) async {
    try {
      final doc = await _firestore.collection('users').doc(uid).get();
      if (doc.exists) {
        return UserProfile.fromJson(doc.data()!);
      }
      return null;
    } catch (e) {
      print('Get user profile error: $e');
      return null;
    }
  }

  /// Get current user profile
  Future<UserProfile?> getCurrentUserProfile() async {
    final user = currentUser;
    if (user != null) {
      return await getUserProfile(user.uid);
    }
    return null;
  }

  /// Update last active timestamp
  Future<void> _updateLastActive(String uid) async {
    await _firestore.collection('users').doc(uid).update({
      'lastActive': Timestamp.fromDate(DateTime.now()),
    });
  }

  /// Update user permissions
  Future<void> updatePermissions(String uid, Map<String, bool> permissions) async {
    await _firestore.collection('users').doc(uid).update({
      'permissions': permissions,
    });
  }

  /// Sign out user
  Future<void> signOut() async {
    await _auth.signOut();
    notifyListeners();
  }

  /// Delete user account and data
  Future<void> deleteAccount() async {
    final user = _auth.currentUser;
    if (user != null) {
      // Delete user data from Firestore
      await _firestore.collection('users').doc(user.uid).delete();
      
      // Delete user account
      await user.delete();
      notifyListeners();
    }
  }

  /// Encrypt sensitive data
  String encryptData(String data) {
    final bytes = utf8.encode(data);
    final digest = sha256.convert(bytes);
    return base64.encode(digest.bytes);
  }

  /// Generate secure random token
  String generateSecureToken() {
    final random = Random.secure();
    final bytes = List<int>.generate(32, (i) => random.nextInt(256));
    return base64.encode(bytes);
  }

  /// Developer bypass method for testing UI without authentication
  Future<bool> developerBypass() async {
    try {
      // Create a temporary anonymous session for developers
      final result = await _auth.signInAnonymously();
      if (result.user != null) {
        // Create minimal profile for developer testing
        final userProfile = UserProfile(
          uid: result.user!.uid,
          cmid: 'DEV#${DateTime.now().millisecondsSinceEpoch.toString().substring(7)}',
          diit: 'TEST#${Random().nextInt(9999).toString().padLeft(4, '0')}',
          email: 'developer@test.com',
          displayName: 'Developer Test User',
          createdAt: DateTime.now(),
          lastActive: DateTime.now(),
          permissions: {
            'location': true,
            'notifications': true,
          },
        );
        
        await _firestore.collection('users').doc(result.user!.uid).set(userProfile.toJson());
        notifyListeners();
        return true;
      }
      return false;
    } catch (e) {
      print('Developer bypass error: $e');
      return false;
    }
  }
}