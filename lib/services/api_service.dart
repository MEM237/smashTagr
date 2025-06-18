import 'dart:convert';
import 'dart:math';
import 'package:http/http.dart' as http;
import 'package:crypto/crypto.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:5000';  // <-- explicitly corrected
  static const Duration timeout = Duration(seconds: 15);

  /// Generates SmashTag tokens (CMID# and DIIT#) from backend API
  /// Returns a Map with 'cmid' and 'diit' keys
  Future<Map<String, String>> generateSmashTag() async {
    try {
      final response = await _makeRequest();
      
      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        
        // Validate response structure
        if (data.containsKey('cmid') && data.containsKey('diit')) {
          return {
            'cmid': data['cmid'].toString(),
            'diit': data['diit'].toString(),
          };
        } else {
          throw ApiException('Invalid response format from backend');
        }
      } else {
        throw ApiException('Backend API returned status ${response.statusCode}');
      }
    } on http.ClientException catch (e) {
      throw ApiException('Network error: ${e.message}');
    } catch (e) {
      throw ApiException('Failed to generate SmashTag: $e');
    }
  }

  /// Makes the HTTP POST request to backend API
  Future<http.Response> _makeRequest() async {
    final url = Uri.parse('$baseUrl/api/ritual/generate');
    final headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'SmashTagr-Flutter/1.0',
    };

    final body = json.encode({
      'metadata': {
        'timestamp': DateTime.now().toIso8601String(),
        'userAgent': 'Flutter Web',
        'randomSeed': _generateRandomSeed(),
      }
    });

    return await http.post(
      url,
      headers: headers,
      body: body,
    ).timeout(timeout);
  }

  /// Generates a cryptographically secure random seed
  String _generateRandomSeed() {
    final random = Random.secure();
    final bytes = List<int>.generate(16, (i) => random.nextInt(256));
    return sha256.convert(bytes).toString().substring(0, 12);
  }

  /// Test connectivity to backend API
  Future<bool> testConnection() async {
    try {
      final url = Uri.parse('$baseUrl/health');
      final response = await http.get(url).timeout(Duration(seconds: 5));
      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }
}

/// Custom exception for API-related errors
class ApiException implements Exception {
  final String message;
  
  const ApiException(this.message);
  
  @override
  String toString() => 'ApiException: $message';
}
