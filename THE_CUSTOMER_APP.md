# StableBricks Customer Mobile App — AI Agent Prompt

Copy and paste the prompt below into your AI coding agent. It specifies a complete, production-grade mobile app that mirrors the StableBricks customer experience with modern UX/UI, strong architecture, and seamless integration with the existing Next.js backend.

---

## PROMPT FOR THE AI CODING AGENT

You are building the "StableBricks Customer" mobile app. Deliver a polished, modern, and accessible experience that mirrors the existing StableBricks web app for end customers. Prioritize performance, security, and an intuitive, delightful UI.

### 1) Objectives
- Build a production-ready mobile app for StableBricks customers.
- Reuse the existing StableBricks backend (Next.js/NextAuth/Prisma) where possible.
- Provide all key customer journeys: discover, invest, manage portfolio, wallet, wishlist, referrals, support, and settings.
- Ensure outstanding UX: fast, legible, consistent, with smooth micro-interactions.

### 2) Tech Stack & Standards
- Platform: React Native with Expo (latest), TypeScript.
- State & Data: TanStack Query for server cache, lightweight state (Zustand/Jotai) for UI state.
- Navigation: React Navigation (stack + bottom tabs + nested stacks per feature).
- UI: NativeWind (Tailwind in RN) or Tamagui with theme tokens; icon set via Lucide or Expo Vector Icons.
- Networking: `fetch` with typed API client; handle auth, retries, and error normalization.
- Storage: SecureStore/Keychain for tokens, AsyncStorage for non-sensitive cache.
- Forms & Validation: React Hook Form + Zod, matching server schemas where feasible.
- Testing: Jest/RTL for units, Detox for E2E (critical paths).
- Quality: ESLint, Prettier, TypeScript strict, CI-ready scripts.

### 3) Backend Integration
- Base URL: configure `API_BASE_URL` for the existing Next.js backend (e.g., https://stablebricks.com or an environment URL).
- Auth: NextAuth drives web sessions; for mobile use a dedicated mobile auth flow:
  - Add minimal REST endpoints in the backend that wrap existing server actions where required (e.g., credentials login, register, email verification, 2FA verification, password reset, current user, sign-out). Return signed JWTs (short-lived access + rotating refresh) for mobile clients.
  - Include endpoints for protected resources (wallet, investments, wishlist, profile, referrals, contact/complaints, land submissions) that internally reuse the server actions already in `actions/`.
- Known existing endpoints to leverage:
  - GET `/api/wallet/balance` (requires auth)
  - Uploads: `/api/uploadthing` (gate with auth; use for image documents if needed)
  - Flutterwave transfer callback: `/api/flutterwave/transfer-callback`
- For all other flows, implement clean REST handlers that proxy server actions (idempotent, well-typed) so the mobile app is fully supported without relying on Next.js session cookies.

### 4) Required Customer Features & Screens
Design with clear information hierarchy, large tap targets, and accessible color contrast. Include optimistic interactions and helpful empty/loading/error states. Group primary features into a bottom tab bar.

Tabs (Bottom Navigation):
1) Home
2) Explore
3) Portfolio
4) Wallet
5) Profile

Feature details:

- Home
  - Welcome header, key metrics, featured properties and investment projects.
  - Promotional banners, announcements, CTA to Explore and Invest.
  - Basic analytics page view tracking.

- Explore (Properties & Projects)
  - Filters: category/type/location/price/bedrooms (mirror `getPropertyListings`).
  - Listings grid/list with cover image, price, location, wishlist toggle.
  - Details pages:
    - Property Detail (slug-based; wishlist button, images gallery, features, location).
    - Project Detail (slug-based; ROI, duration, sold shares, investment CTA).

- Investment Flow
  - Start from Project Detail → Invest.
  - Choose amount/shares, select payment method: Wallet or Card (Flutterwave).
  - Flutterwave card flow; verify and finalize investment via server (`createInvestment` or `createWalletInvestment`).
  - Show success screen with certificate ID and option to view certificate later.

