# API Documentation

## Overview

This document provides comprehensive API documentation for the Soash platform. It defines all REST endpoints, request/response formats, authentication requirements, and error handling patterns.

**Base URL**: `https://api.soash.com/v1` (Production) | `http://localhost:3001/api/v1` (Development)
**API Version**: v1
**Authentication**: JWT Bearer Token

---

## Authentication

### Overview
All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Token Lifecycle
- **Access Token**: 15 minutes expiry
- **Refresh Token**: 7 days expiry
- **Token Refresh**: Automatic via `/auth/refresh-token` endpoint

---

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isVerified": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "tokens": {
      "accessToken": "jwt_access_token",
      "refreshToken": "jwt_refresh_token",
      "expiresIn": 900
    }
  },
  "message": "Registration successful. Please check your email for verification."
}
```

### POST /auth/login
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
      "isVerified": true,
      "lastLoginAt": "2024-01-01T00:00:00.000Z"
    },
    "tokens": {
      "accessToken": "jwt_access_token",
      "refreshToken": "jwt_refresh_token",
      "expiresIn": 900
    }
  }
}
```

### POST /auth/refresh-token
Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_access_token",
    "expiresIn": 900
  }
}
```

### POST /auth/logout
Logout user and invalidate tokens.

**Request:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### POST /auth/forgot-password
Request password reset email.

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
  "message": "Password reset email sent"
}
```

### POST /auth/reset-password
Reset password using token from email.

**Request:**
```json
{
  "token": "password_reset_token",
  "newPassword": "newSecurePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

## User Management Endpoints

### GET /users/profile
Get current user's profile information.

**Authentication**: Required

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
      "isVerified": true,
      "subscriptionTier": "free",
      "subscriptionStatus": "active",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "profile": {
      "id": "uuid",
      "brandName": "My Brand",
      "brandDescription": "Description of my brand",
      "industry": "Technology",
      "targetAudience": "Tech professionals",
      "timezone": "America/New_York",
      "avatarUrl": "https://example.com/avatar.jpg",
      "onboardingCompleted": true
    }
  }
}
```

### PUT /users/profile
Update user profile information.

