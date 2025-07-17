# Technical Architecture Document

## Overview

This document defines the technical architecture for the Soash platform, a lean AI-powered social media intelligence application. It outlines the technology stack, system design, data flow, and implementation patterns to ensure consistent development across the team.

**Target Timeline**: 3-month lean sprint
**Architecture Philosophy**: Monolithic, simple, scalable

---

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development and build)
- **Styling**: Tailwind CSS (utility-first CSS framework)
- **State Management**: React Query + React Context
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Charts**: Recharts (simple charting library)
- **HTTP Client**: Axios with interceptors

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL 14+
- **ORM**: Prisma (type-safe database access)
- **Authentication**: JWT (JSON Web Tokens)
- **Session Storage**: Database sessions (no Redis for MVP)
- **Job Queue**: Simple background jobs (no Bull/Redis)
- **File Storage**: Local storage (no S3 for MVP)

### AI/ML Integration
- **LLM**: OpenAI GPT-4 API (direct integration)
- **Pattern Recognition**: Rule-based logic + OpenAI analysis
- **Data Processing**: Simple batch processing
- **Content Generation**: OpenAI API for content briefs

### Third-Party APIs
- **Instagram**: Basic Display API + Graph API
- **Facebook**: Graph API (pages_read_engagement scope)
- **Email**: SendGrid or similar service
- **Payments**: Manual processing (CSV export)

### Development Tools
- **Language**: TypeScript (strict mode)
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library
- **Version Control**: Git with GitHub
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (frontend) + Railway/Render (backend)

---

## System Architecture

### High-Level Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Express API    │    │   PostgreSQL    │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  External APIs  │
                    │ - Instagram API │
                    │ - Facebook API  │
                    │ - OpenAI API    │
                    └─────────────────┘
```

### Directory Structure

#### Frontend Structure (Atomic Design)
```
src/
├── components/           # Atomic design component hierarchy
│   ├── atoms/           # Basic building blocks
│   │   ├── Button/      # Button variants and states
│   │   ├── Input/       # Input field types
│   │   ├── Label/       # Text labels
│   │   ├── Icon/        # Icon components
│   │   ├── Badge/       # Status badges
│   │   └── LoadingSpinner/ # Loading indicators
│   ├── molecules/       # Simple combinations of atoms
│   │   ├── InputField/  # Label + Input + Error message
│   │   ├── SearchBox/   # Input + Icon + Button
│   │   ├── MetricCard/  # Icon + Value + Label + Badge
│   │   ├── NavLink/     # Icon + Label + Badge
│   │   └── FormField/   # Label + Input + Validation
│   ├── organisms/       # Complex UI sections
│   │   ├── Navigation/  # Complete navigation system
│   │   ├── Sidebar/     # Sidebar with navigation sections
│   │   ├── DashboardHeader/ # Header with title and actions
│   │   ├── MetricsGrid/ # Grid of metric cards
│   │   ├── LoginForm/   # Complete login form
│   │   └── ChartContainer/ # Chart with controls
│   ├── templates/       # Page layouts
│   │   ├── DashboardTemplate/ # Dashboard page layout
│   │   ├── AuthTemplate/      # Authentication page layout
│   │   └── SettingsTemplate/  # Settings page layout
│   └── pages/          # Specific page instances
│       ├── Dashboard/   # Dashboard page implementation
│       ├── Login/       # Login page implementation
│       └── Settings/    # Settings page implementation
├── hooks/               # Custom React hooks
├── services/            # API service functions
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── contexts/            # React contexts
├── stories/             # Storybook stories (organized by atomic level)
└── assets/              # Static assets
```

#### Backend Structure
```
src/
├── routes/              # API route definitions
│   ├── auth/            # Authentication routes
│   ├── users/           # User management routes
│   ├── social/          # Social platform routes
│   ├── analytics/       # Analytics routes
│   └── ai/              # AI-powered routes
├── controllers/         # Route controllers
├── services/            # Business logic services
├── middleware/          # Express middleware
├── models/              # Database models (Prisma)
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── config/              # Configuration files
```

---

## Data Flow Architecture

### Authentication Flow
```
1. User Registration/Login
   │
   ▼
