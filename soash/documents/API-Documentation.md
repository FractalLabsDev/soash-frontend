# API Documentation

## Overview

This document provides comprehensive API documentation for the Soash platform. It defines all REST endpoints, request/response formats, authentication requirements, and error handling patterns.

**Base URL**: `https://api.soash.com/api` (Production) | `http://localhost:3001/api` (Development)
**Backend Repository**: FractalLabsDev/soash-backend (separate repository)
**Authentication**: JWT Bearer Token

---

## Authentication

### Overview
All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Token Lifecycle
- **Access Token**: Short-lived (configured in backend)
- **Refresh Token**: Long-lived (configured in backend)
- **Token Refresh**: Manual via `/auth/refreshToken` endpoint

---

## Authentication Endpoints

### POST /auth/registerAccount
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "source": "web"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Registration successful"
}
```

### POST /auth/signIn
Authenticate user and receive tokens.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isActivated": true,
      "isApproved": false,
      "isAdmin": false
    },
    "token": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  },
  "message": "Sign in successful"
}
```

### POST /auth/enterEmail
Check if an email exists and get user status.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "isActivated": true
  },
  "message": "Email found"
}
```

### POST /auth/sendVerificationEmail
Send verification code to user's email.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Verification code requested successfully"
}
```

### POST /auth/verifyEmail
Verify email with verification code.

**Request:**
```json
{
  "email": "user@example.com",
  "when": "auth",
  "code": "123456",
  "is_test": false
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isActivated": true,
      "isApproved": false,
      "isAdmin": false
    },
    "token": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  },
  "message": "Account activated successfully"
}
```

### POST /auth/updatePassword
Update user password (requires authentication).

**Request:**
```json
{
  "email": "user@example.com",
  "password": "newSecurePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isActivated": true,
      "isApproved": false,
      "isAdmin": false
    },
    "token": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  },
  "message": "Password updated successfully"
}
```

### POST /auth/refreshToken
Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Headers:**
```
Authorization: Bearer <expired_jwt_token>
```

**Response (200):**
```json
{
  "token": "new_jwt_access_token",
  "refreshToken": "new_jwt_refresh_token"
}
```

---

## Health Endpoints

### GET /health
Check API health status.

**Response (200):**
```json
{
  "status": "ok"
}
```

### GET /health/error
Test error handling (development only).

**Response (500):**
```json
{
  "error": "Test error"
}
```

---

## User Model

The User model in the backend has the following structure:

```typescript
interface User {
  id: string;              // UUID
  email: string;           // Unique email address
  password: string;        // Hashed password
  firstName?: string;      // Optional first name
  lastName?: string;       // Optional last name
  note?: string;           // Optional notes
  isActivated: boolean;    // Email verification status
  isApproved: boolean;     // Admin approval status
  isAdmin: boolean;        // Admin privileges
  metadata?: object;       // Additional metadata
  source?: string;         // Registration source
  createdAt?: Date;        // Creation timestamp
}
```

---

## Error Handling

All endpoints return errors in the following format:

**Error Response:**
```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

### Common Error Codes
- **400**: Bad Request - Invalid request format or missing required fields
- **401**: Unauthorized - Invalid credentials or missing/invalid token
- **404**: Not Found - Resource not found (e.g., email not found)
- **500**: Internal Server Error - Server-side error

### Authentication Errors
- **401**: "Invalid email or password" - Login failed
- **401**: "A user already exists with this email address" - Registration failed  
- **401**: "A user with this email address does not exist" - Email not found
- **401**: "Incorrect verification code" - Invalid verification code
- **401**: "No token attached" - Missing authorization header
- **401**: "Invalid token" - Token verification failed

---

## Integration Notes

### Frontend Integration
1. **Environment Variables**: Set `REACT_APP_API_URL` to point to backend
2. **CORS**: Backend must be configured to allow frontend origin
3. **Authentication**: Store JWT tokens securely (HttpOnly cookies recommended)
4. **Token Refresh**: Implement automatic token refresh on 401 responses

### Development Setup
1. **Backend**: Clone and run `FractalLabsDev/soash-backend`
2. **Database**: Set up PostgreSQL with proper credentials
3. **Environment**: Configure `.env` files for both repos
4. **CORS**: Update backend CORS settings for frontend URL

This documentation reflects the current state of the soash-backend repository and should be used as the reference for frontend integration.