**Authentication**: Required

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "profile": {
    "brandName": "My Updated Brand",
    "brandDescription": "Updated description",
    "industry": "Technology",
    "targetAudience": "Tech professionals",
    "timezone": "America/New_York"
  }
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
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "profile": {
      "id": "uuid",
      "brandName": "My Updated Brand",
      "brandDescription": "Updated description",
      "industry": "Technology",
      "targetAudience": "Tech professionals",
      "timezone": "America/New_York",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

## Social Platform Endpoints

### POST /social/connect/instagram
Connect Instagram account via OAuth.

**Authentication**: Required

**Request:**
```json
{
  "code": "oauth_authorization_code",
  "redirectUri": "https://app.soash.com/callback/instagram"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "account": {
      "id": "uuid",
      "platform": "instagram",
      "platformUserId": "instagram_user_id",
      "username": "johndoe",
      "displayName": "John Doe",
      "avatarUrl": "https://instagram.com/avatar.jpg",
      "followerCount": 5000,
      "followingCount": 1200,
      "isActive": true,
      "connectedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "Instagram account connected successfully"
}
```

### POST /social/connect/facebook
Connect Facebook page via OAuth.

**Authentication**: Required

**Request:**
```json
{
  "code": "oauth_authorization_code",
  "redirectUri": "https://app.soash.com/callback/facebook"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "account": {
      "id": "uuid",
      "platform": "facebook",
      "platformUserId": "facebook_page_id",
      "username": "mypage",
      "displayName": "My Business Page",
      "avatarUrl": "https://facebook.com/avatar.jpg",
      "followerCount": 2500,
      "followingCount": 0,
      "isActive": true,
      "connectedAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "Facebook page connected successfully"
}
```

### GET /social/accounts
Get all connected social media accounts.

**Authentication**: Required

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accounts": [
      {
        "id": "uuid",
        "platform": "instagram",
        "platformUserId": "instagram_user_id",
        "username": "johndoe",
        "displayName": "John Doe",
        "avatarUrl": "https://instagram.com/avatar.jpg",
        "followerCount": 5000,
        "followingCount": 1200,
        "isActive": true,
        "lastSyncedAt": "2024-01-01T00:00:00.000Z",
        "connectedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### POST /social/sync/:accountId
Trigger manual sync for a social account.

**Authentication**: Required

**Path Parameters:**
- `accountId` (string): Social account UUID

**Response (200):**
```json
{
  "success": true,
  "data": {
    "syncJobId": "uuid",
    "status": "queued",
    "estimatedDuration": "2-5 minutes"
  },
  "message": "Sync job initiated"
}
```

### DELETE /social/disconnect/:accountId
Disconnect a social media account.

**Authentication**: Required

**Path Parameters:**
- `accountId` (string): Social account UUID

**Response (200):**
```json
{
  "success": true,
  "message": "Account disconnected successfully"
}
```

---

## Analytics Endpoints

### GET /analytics/overview
Get dashboard overview analytics.

**Authentication**: Required

**Query Parameters:**
- `dateRange` (string): "7d", "30d", "90d", "1y" (default: "30d")
- `platforms` (string[]): Platform filters (optional)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalPosts": 45,
      "totalEngagement": 12500,
      "averageEngagementRate": 4.2,
      "totalReach": 85000,
      "totalImpressions": 125000,
      "followerGrowth": 250,
      "topPlatform": "instagram"
    },
    "platformBreakdown": [
      {
        "platform": "instagram",
        "posts": 30,
        "engagement": 8500,
        "engagementRate": 4.5,
        "reach": 55000,
        "impressions": 80000
      },
      {
        "platform": "facebook",
        "posts": 15,
        "engagement": 4000,
        "engagementRate": 3.8,
        "reach": 30000,
        "impressions": 45000
      }
    ],
    "trends": {
      "engagementTrend": [
        { "date": "2024-01-01", "value": 4.1 },
        { "date": "2024-01-02", "value": 4.3 },
        { "date": "2024-01-03", "value": 4.2 }
      ],
      "reachTrend": [
        { "date": "2024-01-01", "value": 2800 },
        { "date": "2024-01-02", "value": 2950 },
        { "date": "2024-01-03", "value": 2850 }
      ]
    }
  }
}
```

### GET /analytics/posts
Get post performance analytics.

**Authentication**: Required

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)
- `dateRange` (string): "7d", "30d", "90d", "1y" (default: "30d")
- `platform` (string): Platform filter (optional)
- `sortBy` (string): "engagement", "reach", "date" (default: "date")
- `sortOrder` (string): "asc", "desc" (default: "desc")

**Response (200):**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "platform": "instagram",
        "platformPostId": "instagram_post_id",
        "contentType": "image",
        "caption": "Check out this amazing content!",
        "mediaUrls": ["https://instagram.com/image.jpg"],
        "hashtags": ["#content", "#amazing"],
        "postedAt": "2024-01-01T00:00:00.000Z",
        "metrics": {
          "likesCount": 150,
          "commentsCount": 12,
          "sharesCount": 8,
          "savesCount": 25,
          "reach": 2800,
          "impressions": 3200,
          "engagementRate": 4.2
        },
        "performanceLevel": "high"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

### GET /analytics/insights
Get AI-generated insights.

**Authentication**: Required

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 50)
- `type` (string): "performance", "trend", "recommendation" (optional)
- `unreadOnly` (boolean): Show only unread insights (default: false)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "insights": [
      {
        "id": "uuid",
        "type": "performance",
        "title": "Your video content is performing 40% better than images",
        "description": "Based on your last 30 posts, video content generates significantly higher engagement rates (5.2% vs 3.7% for images).",
        "priority": "high",
        "isRead": false,
        "createdAt": "2024-01-01T00:00:00.000Z"
      },
      {
        "id": "uuid",
        "type": "trend",
        "title": "Best posting time identified",
        "description": "Your audience is most active on weekdays between 2-4 PM EST, showing 25% higher engagement during these hours.",
        "priority": "medium",
        "isRead": true,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### PUT /analytics/insights/:insightId/read
Mark an insight as read.

**Authentication**: Required

**Path Parameters:**
- `insightId` (string): Insight UUID

**Response (200):**
```json
{
  "success": true,
  "message": "Insight marked as read"
}
```

### GET /analytics/recommendations
Get AI content recommendations.

**Authentication**: Required

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 50)
- `type` (string): "content_idea", "posting_time", "hashtag" (optional)
- `unused` (boolean): Show only unused recommendations (default: false)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "id": "uuid",
        "type": "content_idea",
        "title": "Behind-the-scenes content idea",
        "description": "Share your morning routine or workspace setup. This type of content typically generates 30% more engagement for your audience.",
        "contentBrief": "Create a short video showing your daily morning routine, focusing on productivity tips. Include 3-5 actionable steps your audience can implement.",
        "isUsed": false,
        "feedbackScore": null,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "totalPages": 2
  }
}
```

---

## AI-Powered Endpoints

### POST /ai/analyze
Analyze content performance using AI.

**Authentication**: Required

**Request:**
```json
{
  "postIds": ["uuid1", "uuid2"],
  "analysisType": "performance" | "trend" | "comparison"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "analysis": {
      "summary": "Your recent posts show strong performance with video content, particularly educational tutorials.",
      "insights": [
        {
          "type": "performance",
          "title": "Video content outperforming images",
          "description": "Video posts generate 40% higher engagement rates",
          "confidence": 0.85
        }
      ],
      "recommendations": [
        {
          "action": "Increase video content frequency",
          "reasoning": "Video content shows consistently higher engagement",
          "expectedImpact": "25-30% engagement increase"
        }
      ]
    }
  }
}
```