- Portfolio
  - My Investments list (status filters: all/pending/active/completed/end) using `getUserInvestments`.
  - Investment Detail: certificate number, project info, timelines, returns, status; button to download/view certificate (PDF) and share verification link (`/user-investment/:token`).

- Wallet
  - Balance with privacy toggle and pull-to-refresh.
  - Fund wallet via Flutterwave, withdraw funds to bank (account details form saved via `saveAccountDetails`).
  - Transaction history (initially mock or mapped once backend exposes `walletTransaction`).
  - Referral snippet and link with copy/share actions.

- Wishlist
  - Grid of saved properties via `getUserWishlist`, remove items via `removeFromWishlist`.

- Referrals
  - Show referral code and link (`getUserReferralInfo`), referral stats (bonus & count), sharing to WhatsApp/Email/Copy.

- Support
  - Contact form (general & user contact – `createUserContact`), Complaints (list/create/view – `createComplaint`, `getUserComplaints`).
  - FAQs & helpful links.

- Land Submissions (optional in MVP, but supported)
  - Submit land opportunity with images/docs (via UploadThing/S3); track status updates.

- Profile & Settings
  - View/update profile (name, phone, avatar), account details for withdrawals (`getUserAccountDetails`, `saveAccountDetails`).
  - Security: enable/disable 2FA (email token), change password, sign out.
  - Legal: privacy, terms; app version.

- Notifications
  - In-app center + push notifications via Expo (investment updates, wallet transactions, project announcements).

### 5) API Contract (Proposed Mobile-Friendly REST)
Create or confirm the following endpoints (server-side) that wrap server actions with JWT auth. Return `{ success: boolean, data?, error? }` consistently, with appropriate status codes.

Auth
- POST `/api/mobile/auth/register` → body: { fullName, email, password, phone, ref? } → reuse `regsiter`.
- POST `/api/mobile/auth/login` → body: { email, password, code? } → reuse `login`, handle 2FA; returns { accessToken, refreshToken }.
- POST `/api/mobile/auth/refresh` → body: { refreshToken } → returns { accessToken }.
- POST `/api/mobile/auth/logout`.
- GET `/api/mobile/me` → return current user profile.

Properties & Projects
- GET `/api/mobile/properties` → wrap `getPropertyListings` with filters.
- GET `/api/mobile/properties/:slug` → wrap `getPropertyBySlug`.
- GET `/api/mobile/projects` + `/api/mobile/projects/:slug` as needed.

Wishlist
- GET `/api/mobile/wishlist` → `getUserWishlist`.
- POST `/api/mobile/wishlist` → body: { listingId } → `addToWishlist`.
- DELETE `/api/mobile/wishlist/:listingId` → `removeFromWishlist`.

Investments & Portfolio
- GET `/api/mobile/investments` → `getUserInvestments`.
- GET `/api/mobile/investments/:id` → `getInvestmentById`.
- POST `/api/mobile/investments` → body: { projectId, amount, shares?, paymentMethod: 'CARD'|'WALLET', flutterwaveRef?, txRef? } → `createInvestment` or `createWalletInvestment`.
- GET `/api/mobile/investments/verify/:token` → `getInvestmentByToken`.
- GET `/api/mobile/investments/public/:token` → `getPublicInvestmentByToken`.

Wallet
- GET `/api/mobile/wallet` → `getWalletByUserId`.
- POST `/api/mobile/wallet/fund` → body: { amount, flutterwaveRef, txRef } → `addFunds`.
- POST `/api/mobile/wallet/withdraw` → body: { amount, accountDetails } → `withdrawFunds`.
- GET `/api/mobile/wallet/transactions` → `getTransactionHistory`.
- GET `/api/mobile/wallet/account` → `getUserAccountDetails`; POST `/api/mobile/wallet/account` → `saveAccountDetails`.

Referrals
- GET `/api/mobile/referrals` → `getUserReferralInfo`.

