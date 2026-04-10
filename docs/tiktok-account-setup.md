# TikTok Account Setup (No Google Required)

TikTok supports Google OAuth, email, and phone signup. For multi-account automation via GoLogin, **avoid Google OAuth** — it ties each account to a real Google identity and creates cross-account traceability.

Use email or phone instead.

---

## Option A: Email Accounts (Recommended for Scale)

### What you need

A **catch-all email domain** — one domain where every possible address (`anything@yourdomain.com`) routes to your inbox. One domain supports unlimited unique TikTok accounts.

### Setup (one-time)

1. Register a domain (~$10/yr on Namecheap, Porkbun, etc.)
2. Add it to **Cloudflare** (free)
3. Enable **Cloudflare Email Routing** → set a catch-all rule → forward to your real inbox
4. Done — `tiktok_acct1@yourdomain.com`, `tiktok_acct2@yourdomain.com`, etc. all land in one place

### Per account

1. Open the GoLogin profile in Orbita
2. Go to `tiktok.com/signup`
3. Choose **"Use phone or email"** → **Email** tab
4. Enter a fresh address (e.g., `tiktok_<profileid>@yourdomain.com`)
5. Confirm OTP from your inbox
6. Complete profile setup
7. Close Orbita — session is now persisted in the profile

---

## Option B: Phone / SMS Accounts (Higher Trust Score)

TikTok treats phone-verified accounts as higher trust than email. Useful if you're running into restrictions on fresh accounts.

**SMS activation services:**
- [SMS-Activate](https://sms-activate.io) — ~$0.20–$1 per number
- [5sim](https://5sim.net) — similar pricing

Buy a number, receive OTP on the site, complete signup. Don't reuse numbers across accounts.

---

## After Initial Login

Once you've logged in once manually, the GoLogin profile holds the session cookie. The upload macro (`tiktok_upload.ts`) resumes that session directly — **no login flow, no OTP, no Google** on subsequent runs.

You only go through this setup once per account.

---

## Current Status

For development/testing: use a single throwaway account logged in manually to a GoLogin profile. The upload script works identically regardless of how the account was created.

For production at scale: catch-all domain is the lowest-friction path. SMS is better for trust score but costs per account.

---

## Quick Reference

| Approach | Cost | Trust | Scales? |
|----------|------|-------|---------|
| Google OAuth | Free | High (but risky — shared identity) | No |
| Email (catch-all domain) | ~$10/yr domain | Medium | Yes — unlimited |
| SMS (activation service) | ~$0.50/account | Higher | Yes — costs scale linearly |
