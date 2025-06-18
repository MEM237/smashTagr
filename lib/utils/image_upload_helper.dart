// DEPRECATED: This file is no longer used in SmashTagr v2.0
// Camera functionality has been removed from the onboarding process
// SmashTag tokens are now generated automatically via backend API

// This file is kept for reference but should not be imported or used
// If you see imports of this file, please remove them and update to use the new API-based authentication

/*
Previous camera-based functionality has been replaced with:
- lib/services/api_service.dart for backend token generation
- lib/services/auth_service.dart for streamlined authentication
- No camera permissions or image capture required
*/

class DeprecatedImageUploadHelper {
  static void showDeprecationWarning() {
    print('WARNING: ImageUploadHelper is deprecated. Use ApiService for token generation.');
  }
}