Support
- POST `/api/mobile/contact` → `createUserContact`.
- GET `/api/mobile/complaints` → `getUserComplaints`; POST `/api/mobile/complaints` → `createComplaint`.

Land Submissions (optional)
- POST `/api/mobile/land-submissions` → `submitLandPublic`; GET `/api/mobile/land-submissions` for user’s list if supported.

Uploads
- Use `/api/uploadthing` routes for authenticated uploads; return URL(s) to save on forms.

### 6) UX/UI Guidance
- Visual system:
  - Light/Dark theme, system-aware; color tokens, spacing scale, rounded corners, soft drop shadows.
  - Typography scale for readability; generous line-height; truncate long text with graceful fallbacks.
- Interactions:
  - Pull-to-refresh on lists; skeleton loaders; shimmer placeholders.
  - Toasts/snackbars for feedback; undo patterns when safe (e.g., wishlist remove).
  - Consistent empty states with helpful actions.
- Accessibility:
  - Large tap areas (min 44x44), semantic roles, VoiceOver/Screen Reader labels, high contrast.
- Internationalization-ready (copy centralization, currency formatting in NGN by default; extensible).

### 7) Security & Compliance
- Store tokens in SecureStore/Keychain; never in plaintext.
- Use TLS everywhere; validate backend SSL; set short-lived access tokens + refresh rotation.
- Validate all inputs with Zod; sanitize outputs; enforce server-side auth on all protected endpoints.
- Obfuscate build for release; strip dev logs; feature-flag debug menus.

### 8) Analytics & Tracking
- Page/screen tracking (map to GA events used on web); basic metrics for funnel and engagement.
- Error reporting with Sentry (JS errors + native crashes via Expo).

### 9) Offline & Performance
- Cache-first reads with TanStack Query; background revalidation.
- Pre-fetch next screens; lazy-load media; image caching; paginate lists.
- Handle offline gracefully with banners, retries, and user-controlled refresh.

### 10) Project Structure (Suggested)
```
apps/mobile/
  app/
    (tabs)/
      home/
      explore/
      portfolio/
      wallet/
      profile/
    investments/
    properties/
    projects/
    support/
    referrals/
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

### 11) Deliverables
- Complete Expo app with all screens, navigation, and API integrations.
- A typed API client layer matching the REST contract above.
- Theming, dark mode, responsive layouts, accessibility basics.
- E2E happy-path tests: login, browse, invest (mock Flutterwave), view portfolio, fund wallet, withdraw, wishlist.
- README with setup, envs, and run/release steps.

### 12) Environment & Config
- `.env`: `API_BASE_URL`, `EXPO_PUBLIC_API_BASE_URL`, `SENTRY_DSN`, `EXPO_PUBLIC_FLUTTERWAVE_PUBLIC_KEY`.
- Release builds for iOS and Android (Expo EAS), with push notifications configured.

### 13) Success Criteria
- Customers can register/login (incl. email verification & 2FA), browse properties/projects, invest, fund/withdraw wallet, manage wishlist, access certificates, submit contacts/complaints, and view/update profile – all reliably and quickly.
- Modern, consistent UI with zero major accessibility blockers and clear error/empty states.
- Secure auth, resilient networking, and smooth performance on mid-tier devices.

---

## Reference: Relevant Web App Features Observed
- Public routes include: `/`, `/about`, `/contact`, `/investments`, `/properties`, `/portfolio`, `/land-submissions`, `/user-investment/:token`, etc.
- Auth routes include: `/login`, `/register`, `/forgot-password`, `/new-password` with NextAuth and 2FA support.
- Customer protected areas (web): `/user/dashboard`, `/user/investments`, `/user/wallet`, `/user/wishlist`, `/user/complaints`, `/user/contact`, `/user/profile`, etc.
- Key server actions and APIs used in mobile spec come from `actions/` (wallet, investments, wishlist, referral, contact, complaint, settings) and `/api/uploadthing`, `/api/wallet/balance`.

Build the app to align with these capabilities and data flows.
