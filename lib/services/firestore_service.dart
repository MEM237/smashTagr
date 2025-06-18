// DEPRECATED: This file is no longer used in SmashTagr v2.0
// Complex firestore operations have been simplified
// Only basic user profile management is now needed

// This file is kept for reference but should not be imported or used
// The new simplified architecture uses:
// - lib/services/auth_service.dart for user authentication and profile management
// - lib/models/data_schema.dart for UserProfile data structure only

/*
Previous complex firestore operations have been replaced with:
- Simple user profile CRUD operations in AuthService
- Direct Firebase Auth integration
- Simplified data schema with UserProfile only
*/

class DeprecatedFirestoreService {
  static void showDeprecationWarning() {
    print('WARNING: FirestoreService is deprecated. Use AuthService for user management.');
  }
}