2. JWT Token Generation
   │
   ▼
3. Token Storage (localStorage)
   │
   ▼
4. API Requests with Bearer Token
   │
   ▼
5. JWT Validation Middleware
   │
   ▼
6. Protected Route Access
```

### Social Platform Integration Flow
```
1. OAuth Initiation
   │
   ▼
2. Platform OAuth Redirect
   │
   ▼
3. Token Exchange & Storage
   │
   ▼
4. Historical Data Import
   │
   ▼
5. Regular Sync Jobs
   │
   ▼
6. AI Analysis Processing
   │
   ▼
7. Dashboard Display
```

### AI Insights Generation Flow
```
1. User Content Data
   │
   ▼
2. Performance Clustering
   │
   ▼
3. OpenAI API Analysis
   │
   ▼
4. Insight Generation
   │
   ▼
5. Recommendation Creation
   │
   ▼
6. Frontend Display
```

---

## Database Design

### Core Tables (from ERD)
- **users** - User account information
- **user_profiles** - User profile and preferences
- **social_accounts** - Connected social platform accounts
- **posts** - Social media posts data
- **post_metrics** - Performance metrics for posts
- **ai_insights** - AI-generated insights
- **content_recommendations** - AI content suggestions
- **referral_codes** - Affiliate program codes
- **referral_signups** - Affiliate tracking

### Database Patterns
- **Primary Keys**: UUIDs for all entities
- **Timestamps**: created_at, updated_at on all tables
- **Soft Deletes**: Use is_active flags instead of hard deletes
- **Indexes**: Performance-critical queries only
- **Relationships**: Foreign keys with cascade rules

---

## API Design Patterns

### RESTful API Structure
```
/api/v1/auth/                 # Authentication endpoints
├── POST /register            # User registration
├── POST /login              # User login
├── POST /logout             # User logout
├── POST /forgot-password    # Password reset
└── POST /refresh-token      # Token refresh

/api/v1/users/               # User management
├── GET /profile             # Get user profile
├── PUT /profile             # Update user profile
└── DELETE /account          # Delete account

/api/v1/social/              # Social platform integration
├── POST /connect/instagram  # Connect Instagram
├── POST /connect/facebook   # Connect Facebook
├── GET /accounts            # Get connected accounts
├── POST /sync/:platform     # Trigger sync
└── DELETE /disconnect/:id   # Disconnect account

/api/v1/analytics/           # Analytics and insights
├── GET /overview            # Dashboard overview
├── GET /posts               # Post performance
├── GET /insights            # AI insights
└── GET /recommendations     # Content recommendations

/api/v1/ai/                  # AI-powered features
├── POST /analyze            # Analyze content
├── POST /generate-brief     # Generate content brief
└── POST /feedback           # Provide feedback
```

### Response Format Standards
```typescript
// Success Response
{
  success: true,
  data: any,
  message?: string
}

// Error Response
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  }
}

// Paginated Response
{
  success: true,
  data: any[],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}
```

---

## Security Architecture

### Authentication & Authorization
- **JWT Tokens**: Access tokens (15 min) + Refresh tokens (7 days)
- **Token Storage**: localStorage (frontend), encrypted database (backend)
- **CSRF Protection**: Token-based CSRF protection
- **Rate Limiting**: Deferred to post-MVP

### Data Protection
- **Password Hashing**: bcrypt with salt rounds
- **Data Encryption**: Sensitive data encrypted at rest
- **API Security**: CORS, helmet middleware
- **Input Validation**: Joi/Zod schema validation

### OAuth Security
- **State Parameter**: Prevent CSRF attacks
- **Token Encryption**: Social platform tokens encrypted
- **Minimal Scope**: Only necessary permissions
- **Token Refresh**: Automatic token refresh

---

## Performance Considerations

### Database Optimization
- **Indexes**: Critical query paths only
- **Connection Pooling**: Prisma connection pooling
- **Query Optimization**: Avoid N+1 queries
- **Caching**: Simple in-memory caching for MVP

### API Performance
- **Response Compression**: gzip compression
- **Pagination**: Limit large dataset responses
- **Async Processing**: Background jobs for heavy operations
- **Error Handling**: Graceful error responses

### Frontend Performance
- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components and images
- **Memoization**: React.memo for expensive components
- **Bundle Optimization**: Vite optimization

---

## Error Handling Strategy

### Backend Error Handling
```typescript
// Custom Error Classes
class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
  }
}

