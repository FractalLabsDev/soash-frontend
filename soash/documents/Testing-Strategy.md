# Testing Strategy Document

## Overview

This document outlines the testing strategy for the Soash platform during the 3-month lean development sprint. It defines testing approaches, tools, standards, and processes to ensure quality while maintaining rapid development velocity.

**Testing Philosophy**: Quality without sacrificing speed
**Approach**: Pragmatic testing focused on critical user paths
**Coverage Target**: 80% for business logic, 60% overall

---

## Testing Pyramid

### Unit Tests (Foundation - 70%)
- **Scope**: Individual functions, components, and modules
- **Focus**: Business logic, utilities, pure functions
- **Tools**: Jest, React Testing Library
- **Coverage**: 80% for utility functions and business logic

### Integration Tests (Middle - 25%)
- **Scope**: API endpoints, database interactions, component integration
- **Focus**: Data flow, API contracts, user interactions
- **Tools**: Jest, Supertest, React Testing Library
- **Coverage**: All API endpoints, critical user flows

### End-to-End Tests (Top - 5%)
- **Scope**: Critical user journeys
- **Focus**: Authentication flow, dashboard, social connections
- **Tools**: Playwright (deferred to post-MVP)
- **Coverage**: 3-5 critical user paths

---

## Frontend Testing Strategy

### Component Testing

#### React Component Testing Approach
```typescript
// Example: Button Component Test
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

#### Testing Priorities (Atomic Design)
1. **Atoms**: Buttons, inputs, labels, icons, badges - focus on props, states, accessibility
2. **Molecules**: Form fields, metric cards, navigation links - test component interaction
3. **Organisms**: Navigation, forms, dashboard sections - test complex behaviors and API integration
4. **Templates**: Page layouts - test responsive behavior and layout integrity
5. **Pages**: Complete user flows - test end-to-end functionality

#### What NOT to Test
- Third-party library functionality
- CSS styling details
- Implementation details (internal state)
- Trivial components (simple wrappers)

### Atomic Design Testing Approach

#### Atoms Testing
```typescript
// Example: Button Atom Test
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../atoms/Button/Button';

