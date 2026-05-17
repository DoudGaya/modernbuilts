# StableBricks Developer Mobile App — AI Agent Prompt

Copy and paste the prompt below into your AI coding agent. It defines a complete, production-grade mobile app for Real Estate Developers partnering with StableBricks. It reflects allowed capabilities from the web project and focuses on efficient project/listing management, land submissions, reporting, and communications.

---

## PROMPT FOR THE AI CODING AGENT

You are building the "StableBricks Developer" mobile app for vetted construction/real-estate partners. Deliver a secure, modern, and efficient experience to propose, track, and manage projects and property listings, submit land opportunities, share updates, and collaborate with StableBricks.

### 1) Objectives
- Build a production-ready mobile app tailored to developers.
- Integrate with the existing StableBricks backend (Next.js/NextAuth/Prisma).
- Enable streamlined workflows: project proposals, listing creation, land submissions, events updates, reports, messaging, and notifications.
- Provide a clean, professional UI/UX with clarity, speed, and accessible patterns.

### 2) Tech Stack & Standards
- Platform: React Native with Expo (latest), TypeScript.
- Navigation: React Navigation (stack + tabs; nested feature stacks).
- UI: NativeWind or Tamagui; icon set via Lucide/Expo Vector Icons.
- Data: TanStack Query for network/cache; light client state via Zustand/Jotai.
- Forms & Validation: React Hook Form + Zod (mirror server schemas).
- Storage: SecureStore for tokens; AsyncStorage for auxiliary state.
- Testing: Jest/RTL + Detox for critical flows.
- Quality: ESLint, Prettier, TypeScript strict, CI-ready.

### 3) Authentication & Roles
- Role awareness: `UserRole` includes `DEVELOPER` in Prisma and routing.
- Mobile auth uses JWT (access + refresh) endpoints wrapping NextAuth credentials logic.
- Enforce authorization via role checks at endpoint-level and in UI (hide non-allowed actions).

### 4) Developer Feature Set & Screens
Design a bottom tab IA tailored for frequent tasks, plus nested flows.

Tabs (Bottom Navigation):
1) Dashboard
2) Projects
3) Listings
4) Land
5) Profile

Details:

- Dashboard
  - KPIs: total projects, active proposals, approved listings, land submissions status.
  - Recent activity: submissions, updates, admin feedback.
  - Announcements/events (public + developer-facing).

- Projects
  - List: filters by status (`PENDING`, `ACTIVE`, `COMPLETED`, `END`).
  - Create/Update project proposals: title, ROI, duration, location, capacity (shares), cover image, description, docs.
  - View project detail: status, shares sold, investor communications, admin feedback.
  - Send project updates to investors using backend helper (`sendProjectUpdateToInvestors`).
  - Construction progress: log milestones with photos, dates, notes.
  - Schedule: create and track project schedules/milestones.
  - Documents: manage contracts, approvals, drawings, and supporting files.

- Listings (Properties)
  - Create/Update/Delete property listings with media & attributes (price, location, bedrooms, bathrooms, area, type, category).
  - Manage listing status (Active/Paused/Archived).
  - View listing performance (wishlist counts when available).

- Land Submissions
  - Submit new land opportunities with location, ownership docs, images, and plans (via UploadThing/S3).
  - Track each submission: `PENDING`, `REVIEW`, `APPROVED`, `REJECTED`; receive admin feedback; upload additional plans.

- Reports & Events
  - View and publish developer reports (where permitted) — summaries, progress updates.
  - Browse platform events; register or manage participation for developer showcases.

- Messaging & Support
  - Contact StableBricks team; view replies.
  - Raise complaints/issues tied to projects/listings; track statuses.

- Profile & Settings
  - Company/individual profile, avatar.
  - Security: 2FA toggle, password management.
  - Legal: privacy, terms; app version.

- Notifications
  - Push notifications via Expo: submission status changes, admin feedback, required actions, investor questions.

### 5) Backend Integration (Mobile-Oriented REST)
Create mobile-friendly endpoints wrapping server actions in `actions/` with role checks. Use `{ success, data?, error? }` responses, typed DTOs.

Auth
- POST `/api/mobile/auth/login`, `/register`, `/refresh`, `/logout`, GET `/me` (role-aware user profile).

Projects
- GET `/api/mobile/projects` → wraps listing/read actions in `actions/projects.ts` (filter by ownership/status).
- GET `/api/mobile/projects/:id` → wraps detail actions in `actions/project.ts`.
- POST `/api/mobile/projects` → wraps create actions in `actions/project.ts`.
- PUT `/api/mobile/projects/:id` → wraps update actions in `actions/project.ts`.
- DELETE `/api/mobile/projects/:id` → wraps delete actions in `actions/project.ts`.
- POST `/api/mobile/projects/:id/notify-investors` → wraps investor notification utilities where available.

