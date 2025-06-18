import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../theme.dart';

class OnboardingPage extends StatefulWidget {
  const OnboardingPage({super.key});

  @override
  OnboardingPageState createState() => OnboardingPageState();
}

class OnboardingPageState extends State<OnboardingPage>
    with TickerProviderStateMixin {
  late AnimationController _splashController;
  late AnimationController _formController;
  late AnimationController _glitchController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _pulseAnimation;
  late Animation<double> _rotationAnimation;

  bool _showForm = false;
  bool _isLoading = false;
  String? _generatedCMID;
  String? _generatedDIIT;
  bool _isDeveloperMode = false;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _startSplashSequence();
  }

  void _initializeAnimations() {
    _splashController = AnimationController(
      duration: const Duration(milliseconds: 3000),
      vsync: this,
    );

    _formController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );

    _glitchController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    )..repeat(reverse: true);

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _formController,
      curve: Curves.easeOutQuart,
    ));

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _formController,
      curve: Curves.easeOutBack,
    ));

    _pulseAnimation = Tween<double>(
      begin: 0.95,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _glitchController,
      curve: Curves.easeInOut,
    ));

    _rotationAnimation = Tween<double>(
      begin: -0.05,
      end: 0.05,
    ).animate(CurvedAnimation(
      parent: _glitchController,
      curve: Curves.easeInOut,
    ));
  }

  void _startSplashSequence() async {
    await _splashController.forward();
    if (mounted) {
      setState(() => _showForm = true);
      _formController.forward();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              const Color(0xFF0A0A0A),
              const Color(0xFF1A1A2E),
              const Color(0xFF16213E),
            ],
          ),
        ),
        child: Stack(
          children: [
            _buildGlitchBackground(),
            SafeArea(
              child: _showForm ? _buildOnboardingForm() : _buildSplashScreen(),
            ),
            if (_isDeveloperMode) _buildDeveloperOverlay(),
          ],
        ),
      ),
    );
  }

  Widget _buildSplashScreen() {
    return Center(
      child: AnimatedBuilder(
        animation: _splashController,
        builder: (context, child) {
          return Transform.rotate(
            angle: _splashController.value * 6.28,
            child: Icon(
              Icons.fingerprint,
              size: 100,
              color: Theme.of(context).colorScheme.primary.withOpacity(
                _splashController.value,
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildGlitchBackground() {
    return AnimatedBuilder(
      animation: _glitchController,
      builder: (context, child) {
        return Positioned.fill(
          child: Opacity(
            opacity: 0.1 + (_glitchController.value * 0.05),
            child: Container(
              decoration: const BoxDecoration(
                image: DecorationImage(
                  image: NetworkImage(
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJkaWFnb25hbCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQiIGhlaWdodD0iNCI+CiAgICAgIDxwYXRoIGQ9Ik0gMCw0IGwgNCwtNCBNIC0xLDEgbCAyLC0yIE0gMyw1IGwgMiwtMiIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkaWFnb25hbCkiLz4KPC9zdmc+',
                  ),
                  repeat: ImageRepeat.repeat,
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildOnboardingForm() {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: SlideTransition(
        position: _slideAnimation,
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            children: [
              const Spacer(),
              _buildHeader(),
              const SizedBox(height: 40),
              _buildIdentityCards(),
              const SizedBox(height: 40),
              _buildGenerateButton(),
              const SizedBox(height: 24),
              _buildConnectionStatus(),
              const Spacer(),
              _buildFooter(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          AnimatedBuilder(
            animation: _glitchController,
            builder: (context, child) {
              return Transform.scale(
                scale: 0.8 + _pulseAnimation.value * 0.2,
                child: Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: LinearGradient(
                      colors: [
                        Theme.of(context).colorScheme.primary,
                        Theme.of(context).colorScheme.secondary,
                      ],
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: Theme.of(context).colorScheme.primary.withOpacity(0.3),
                        blurRadius: 15,
                        spreadRadius: 3,
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.auto_awesome,
                    size: 40,
                    color: Colors.white,
                  ),
                ),
              );
            },
          ),
          const SizedBox(height: 16),
          Text(
            'Generate Your SmashTag',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            'Create your unique digital identity with\nCMID# and DIIT# tokens automatically',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: Colors.white.withOpacity(0.8),
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildIdentityCards() {
    return Row(
      children: [
        Expanded(
          child: _buildIdentityCard(
            'CMID#',
            _generatedCMID ?? 'XXXXXXXXXXXX',
            Icons.security,
            'Cryptographic ID',
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: _buildIdentityCard(
            'DIIT#',
            _generatedDIIT ?? 'XXXXXXXX',
            Icons.token,
            'Digital Token',
          ),
        ),
      ],
    );
  }

  Widget _buildIdentityCard(String title, String value, IconData icon, String subtitle) {
    final isGenerated = _generatedCMID != null && _generatedDIIT != null;
    
    return AnimatedBuilder(
      animation: _glitchController,
      builder: (context, child) {
        return Transform.rotate(
          angle: _rotationAnimation.value * 0.05,
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: isGenerated
                  ? [
                      Theme.of(context).colorScheme.primary.withOpacity(0.2),
                      Theme.of(context).colorScheme.secondary.withOpacity(0.1),
                    ]
                  : [
                      Colors.grey.withOpacity(0.1),
                      Colors.grey.withOpacity(0.05),
                    ],
              ),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: isGenerated
                  ? Theme.of(context).colorScheme.primary.withOpacity(0.3)
                  : Colors.grey.withOpacity(0.2),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(
                      icon,
                      color: isGenerated
                        ? Theme.of(context).colorScheme.primary
                        : Colors.grey,
                      size: 24,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      title,
                      style: Theme.of(context).textTheme.titleSmall?.copyWith(
                        color: isGenerated
                          ? Theme.of(context).colorScheme.primary
                          : Colors.grey,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  value,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: isGenerated ? Colors.white : Colors.grey,
                    fontFamily: 'monospace',
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: isGenerated 
                      ? Colors.white.withOpacity(0.7)
                      : Colors.grey.withOpacity(0.7),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildGenerateButton() {
    return AnimatedBuilder(
      animation: _glitchController,
      builder: (context, child) {
        return Container(
          width: double.infinity,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Theme.of(context).colorScheme.primary,
                Theme.of(context).colorScheme.secondary,
              ],
            ),
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Theme.of(context).colorScheme.primary.withOpacity(0.4),
                blurRadius: 20,
                spreadRadius: 2,
              ),
            ],
          ),
          child: ElevatedButton(
            onPressed: !_isLoading ? _generateSmashTag : null,
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.transparent,
              shadowColor: Colors.transparent,
              padding: const EdgeInsets.symmetric(vertical: 20),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
            ),
            child: _isLoading
              ? const SizedBox(
                  height: 24,
                  width: 24,
                  child: CircularProgressIndicator(
                    strokeWidth: 3,
                    valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                  ),
                )
              : Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.auto_awesome,
                      color: Colors.white,
                      size: 24,
                    ),
                    const SizedBox(width: 12),
                    Text(
                      'Generate Your SmashTag',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
          ),
        );
      },
    );
  }

  Widget _buildConnectionStatus() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.green.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: Colors.green.withOpacity(0.3),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.cloud_done,
            color: Colors.green,
            size: 16,
          ),
          const SizedBox(width: 8),
          Text(
            'Connected to Backend API',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: Colors.green,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFooter() {
    return Column(
      children: [
        GestureDetector(
          onTap: _toggleDeveloperMode,
          child: Container(
            padding: const EdgeInsets.all(8),
            child: Text(
              'SmashTagr v2.0 - API Powered',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.white.withOpacity(0.5),
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.security,
              color: Colors.white.withOpacity(0.3),
              size: 12,
            ),
            const SizedBox(width: 4),
            Text(
              'Secure • Decentralized • Anonymous',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.white.withOpacity(0.3),
                fontSize: 10,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildDeveloperOverlay() {
    return Positioned(
      top: 50,
      right: 20,
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.orange.withOpacity(0.9),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Developer Mode',
              style: Theme.of(context).textTheme.labelSmall?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: _bypassToApp,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: Colors.orange,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              ),
              child: const Text('Bypass Login'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _generateSmashTag() async {
    setState(() => _isLoading = true);
    
    try {
      final authService = Provider.of<AuthService>(context, listen: false);
      
      // Use the new API-based authentication
      final result = await authService.authenticateUser();
      
      if (result) {
        // Get the generated profile to display tokens
        final profile = await authService.getCurrentUserProfile();
        
        if (profile != null) {
          setState(() {
            _generatedCMID = profile.cmid;
            _generatedDIIT = profile.diit;
          });
          
          // Add celebratory haptic feedback
          HapticFeedback.mediumImpact();
          
          _showSnackBar('SmashTag generated successfully! 🎉', isError: false);
          
          // Navigate to dashboard after a brief delay
          await Future.delayed(const Duration(seconds: 2));
          if (mounted) {
            Navigator.of(context).pushReplacementNamed('/dashboard');
          }
        }
      } else {
        _showSnackBar('Failed to generate SmashTag. Please check your connection.', isError: true);
      }
    } catch (e) {
      _showSnackBar('Error: ${e.toString()}', isError: true);
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  void _toggleDeveloperMode() {
    setState(() {
      _isDeveloperMode = !_isDeveloperMode;
    });
  }

  void _bypassToApp() async {
    final authService = Provider.of<AuthService>(context, listen: false);
    await authService.developerBypass();
    if (mounted) {
      Navigator.of(context).pushReplacementNamed('/dashboard');
    }
  }

  void _showSnackBar(String message, {required bool isError}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError 
          ? Theme.of(context).colorScheme.error 
          : Theme.of(context).colorScheme.primary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _splashController.dispose();
    _formController.dispose();
    _glitchController.dispose();
    super.dispose();
  }
}