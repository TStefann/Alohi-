# Project 1: Manual QA Design for Authentication Flow

This file covers **manual QA testing strategy** for the authentication flow

---

## Scope

### In Scope

- **Signup flow**: email, 3rd party sign-up (google, microsoft, etc),
- **Login flow**: email/password, 3rd party logins, MFA, OAuth2 Authorization, SSO.
- **Cross-product credential sharing**: one account works across all products

### Out of Scope

- In-app functionality after successful login.
- Payment/subscription flows.
- API-only authentication validation
- Renew Personal Access Tokens from Integration app

---

## Test Coverage Approach

### Functional Testing

- Core flows (signup, login, password reset)
- Cross-product login consistency
- Error handling (invalid credentials, locked accounts, expired tokens).

### Exploratory Testing

- Switching apps with the same account
- Concurrent logins from multiple devices/browsers
- Authentication under unstable networks
- Behavior with session expiry

### Edge Case Testing

- Invalid emails (e.g., `user@@domain.com`)
- Very long/short passwords
- Case sensitivity in emails
- Reuse/expiry of password reset tokens

---

### Risks

- **Credential sync issues** across apps
- **Session conflicts** when switching products
- **Security issues** if error messages reveal sensitive info
- **Load handling risks** for authentication services

---

## Prioritization

- **High Priority**: core login/signup, cross-product sync, enterprise SSO,
- **Medium Priority**: input validation, session timeout, password reset
- **Low Priority**: rare browser/device quirks, cosmetic validation errors

---

## Test Scenarios

### Free User Flows

1. Signup with valid email/password → account created successfully
2. Login with new credentials → dashboard accessible
3. Invalid password login → correct error message
4. Password reset flow → reset link + successful login
5. Cross-app login (Sign.Plus → Fax.Plus) → seamless login

### Enterprise User Flows

6. Signup via enterprise invitation link → account activation.
7. SSO login with valid enterprise credentials → access granted.
8. SSO login with expired/invalid session → error handled.
9. Login before enterprise admin approval → restricted access.
10. Cross-app enterprise login (Dial.Plus → Fax.Plus) → credentials valid.

### Edge & Exploratory Scenarios

11. Multiple failed login attempts → account lockout policy (maybe?)
12. Same email for free + enterprise → validate system behavior
13. Simultaneous login from desktop + mobile → session handling
14. Session expiry → re-authentication prompt
15. Network interruptions during signup/login → graceful error

---
