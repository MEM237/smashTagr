# SmashTagr Backend API

A secure Node.js/Express backend service that generates cryptographic identity tokens (CMID# and DIIT#) for the SmashTagr mobile application.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)

### Installation

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env file with your configuration
```

4. **Start development server**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Health Check
```
GET /health
```
Returns service health status and basic information.

### Generate SmashTag Tokens
```
POST /api/ritual/generate
Content-Type: application/json

{
  "metadata": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "userAgent": "Flutter Web",
    "randomSeed": "abc123def456"
  }
}
```

**Response:**
```json
{
  "cmid": "CMID#A1B2C3D4E5F6",
  "diit": "DIIT#X7Y8Z9W0",
  "generated_at": "2024-01-15T10:30:00.000Z",
  "expires_at": "2025-01-15T10:30:00.000Z"
}
```

### API Documentation
```
GET /api/docs
```
Returns complete API documentation in JSON format.

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `NODE_ENV` | development | Environment mode |
| `ALLOWED_ORIGINS` | localhost:3000 | CORS allowed origins |
| `RATE_LIMIT_MAX_REQUESTS` | 100 | Rate limit per window |
| `RATE_LIMIT_WINDOW_MS` | 60000 | Rate limit window (ms) |

### Security Features

- **CORS Protection**: Configurable allowed origins
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Validates all request payloads
- **Cryptographic Tokens**: Uses Node.js crypto module for secure token generation
- **Error Handling**: Comprehensive error handling and logging

## 🏗️ Architecture

### Token Generation Process

1. **Request Validation**: Validates metadata structure and required fields
2. **Entropy Collection**: Combines client random seed with server entropy
3. **CMID Generation**: Creates 12-character cryptographic identifier using SHA-256
4. **DIIT Generation**: Creates 8-character digital token using timestamp entropy
5. **Response Formatting**: Returns structured JSON with expiration metadata

### Security Considerations

- All tokens use cryptographically secure random number generation
- SHA-256 hashing ensures token uniqueness and security
- Request metadata is logged for monitoring and debugging
- Rate limiting prevents brute force attacks
- CORS configuration restricts cross-origin requests

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

### Manual Testing
```bash
# Health check
curl http://localhost:3000/health

# Generate tokens
curl -X POST http://localhost:3000/api/ritual/generate \
  -H "Content-Type: application/json" \
  -d '{
    "metadata": {
      "timestamp": "2024-01-15T10:30:00.000Z",
      "userAgent": "Test Client",
      "randomSeed": "test123"
    }
  }'
```

### Automated Testing
```bash
npm test
```

## 📝 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Service health check |
| GET | `/api/docs` | API documentation |
| POST | `/api/ritual/generate` | Generate CMID# and DIIT# tokens |
| POST | `/api/test/rate-limit` | Rate limiting test endpoint |

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env` files to version control
2. **HTTPS**: Use HTTPS in production environments
3. **Rate Limiting**: Configure appropriate rate limits based on usage patterns
4. **Logging**: Monitor API usage and error patterns
5. **Updates**: Keep dependencies updated for security patches

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
lsof -ti:3000 | xargs kill -9
```

**CORS Errors**
- Update `ALLOWED_ORIGINS` in `.env` file
- Ensure client URL matches exactly

**Token Generation Fails**
- Check server logs for detailed error messages
- Verify request payload structure matches API documentation

## 📞 Support

For technical support or questions:
- Check the API documentation at `/api/docs`
- Review server logs for detailed error information
- Ensure all required dependencies are installed

## 🔄 Version History

- **v1.0.0**: Initial release with CMID# and DIIT# token generation
- Secure cryptographic token generation
- RESTful API design
- Comprehensive error handling
- Rate limiting and CORS protection