import 'package:cloud_firestore/cloud_firestore.dart';

class UserProfile {
  final String uid;
  final String cmid;
  final String diit;
  final String email;
  final String displayName;
  final DateTime createdAt;
  final DateTime lastActive;
  final Map<String, bool> permissions;

  UserProfile({
    required this.uid,
    required this.cmid,
    required this.diit,
    required this.email,
    required this.displayName,
    required this.createdAt,
    required this.lastActive,
    required this.permissions,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      uid: json['uid'] ?? '',
      cmid: json['cmid'] ?? '',
      diit: json['diit'] ?? '',
      email: json['email'] ?? '',
      displayName: json['displayName'] ?? '',
      createdAt: json['createdAt'] is Timestamp 
        ? (json['createdAt'] as Timestamp).toDate()
        : DateTime.now(),
      lastActive: json['lastActive'] is Timestamp 
        ? (json['lastActive'] as Timestamp).toDate()
        : DateTime.now(),
      permissions: Map<String, bool>.from(json['permissions'] ?? {}),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'uid': uid,
      'cmid': cmid,
      'diit': diit,
      'email': email,
      'displayName': displayName,
      'createdAt': Timestamp.fromDate(createdAt),
      'lastActive': Timestamp.fromDate(lastActive),
      'permissions': permissions,
    };
  }

  UserProfile copyWith({
    String? uid,
    String? cmid,
    String? diit,
    String? email,
    String? displayName,
    DateTime? createdAt,
    DateTime? lastActive,
    Map<String, bool>? permissions,
  }) {
    return UserProfile(
      uid: uid ?? this.uid,
      cmid: cmid ?? this.cmid,
      diit: diit ?? this.diit,
      email: email ?? this.email,
      displayName: displayName ?? this.displayName,
      createdAt: createdAt ?? this.createdAt,
      lastActive: lastActive ?? this.lastActive,
      permissions: permissions ?? this.permissions,
    );
  }
}

class SmashTagSession {
  final String sessionId;
  final String userId;
  final DateTime createdAt;
  final DateTime expiresAt;
  final bool isActive;
  final Map<String, dynamic> metadata;

  SmashTagSession({
    required this.sessionId,
    required this.userId,
    required this.createdAt,
    required this.expiresAt,
    required this.isActive,
    required this.metadata,
  });

  factory SmashTagSession.fromJson(Map<String, dynamic> json) {
    return SmashTagSession(
      sessionId: json['sessionId'] ?? '',
      userId: json['userId'] ?? '',
      createdAt: json['createdAt'] is Timestamp 
        ? (json['createdAt'] as Timestamp).toDate()
        : DateTime.now(),
      expiresAt: json['expiresAt'] is Timestamp 
        ? (json['expiresAt'] as Timestamp).toDate()
        : DateTime.now().add(const Duration(days: 30)),
      isActive: json['isActive'] ?? true,
      metadata: Map<String, dynamic>.from(json['metadata'] ?? {}),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'sessionId': sessionId,
      'userId': userId,
      'createdAt': Timestamp.fromDate(createdAt),
      'expiresAt': Timestamp.fromDate(expiresAt),
      'isActive': isActive,
      'metadata': metadata,
    };
  }
}