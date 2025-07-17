# Soash Entity Relationship Diagram - Lean MVP

## Database Schema Design

This ERD outlines the core entities and relationships required for the Soash Lean MVP (3-month sprint) as defined in the updated PRD and roadmap.

## Core Entities

### User Management

#### Users
```
users
├── id (PK, UUID)
├── email (UNIQUE, NOT NULL)
├── password_hash (NOT NULL)
├── first_name
├── last_name
├── is_verified (BOOLEAN, DEFAULT FALSE)
├── verification_token
├── subscription_tier (ENUM: free, pro, enterprise)
├── subscription_status (ENUM: active, cancelled, expired)
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
└── last_login_at (TIMESTAMP)
```

#### User_Profiles
```
user_profiles
├── id (PK, UUID)
├── user_id (FK → users.id)
├── brand_name
├── brand_description
├── industry
├── target_audience
├── brand_values (JSON)
├── business_goals (JSON)
├── timezone
├── avatar_url
├── onboarding_completed (BOOLEAN, DEFAULT FALSE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Social Platform Integration

#### Social_Accounts
```
social_accounts
├── id (PK, UUID)
├── user_id (FK → users.id)
├── platform (ENUM: instagram, facebook, tiktok, twitter, linkedin)
├── platform_user_id (NOT NULL)
├── username
├── display_name
├── avatar_url
├── follower_count
├── following_count
├── access_token (ENCRYPTED)
├── refresh_token (ENCRYPTED)
├── token_expires_at
├── is_active (BOOLEAN, DEFAULT TRUE)
├── last_synced_at (TIMESTAMP)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### Platform_Metrics
```
platform_metrics
├── id (PK, UUID)
├── social_account_id (FK → social_accounts.id)
├── metric_date (DATE)
├── follower_count
├── following_count
├── total_posts
├── total_reach
├── total_impressions
├── total_engagement
├── engagement_rate
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Content Management

#### Posts
```
posts
├── id (PK, UUID)
├── social_account_id (FK → social_accounts.id)
├── platform_post_id (NOT NULL)
├── content_type (ENUM: image, video, carousel, story, reel)
├── caption
├── media_urls (JSON)
├── hashtags (JSON)
├── posted_at (TIMESTAMP)
├── is_published (BOOLEAN, DEFAULT FALSE)
├── is_scheduled (BOOLEAN, DEFAULT FALSE)
├── scheduled_for (TIMESTAMP)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### Post_Metrics
```
post_metrics
├── id (PK, UUID)
├── post_id (FK → posts.id)
├── metric_date (DATE)
├── likes_count
├── comments_count
├── shares_count
├── saves_count
├── reach
├── impressions
├── engagement_rate
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### Content_Categories (Simplified)
```
content_categories
├── id (PK, UUID)
├── user_id (FK → users.id)
├── name (NOT NULL)
├── color_code
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### Post_Categories
```
post_categories
├── post_id (FK → posts.id)
├── category_id (FK → content_categories.id)
└── PRIMARY KEY (post_id, category_id)
```

### AI & Analytics