Listings
- GET `/api/mobile/listings` → wraps list/read in `actions/listing.ts`.
- GET `/api/mobile/listings/:id` → wraps detail in `actions/listing.ts`.
- POST `/api/mobile/listings` → wraps create in `actions/listing.ts` (FormData with uploads).
- PUT `/api/mobile/listings/:id` → wraps update in `actions/listing.ts`.
- DELETE `/api/mobile/listings/:id` → wraps delete in `actions/listing.ts`.

Land Submissions
- GET `/api/mobile/land-submissions` → wraps list/read in `actions/land-submission.ts` (scoped to developer).
- GET `/api/mobile/land-submissions/:id` → wraps detail in `actions/land-submission.ts`.
- POST `/api/mobile/land-submissions` → wraps create/submit in `actions/land-submission.ts`.
- PUT `/api/mobile/land-submissions/:id/status` → wraps status updates (admin-permitted) in `actions/land-submission.ts`.
- POST `/api/mobile/land-submissions/:id/plans` → wraps plan/uploads handling.
- POST `/api/mobile/land-submissions/:id/feedback` → wraps feedback handling.

Reports & Events
- GET `/api/mobile/reports` → wraps `getAllReports` (role-scoped) and `getPublicReports` where applicable.
- GET `/api/mobile/reports/:id`, POST `/api/mobile/reports`, PUT `/api/mobile/reports/:id`, DELETE `/api/mobile/reports/:id` → wraps respective actions with role restrictions.
- GET `/api/mobile/events` → wraps `getPublicEvents`; POST/PUT/DELETE for event management only if allowed.
- POST `/api/mobile/events/:id/register` → wraps `registerForEvent`.

Support & Communication
- GET `/api/mobile/contacts` (developer-scoped) and POST `/api/mobile/contact` → wraps actions in `actions/contact.ts`.
- GET `/api/mobile/complaints`, POST `/api/mobile/complaints` → wraps actions in `actions/complaint.ts`.

Uploads
- Use server upload endpoints (S3 pre-signed URLs or UploadThing, as configured) for authenticated uploads; return URL(s) for subsequent form submissions.

Analytics
- GET `/api/mobile/analytics` → wraps `getAnalyticsData` filtered for developer scope (projects/listings they own).

### 6) UX/UI Guidance
- Visual: enterprise-clean vibe; subdued color palette, ample whitespace, clear typography, consistent iconography.
- Patterns: segmented controls for status filters; sticky primary actions; progressive disclosure for advanced fields.
- Feedback: toasts/snackbars, inline validation, skeletons for lists, empty states with next actions.
- Accessibility: 44x44 touch targets, descriptive labels, high contrast, VoiceOver support.

### 7) Security
- JWTs in SecureStore; refresh rotation; TLS-only.
- Server-side role checks for every endpoint.
- Zod validation; sanitize file uploads; enforce file size/type limits.
- Audit logs (client events) for key actions (create/update/delete submissions).

### 8) Offline & Performance
- Cache-first reads with background revalidation.
- Prefetch next views; image/document caching; pagination and virtualized lists.
- Offline banners and retry logic for submissions.

### 9) Project Structure (Suggested)
```
apps/developer-mobile/
  app/
    (tabs)/
      dashboard/
      projects/
      listings/
      land/
      profile/
    reports/
    events/
    support/
    auth/
  components/
  lib/
    api/
    auth/
    storage/
    hooks/
    theme/
  tests/
```

### 10) Deliverables
- Expo app with all developer screens and navigation.
- Typed API client layer for all endpoints above; role-aware guards.
- Theming and dark mode; accessibility and enterprise-grade UX.
- E2E tests for key flows: login, create project, submit land, update listing, view analytics, handle feedback.
- README with setup, envs, release steps.

### 11) Environment & Config
- `.env`: `API_BASE_URL`, `EXPO_PUBLIC_API_BASE_URL`, `SENTRY_DSN`.
- Upload constraints mirrored from server (`uploadthing`).
- Push notifications configured via Expo EAS.

### 12) Success Criteria
- Developers can authenticate, create/update/manage projects and listings, submit and track land proposals, publish reports/events when permitted, communicate with StableBricks, and receive actionable notifications.
- The app is secure, fast, and pleasant to use on typical devices.

---

## Reference: Relevant Web App Features Observed
- Role: `DEVELOPER` present in routes utilities and Prisma enum.
- Actions relevant to developers: `project.ts`, `projects.ts`, `listing.ts`, `land-submission.ts`, `events.ts`, `reports.ts`, `analytics.ts`; uploads via S3/UploadThing based on server config.
- Developer routes exist: `/developer/dashboard`, `/developer/projects`, `/developer/land-submissions`, plus progress/schedule/documents pages.

Align the mobile app with these capabilities and scope all data to developer-owned records unless admin grants broader visibility.
