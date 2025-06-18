const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-flutter-app.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'SmashTagr API v1.0'
  });
});

// SmashTag generation endpoint
app.post('/api/ritual/generate', async (req, res) => {
  try {
    // Validate request structure
    const { metadata } = req.body;
    
    if (!metadata || !metadata.timestamp || !metadata.userAgent || !metadata.randomSeed) {
      return res.status(400).json({
        error: 'Invalid request format',
        required: ['metadata.timestamp', 'metadata.userAgent', 'metadata.randomSeed']
      });
    }
    
    // Log request for monitoring
    console.log(`SmashTag generation request from ${metadata.userAgent} at ${metadata.timestamp}`);
    
    // Generate CMID# (12-character cryptographic identifier)
    const cmidRaw = crypto.randomBytes(16).toString('hex');
    const cmidHash = crypto.createHash('sha256').update(cmidRaw + metadata.randomSeed).digest('hex');
    const cmid = `CMID#${cmidHash.substring(0, 12).toUpperCase()}`;
    
    // Generate DIIT# (8-character encrypted token)
    const diitRaw = crypto.randomBytes(8).toString('hex');
    const diitHash = crypto.createHash('sha256').update(diitRaw + metadata.timestamp).digest('hex');
    const diit = `DIIT#${diitHash.substring(0, 8).toUpperCase()}`;
    
    // Add small delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return generated tokens
    res.status(200).json({
      cmid: cmid,
      diit: diit,
      generated_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
    });
    
    console.log(`Generated tokens: ${cmid}, ${diit}`);
    
  } catch (error) {
    console.error('SmashTag generation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate SmashTag tokens'
    });
  }
});

// Rate limiting endpoint for testing
app.post('/api/test/rate-limit', (req, res) => {
  // Simulate rate limiting for testing
  const timestamp = Date.now();
  const lastRequest = req.headers['x-last-request'] || 0;
  
  if (timestamp - lastRequest < 1000) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      retry_after: 1000
    });
  }
  
  res.status(200).json({
    message: 'Rate limit test passed',
    timestamp: timestamp
  });
});

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.status(200).json({
    service: 'SmashTagr Backend API',
    version: '1.0.0',
    endpoints: {
      health: {
        method: 'GET',
        path: '/health',
        description: 'Service health check'
      },
      generate: {
        method: 'POST',
        path: '/api/ritual/generate',
        description: 'Generate CMID# and DIIT# tokens',
        request_body: {
          metadata: {
            timestamp: 'ISO 8601 timestamp',
            userAgent: 'Client user agent string',
            randomSeed: 'Cryptographic random seed'
          }
        },
        response: {
          cmid: '12-character cryptographic identifier',
          diit: '8-character encrypted token'
        }
      }
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SmashTagr Backend API running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
  console.log(`💓 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔐 Generate Endpoint: http://localhost:${PORT}/api/ritual/generate`);
});

module.exports = app;