#### AI_Insights (Simplified)
```
ai_insights
├── id (PK, UUID)
├── user_id (FK → users.id)
├── insight_type (ENUM: performance, trend, recommendation)
├── title (NOT NULL)
├── description
├── priority (ENUM: low, medium, high)
├── is_read (BOOLEAN, DEFAULT FALSE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### Content_Recommendations (Simplified)
```
content_recommendations
├── id (PK, UUID)
├── user_id (FK → users.id)
├── recommendation_type (ENUM: content_idea, posting_time, hashtag)
├── title (NOT NULL)
├── description
├── content_brief (TEXT)
├── is_used (BOOLEAN, DEFAULT FALSE)
├── feedback_score (INTEGER 1-5)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### Performance_Patterns (Simplified)
```
performance_patterns
├── id (PK, UUID)
├── user_id (FK → users.id)
├── pattern_type (ENUM: content_type, posting_time, hashtag)
├── pattern_name
├── success_rate (DECIMAL 0-1)
├── sample_size (INTEGER)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Minimal Affiliate Program

#### Referral_Codes
```
referral_codes
├── id (PK, UUID)
├── user_id (FK → users.id)
├── code (UNIQUE, NOT NULL) -- Format: USER123-REF
├── is_active (BOOLEAN, DEFAULT TRUE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### Referral_Signups
```
referral_signups
├── id (PK, UUID)
├── referral_code_id (FK → referral_codes.id)
├── referee_user_id (FK → users.id)
├── signup_date (TIMESTAMP)
├── conversion_status (ENUM: pending, converted, paid)
├── commission_amount (DECIMAL)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Future Features (Post-MVP)

#### Team_Members (v2)
```
team_members (DEFERRED TO v2)
├── id (PK, UUID)
├── user_id (FK → users.id)
├── member_user_id (FK → users.id)
├── role (ENUM: admin, editor, viewer)
├── is_active (BOOLEAN, DEFAULT TRUE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### Scheduled_Posts (v2)
```
scheduled_posts (DEFERRED TO v2)
├── id (PK, UUID)
├── user_id (FK → users.id)
├── social_account_id (FK → social_accounts.id)
├── content_type (ENUM: image, video, carousel, story)
├── caption
├── media_urls (JSON)
├── hashtags (JSON)
├── scheduled_for (TIMESTAMP)
├── status (ENUM: scheduled, published, failed)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### Custom_Reports (v2)
```
custom_reports (DEFERRED TO v2)
├── id (PK, UUID)
├── user_id (FK → users.id)
├── report_name
├── report_config (JSON)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### System & Audit (Simplified)

#### System_Jobs (Basic)
```
system_jobs
├── id (PK, UUID)
├── job_type (ENUM: sync_metrics, generate_insights)
├── user_id (FK → users.id)
├── status (ENUM: pending, completed, failed)
├── error_message
├── started_at (TIMESTAMP)
├── completed_at (TIMESTAMP)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## Key Relationships (Lean MVP)

### One-to-Many Relationships
- **Users** → **User_Profiles** (1:1)
- **Users** → **Social_Accounts** (1:N)
- **Users** → **AI_Insights** (1:N)
- **Users** → **Content_Recommendations** (1:N)
- **Users** → **Referral_Codes** (1:N)
- **Social_Accounts** → **Posts** (1:N)
- **Social_Accounts** → **Platform_Metrics** (1:N)
- **Posts** → **Post_Metrics** (1:N)
- **Referral_Codes** → **Referral_Signups** (1:N)

### Many-to-Many Relationships
- **Posts** ↔ **Content_Categories** (via Post_Categories)

### Foreign Key Constraints
- All FK relationships maintain referential integrity
- CASCADE DELETE on user deletion (except system logs)
- RESTRICT DELETE on referenced entities with dependencies

## Indexes for Performance (Lean MVP)

### Primary Indexes
- All primary keys (id) are automatically indexed
- Unique constraints on email, platform + platform_user_id
- Unique constraint on referral_codes.code

### Secondary Indexes (Essential Only)
```sql
-- Performance critical queries
CREATE INDEX idx_posts_social_account_posted_at ON posts(social_account_id, posted_at);
CREATE INDEX idx_post_metrics_post_date ON post_metrics(post_id, metric_date);
CREATE INDEX idx_ai_insights_user_created ON ai_insights(user_id, created_at);
CREATE INDEX idx_platform_metrics_account_date ON platform_metrics(social_account_id, metric_date);
CREATE INDEX idx_referral_signups_code ON referral_signups(referral_code_id);

-- Search and filtering (basic)
CREATE INDEX idx_posts_content_type ON posts(content_type);
CREATE INDEX idx_social_accounts_platform ON social_accounts(platform);
CREATE INDEX idx_users_subscription_tier ON users(subscription_tier);
```

## Data Retention Policies (Lean MVP)

### Short-term (30 days)
- System job logs
- Basic error logs

### Medium-term (1 year)
- Daily platform metrics
- Post performance data
- AI insights and recommendations

### Long-term (Indefinite)
- User profiles and accounts
- Post content and metadata
- Referral program data

## Future Considerations (Post-MVP)

### Scalability Enhancements (v2)
- Partition large tables by user_id or date
- Implement read replicas for analytics queries
- Consider time-series database for metrics data

### Additional Features (v2+)
- Team management tables
- Content scheduling and calendar
- Advanced competitor analysis
- Custom reporting and exports
- Content templates and libraries

### Integration Opportunities (v3+)
- External tool integrations (Canva, Figma)
- API marketplace tables
- White-label customization
- Enterprise audit and compliance

## Lean MVP Benefits

### Complexity Reduction
- **15 fewer tables** vs. original ERD
- **Simplified relationships** and constraints
- **Reduced index overhead** for faster queries
- **Fewer foreign key constraints** to manage

### Development Speed
- **Faster migrations** with fewer tables
- **Simpler API endpoints** with reduced complexity
- **Easier testing** with focused data model
- **Quicker debugging** with streamlined schema

### Maintenance Benefits
- **Lower database overhead** for better performance
- **Simpler backup/restore** procedures
- **Reduced complexity** for team onboarding
- **Easier schema evolution** as features grow

This lean ERD provides a solid foundation for the 3-month Soash MVP while maintaining extensibility for future enterprise features and scaling requirements.