// Error Middleware
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message
      }
    });
  }
  
  // Log unexpected errors
  console.error(error);
  
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred'
    }
  });
};
```

### Frontend Error Handling
```typescript
// React Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

---

## Deployment Architecture

### Development Environment
- **Local Development**: Docker Compose (optional)
- **Database**: Local PostgreSQL instance
- **API**: localhost:3001
- **Frontend**: localhost:3000

### Staging Environment
- **Frontend**: Vercel preview deployment
- **Backend**: Railway/Render staging
- **Database**: Hosted PostgreSQL (staging)

### Production Environment
- **Frontend**: Vercel production
- **Backend**: Railway/Render production
- **Database**: Hosted PostgreSQL (production)
- **SSL**: Automatic HTTPS

---

## Monitoring & Logging

### Application Monitoring
- **Uptime Monitoring**: Simple ping monitoring
- **Error Tracking**: Console logging (basic)
- **Performance Monitoring**: Basic response time logging

### Logging Strategy
```typescript
// Structured Logging
const logger = {
  info: (message: string, meta?: any) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  },
  error: (message: string, error?: Error, meta?: any) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      error: error?.message,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  }
};
```

---

## Development Patterns

### Component Patterns
```typescript
// Functional Component Pattern
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${disabled ? 'btn-disabled' : ''}`}
    >
      {children}
    </button>
  );
};
```

### Service Layer Pattern
```typescript
// API Service Pattern
class ApiService {
  private baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }
}
```

### Custom Hook Pattern
```typescript
// Data Fetching Hook
function useAnalytics(dateRange: DateRange) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await analyticsService.getOverview(dateRange);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  return { data, loading, error };
}
```

---

## Scalability Considerations

### Current Architecture Limitations
- **Monolithic Structure**: Single backend application
- **Database**: Single PostgreSQL instance
- **File Storage**: Local file system
- **Session Storage**: Database sessions
- **Job Processing**: Synchronous processing

### Future Scalability Path
- **Microservices**: Split by domain (auth, analytics, AI)
- **Database Sharding**: User-based sharding
- **Caching Layer**: Redis for sessions and caching
- **Message Queue**: Background job processing
- **CDN**: Asset delivery optimization

---

## Code Quality Standards

### TypeScript Configuration
- **Strict Mode**: Enable all strict type checking
- **No Any**: Avoid `any` type usage
- **Explicit Return Types**: Function return types
- **Interface over Type**: Use interfaces for object shapes

### Code Style Guidelines
- **ESLint**: Enforce consistent code style
- **Prettier**: Automatic code formatting
- **Import Order**: Consistent import ordering
- **Naming Conventions**: Consistent naming patterns

### Testing Requirements
- **Unit Tests**: Critical business logic
- **Integration Tests**: API endpoints
- **Component Tests**: React components
- **E2E Tests**: Critical user flows (deferred)

---

## Environment Configuration

### Environment Variables
```bash
# Backend (.env)
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/soash
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
OPENAI_API_KEY=your-openai-key
INSTAGRAM_CLIENT_ID=your-instagram-client-id
INSTAGRAM_CLIENT_SECRET=your-instagram-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
SENDGRID_API_KEY=your-sendgrid-key

# Frontend (.env)
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Soash
```

### Configuration Management
- **Development**: .env files (not committed)
- **Staging**: Platform environment variables
- **Production**: Platform environment variables
- **Secrets**: Encrypted secret management

---

This technical architecture provides a solid foundation for the 3-month lean development sprint while maintaining flexibility for future growth and scalability needs.