describe('Button Atom', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  it('is accessible', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

#### Molecules Testing
```typescript
// Example: InputField Molecule Test
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from '../molecules/InputField/InputField';

describe('InputField Molecule', () => {
  it('renders label, input, and error message', () => {
    render(
      <InputField 
        label="Email" 
        value="" 
        onChange={() => {}} 
        error="Email is required"
      />
    );
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    const handleChange = jest.fn();
    render(<InputField label="Email" value="" onChange={handleChange} />);
    
    fireEvent.change(screen.getByLabelText('Email'), { 
      target: { value: 'test@example.com' } 
    });
    
    expect(handleChange).toHaveBeenCalledWith('test@example.com');
  });

  it('shows error state correctly', () => {
    render(
      <InputField 
        label="Email" 
        value="" 
        onChange={() => {}} 
        error="Invalid email"
      />
    );
    
    expect(screen.getByRole('textbox')).toHaveClass('error');
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
```

#### Organisms Testing
```typescript
// Example: LoginForm Organism Test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../organisms/LoginForm/LoginForm';

describe('LoginForm Organism', () => {
  it('submits form with valid data', async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  it('validates required fields', async () => {
    render(<LoginForm onSubmit={() => {}} />);
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    const handleSubmit = jest.fn(() => new Promise(resolve => 
      setTimeout(resolve, 100)
    ));
    
    render(<LoginForm onSubmit={handleSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText('Signing in...')).not.toBeInTheDocument();
    });
  });
});
```

#### Templates Testing
```typescript
// Example: DashboardTemplate Test
import { render, screen } from '@testing-library/react';
import { DashboardTemplate } from '../templates/DashboardTemplate/DashboardTemplate';

describe('DashboardTemplate', () => {
  it('renders sidebar, header, and content areas', () => {
    render(
      <DashboardTemplate>
        <div>Test content</div>
      </DashboardTemplate>
    );
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('is responsive on mobile', () => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });
    
    render(
      <DashboardTemplate>
        <div>Test content</div>
      </DashboardTemplate>
    );
    
    expect(screen.getByRole('navigation')).toHaveClass('mobile-nav');
  });
});
```

#### Pages Testing
```typescript
// Example: Dashboard Page Test
import { render, screen, waitFor } from '@testing-library/react';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Dashboard Page', () => {
  it('renders dashboard with user data', async () => {
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Welcome back')).toBeInTheDocument();
      expect(screen.getByText('Performance Overview')).toBeInTheDocument();
      expect(screen.getByText('Recent Posts')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    renderWithProviders(<Dashboard />);
    
    expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
  });

  it('handles error states', async () => {
    // Mock API failure
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'));
    
    renderWithProviders(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Error loading dashboard')).toBeInTheDocument();
    });
  });
});
```

### Custom Hook Testing
```typescript
// Example: useAnalytics Hook Test
import { renderHook, waitFor } from '@testing-library/react';
import { useAnalytics } from './useAnalytics';

describe('useAnalytics Hook', () => {
  it('fetches analytics data on mount', async () => {
    const { result } = renderHook(() => useAnalytics('30d'));
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeDefined();
    });
  });

  it('handles error states', async () => {
    // Mock API failure
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'));
    
    const { result } = renderHook(() => useAnalytics('30d'));
    
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});
```

### Integration Testing
```typescript
// Example: User Authentication Flow
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { LoginForm } from './LoginForm';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Integration', () => {
  it('successfully logs in user and redirects', async () => {
    renderWithProviders(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });
});
```

---

## Backend Testing Strategy

### API Endpoint Testing

#### Test Structure
```typescript
// Example: User Authentication API Test
import request from 'supertest';
import { app } from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('POST /api/v1/auth/login', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('successfully authenticates user with valid credentials', async () => {
    // Setup: Create test user
    await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'hashedPassword',
        firstName: 'John',
        lastName: 'Doe',
        isVerified: true
      }
    });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.tokens.accessToken).toBeDefined();
    expect(response.body.data.user.email).toBe('test@example.com');
  });

  it('returns error for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
  });

  it('validates required fields', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com'
        // missing password
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
```

#### API Testing Priorities
1. **Authentication**: Login, register, token refresh
2. **Social Integration**: OAuth flows, data sync
3. **Analytics**: Data retrieval, aggregation
4. **Error Handling**: Validation, authorization, server errors

### Database Testing

#### Test Database Setup
```typescript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testMatch: ['**/__tests__/**/*.test.ts'],
};

// tests/setup.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL
    }
  }
});

beforeEach(async () => {
  // Clean database before each test
  await prisma.user.deleteMany();
  await prisma.socialAccount.deleteMany();
  await prisma.post.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
```

#### Database Test Examples
```typescript
// Example: User Service Test
import { UserService } from '../services/UserService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userService = new UserService(prisma);

describe('UserService', () => {
  it('creates user with profile', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      profile: {
        brandName: 'Test Brand',
        industry: 'Technology'
      }
    };

    const user = await userService.createUser(userData);

    expect(user.email).toBe('test@example.com');
    expect(user.profile.brandName).toBe('Test Brand');
    
    // Verify database state
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { profile: true }
    });
    
    expect(dbUser).toBeDefined();
    expect(dbUser.profile.brandName).toBe('Test Brand');
  });
});
```

### Service Layer Testing

#### Business Logic Testing
```typescript
// Example: Analytics Service Test
import { AnalyticsService } from '../services/AnalyticsService';

describe('AnalyticsService', () => {
  it('calculates engagement rate correctly', () => {
    const post = {
      likesCount: 100,
      commentsCount: 20,
      sharesCount: 10,
      reach: 1000
    };

    const engagementRate = AnalyticsService.calculateEngagementRate(post);
    
    expect(engagementRate).toBe(13.0); // (100 + 20 + 10) / 1000 * 100
  });

  it('identifies high performing posts', () => {
    const posts = [
      { id: '1', engagementRate: 8.5 },
      { id: '2', engagementRate: 3.2 },
      { id: '3', engagementRate: 6.1 }
    ];

    const highPerformers = AnalyticsService.getHighPerformers(posts);
    
    expect(highPerformers).toHaveLength(2);
    expect(highPerformers[0].id).toBe('1');
    expect(highPerformers[1].id).toBe('3');
  });
});
```

---

## Test Data Management

### Test Data Strategy

#### Factory Pattern for Test Data
```typescript
// tests/factories/UserFactory.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export class UserFactory {
  static build(overrides = {}) {
    return {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: 'hashedPassword123',
      isVerified: true,
      ...overrides
    };
  }

  static async create(prisma: PrismaClient, overrides = {}) {
    const userData = this.build(overrides);
    return await prisma.user.create({
      data: userData,
      include: { profile: true }
    });
  }
}

// Usage in tests
const user = await UserFactory.create(prisma, {
  email: 'specific@example.com'
});
```

#### Mock Data for API Responses
```typescript
// tests/mocks/apiMocks.ts
export const mockInstagramPost = {
  id: 'instagram_post_id',
  caption: 'Test post caption',
  media_type: 'IMAGE',
  media_url: 'https://example.com/image.jpg',
  timestamp: '2024-01-01T00:00:00Z',
  likes: { data: [] },
  comments: { data: [] }
};

export const mockFacebookPost = {
  id: 'facebook_post_id',
  message: 'Test Facebook post',
  created_time: '2024-01-01T00:00:00Z',
  reactions: { data: [] },
  comments: { data: [] }
};
```

---

## Test Environment Setup

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testMatch: [
    '**/atoms/**/*.test.{ts,tsx}',
    '**/molecules/**/*.test.{ts,tsx}',
    '**/organisms/**/*.test.{ts,tsx}',
    '**/templates/**/*.test.{ts,tsx}',
    '**/pages/**/*.test.{ts,tsx}',
    '**/integration/**/*.test.{ts,tsx}'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/tests/**/*',
    '!src/types/**/*'
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  }
};
```

### Testing Utilities
```typescript
// src/tests/utils/testUtils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        {children}
      </AuthProvider>
    </BrowserRouter>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

---

## Manual Testing Strategy

### Test Scenarios

#### Critical User Paths
1. **User Registration & Login**
   - Register new account
   - Email verification
   - Login with valid credentials
   - Password reset flow

2. **Social Account Connection**
   - Connect Instagram account
   - Connect Facebook account
   - Handle OAuth errors
   - Disconnect accounts

3. **Dashboard Analytics**
   - View performance overview
   - Filter by date range
   - Switch between platforms
   - View detailed post analytics

4. **AI Features**
   - Generate content recommendations
   - View AI insights
   - Provide feedback on recommendations
   - Generate content briefs

#### Browser & Device Testing
- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Android Chrome
- **Tablet**: iPad Safari, Android Chrome

#### Performance Testing
- **Load Times**: Page loads under 3 seconds
- **API Response**: All API calls under 500ms
- **Large Datasets**: Dashboard with 100+ posts
- **Concurrent Users**: 10 simultaneous users

### Testing Checklist

#### Pre-Release Checklist
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] Manual testing of critical paths
- [ ] Cross-browser testing
- [ ] Mobile responsive testing
- [ ] Performance testing
- [ ] Security testing
- [ ] Accessibility testing