### POST /ai/generate-brief
Generate AI content brief.

**Authentication**: Required

**Request:**
```json
{
  "contentType": "post",
  "platform": "instagram",
  "topic": "productivity tips",
  "audience": "professionals",
  "tone": "educational"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "brief": {
      "id": "uuid",
      "title": "5 Productivity Tips for Busy Professionals",
      "outline": "1. Time blocking technique\n2. Priority matrix method\n3. Automation tools\n4. Focused work sessions\n5. Energy management",
      "suggestedHooks": [
        "Struggling to stay productive? These 5 tips changed my game 👇",
        "POV: You're drowning in tasks but getting nothing done..."
      ],
      "suggestedCTAs": [
        "Which tip will you try first? Let me know in the comments!",
        "Save this post for later and share with someone who needs it"
      ],
      "hashtags": ["#productivity", "#professionals", "#timemanagement", "#tips", "#workflow"],
      "visualSuggestions": [
        "Split-screen showing chaos vs organized workspace",
        "Step-by-step infographic of the 5 tips"
      ],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### POST /ai/feedback
Provide feedback on AI recommendations.

**Authentication**: Required

**Request:**
```json
{
  "recommendationId": "uuid",
  "rating": 5,
  "feedback": "Great recommendation, very helpful!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Feedback submitted successfully"
}
```

---

## Affiliate Program Endpoints

### POST /affiliate/register
Register as an affiliate.

**Authentication**: Required

**Request:**
```json
{
  "agreeToTerms": true
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "referralCode": {
      "id": "uuid",
      "code": "USER123-REF",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  },
  "message": "Affiliate registration successful"
}
```

### GET /affiliate/dashboard
Get affiliate dashboard data.

**Authentication**: Required

**Response (200):**
```json
{
  "success": true,
  "data": {
    "referralCode": "USER123-REF",
    "stats": {
      "totalReferrals": 12,
      "conversions": 8,
      "conversionRate": 66.7,
      "pendingCommissions": 120.00,
      "totalCommissions": 450.00
    },
    "recentReferrals": [
      {
        "id": "uuid",
        "signupDate": "2024-01-01T00:00:00.000Z",
        "status": "converted",
        "commissionAmount": 15.00
      }
    ]
  }
}
```

### GET /affiliate/export
Export affiliate data for payments.

**Authentication**: Required (Admin only)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "exportUrl": "https://api.soash.com/exports/affiliate-2024-01.csv",
    "expiresAt": "2024-01-01T01:00:00.000Z"
  }
}
```

---

## Error Responses

### Error Format
All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional error details"
    }
  }
}
```

### Common Error Codes

#### Authentication Errors (401)
- `UNAUTHORIZED`: Missing or invalid token
- `TOKEN_EXPIRED`: Access token has expired
- `INVALID_CREDENTIALS`: Invalid email/password combination

#### Validation Errors (400)
- `VALIDATION_ERROR`: Request validation failed
- `MISSING_REQUIRED_FIELD`: Required field is missing
- `INVALID_FORMAT`: Field format is invalid

#### Authorization Errors (403)
- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions
- `ACCOUNT_SUSPENDED`: User account is suspended

#### Resource Errors (404)
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `USER_NOT_FOUND`: User account not found

#### Rate Limiting (429)
- `RATE_LIMIT_EXCEEDED`: Too many requests

#### Server Errors (500)
- `INTERNAL_SERVER_ERROR`: Unexpected server error
- `DATABASE_ERROR`: Database operation failed
- `EXTERNAL_API_ERROR`: Third-party service error

---

## Request/Response Headers

### Common Request Headers
```
Content-Type: application/json
Authorization: Bearer <jwt_token>
User-Agent: Soash-App/1.0
```

### Common Response Headers
```
Content-Type: application/json
Cache-Control: no-cache
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640995200
```

---

## Rate Limiting

### Limits (Not implemented in MVP)
- **Authentication endpoints**: 5 requests per minute
- **General API endpoints**: 100 requests per minute
- **Analytics endpoints**: 50 requests per minute

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640995200
```

---

## Pagination

### Query Parameters
- `page` (number): Page number (1-based)
- `limit` (number): Items per page (max varies by endpoint)

### Response Format
```json
{
  "success": true,
  "data": {
    "items": []
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

## Webhook Endpoints (Future)

### POST /webhooks/instagram
Handle Instagram webhook events.

### POST /webhooks/facebook
Handle Facebook webhook events.

---

This API documentation provides a comprehensive guide for frontend developers to integrate with the Soash backend API during the 3-month development sprint.