#### Bug Reporting Template
```markdown
## Bug Report

**Environment**: [Production/Staging/Development]
**Browser**: [Chrome 120, Firefox 115, etc.]
**Device**: [Desktop, Mobile, Tablet]

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happens]

**Screenshots**:
[If applicable]

**Additional Context**:
[Any other relevant information]
```

---

## Continuous Integration

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: soash_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run database migrations
        run: npm run db:migrate
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/soash_test
      
      - name: Run tests
        run: npm test -- --coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/soash_test
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
```

### Test Commands
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false",
    "test:atoms": "jest --testPathPattern=atoms",
    "test:molecules": "jest --testPathPattern=molecules", 
    "test:organisms": "jest --testPathPattern=organisms",
    "test:templates": "jest --testPathPattern=templates",
    "test:pages": "jest --testPathPattern=pages",
    "test:integration": "jest --testPathPattern=integration"
  }
}
```

---

## Quality Gates

### Code Coverage Requirements
- **Overall**: 60% minimum
- **Business Logic**: 80% minimum
- **API Endpoints**: 90% minimum
- **Critical Components**: 85% minimum

### Test Quality Metrics
- **Test Execution Time**: All tests under 30 seconds
- **Test Reliability**: 99% pass rate on CI
- **Test Maintainability**: Tests update with code changes
- **Test Documentation**: Clear test descriptions

### Definition of Done
A feature is considered complete when:
- [ ] All unit tests pass
- [ ] Integration tests cover the feature
- [ ] Manual testing completed
- [ ] Code coverage meets threshold
- [ ] Performance requirements met
- [ ] Security requirements met
- [ ] Accessibility requirements met

---

## Testing Tools & Libraries

### Frontend Testing
- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing
- **@testing-library/jest-dom**: Custom Jest matchers
- **@testing-library/user-event**: User interaction simulation
- **MSW (Mock Service Worker)**: API mocking

### Backend Testing
- **Jest**: JavaScript testing framework
- **Supertest**: HTTP assertion library
- **@faker-js/faker**: Test data generation
- **nock**: HTTP mocking library

### Development Tools
- **VSCode Extensions**: Jest, Test Explorer
- **Coverage Reporting**: Istanbul, Codecov
- **Test Debugging**: Jest debug configuration

---

## Best Practices

### Writing Good Tests
1. **Test Behavior, Not Implementation**
   - Focus on what the component/function does
   - Don't test internal implementation details

2. **Use Descriptive Test Names**
   - Clear, specific test descriptions
   - Follow "should do X when Y" pattern

3. **Arrange, Act, Assert Pattern**
   - Setup test data (Arrange)
   - Execute the code (Act)
   - Verify the result (Assert)

4. **Test Edge Cases**
   - Error conditions
   - Boundary values
   - Empty states

5. **Keep Tests Independent**
   - Each test should be isolated
   - No shared state between tests

### Test Maintenance
- **Review Tests with Code Reviews**
- **Update Tests When Requirements Change**
- **Remove Obsolete Tests**
- **Refactor Tests for Clarity**

This testing strategy ensures quality delivery while maintaining the rapid development pace required for the 3-month sprint timeline.