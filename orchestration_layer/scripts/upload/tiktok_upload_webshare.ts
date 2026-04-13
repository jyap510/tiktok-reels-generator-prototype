/**
 * tiktok_upload_webshare.ts
 *
 * Uploads a video to TikTok via a WebShare HTTP proxy + Playwright.
 * Credentials are loaded from the repo root .env file automatically.
 *
 * Prerequisites:
 *   npm install dotenv
 *   npx playwright install chromium
 *
 * ── Modes ─────────────────────────────────────────────────────────────────────
 *
 *   LOGIN=1   — automates TikTok login with TIKTOK_USERNAME + TIKTOK_PASSWORD.
 *               Pauses if a CAPTCHA is detected so you can solve it manually.
 *               Saves session to TIKTOK_AUTH_STATE (default: tiktok_auth.json).
 *               Run this once; subsequent uploads reuse the saved session.
 *
 *   (default) — upload mode. Loads saved session and posts the video.
 *
 *   CAPTURE=1 — dumps DOM + screenshot of the upload page for selector inspection.
 *
 * ── Required .env keys ────────────────────────────────────────────────────────
 *   TIKTOK_USERNAME          TikTok username or email
 *   TIKTOK_PASSWORD          TikTok password
 *   WEBSHARE_PROXY_SERVER    e.g. http://proxy.webshare.io:80
 *   WEBSHARE_USERNAME        WebShare proxy username
 *   WEBSHARE_PASSWORD        WebShare proxy password
 *
 * ── Optional .env / shell keys ────────────────────────────────────────────────
 *   TIKTOK_AUTH_STATE        path to auth JSON (default: tiktok_auth.json)
 *   HEADLESS                 set to "0" to show the browser (default: headless)
 *   VIDEO_PATH               required in upload mode
 *   CAPTION                  post caption (default: empty)
 *
 * ── Usage ─────────────────────────────────────────────────────────────────────
 *   LOGIN=1 npx tsx scripts/upload/tiktok_upload_webshare.ts
 *   VIDEO_PATH=/path/to/video.mp4 CAPTION="my caption" npx tsx scripts/upload/tiktok_upload_webshare.ts
 *   CAPTURE=1 npx tsx scripts/upload/tiktok_upload_webshare.ts
 */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { fileURLToPath } from 'url';
import { chromium, type BrowserContext, type Page } from '@playwright/test';

// ─── Load .env from repo root ─────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// ─── Config ───────────────────────────────────────────────────────────────────

const PROXY_SERVER  = process.env.WEBSHARE_PROXY_SERVER;
const PROXY_USER    = process.env.WEBSHARE_USERNAME;
const PROXY_PASS    = process.env.WEBSHARE_PASSWORD;
const TT_USER       = process.env.TIKTOK_USERNAME;
const TT_PASS       = process.env.TIKTOK_PASSWORD;
const VIDEO_PATH    = process.env.VIDEO_PATH;
const CAPTION       = process.env.CAPTION ?? '';
const AUTH_STATE    = process.env.TIKTOK_AUTH_STATE ?? 'tiktok_auth.json';
const LOGIN_MODE    = process.env.LOGIN === '1';
const CAPTURE_MODE  = process.env.CAPTURE === '1';
const HEADLESS      = process.env.HEADLESS !== '0';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function assertEnv(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function timestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function waitForEnter(prompt: string): Promise<void> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(prompt, () => { rl.close(); resolve(); });
  });
}

function proxyConfig() {
  return {
    server:   assertEnv('WEBSHARE_PROXY_SERVER', PROXY_SERVER),
    username: assertEnv('WEBSHARE_USERNAME', PROXY_USER),
    password: assertEnv('WEBSHARE_PASSWORD', PROXY_PASS),
  };
}

// ─── Login flow ───────────────────────────────────────────────────────────────
//
// TikTok's login page layout (as of 2025):
//   /login → "Use phone / email / username" link
//   → tabs: "Email" | "Username" (we target Username tab)
//   → input[name="username"], input[type="password"]
//   → button[type="submit"] or role=button "Log in"
//
// TikTok changes selectors aggressively. If this breaks, run:
//   CAPTURE=1 LOGIN=1 npx tsx ... and inspect the saved DOM.

async function automateLogin(page: Page): Promise<void> {
  console.log('[login] Navigating to TikTok login...');
  await page.goto('https://www.tiktok.com/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60_000,
  });

  // TikTok sometimes lands on a modal or /login/phone-or-email — handle both.
  // Step 1: click "Use phone / email / username" if it exists
  try {
    const phoneEmailLink = page.getByText(/use phone \/ email \/ username/i);
    await phoneEmailLink.waitFor({ state: 'visible', timeout: 8_000 });
    await phoneEmailLink.click();
    console.log('[login] Clicked "Use phone / email / username"');
  } catch {
    console.log('[login] Phone/email link not found — assuming already on credential form.');
  }

  // Step 2: switch to "Email or username" tab if tabs exist
  try {
    const emailTab = page.getByText(/email or username/i);
    await emailTab.waitFor({ state: 'visible', timeout: 5_000 });
    await emailTab.click();
    console.log('[login] Clicked "Email or username" tab');
  } catch {
    // Tab may not exist depending on layout variant
  }

  // Step 3: fill credentials
  console.log('[login] Filling credentials...');
  const usernameInput = page.locator('input[name="username"], input[autocomplete="username"]').first();
  await usernameInput.waitFor({ state: 'visible', timeout: 15_000 });
  await usernameInput.fill(assertEnv('TIKTOK_USERNAME', TT_USER));

  const passwordInput = page.locator('input[type="password"]').first();
  await passwordInput.waitFor({ state: 'visible', timeout: 5_000 });
  await passwordInput.fill(assertEnv('TIKTOK_PASSWORD', TT_PASS));

  // Step 4: submit
  console.log('[login] Submitting...');
  const submitBtn = page.locator('button[type="submit"], button[data-e2e="login-button"]').first();
  await submitBtn.waitFor({ state: 'visible', timeout: 5_000 });
  await submitBtn.click();

  // Step 5: detect CAPTCHA or successful redirect
  console.log('[login] Waiting for redirect or CAPTCHA...');
  try {
    await page.waitForURL(/tiktok\.com\/(?!login)/, { timeout: 15_000 });
    console.log('[login] Logged in successfully.');
  } catch {
    console.log('[login] Redirect timed out — CAPTCHA or extra verification likely present.');
    console.log('[login] Solve it in the browser window, then press Enter here to continue.');
    await waitForEnter('');
    // Verify we actually got through
    if (page.url().includes('/login')) {
      throw new Error('Still on login page after manual intervention — login failed.');
    }
    console.log('[login] Proceeding after manual step.');
  }
}

// ─── Login mode ───────────────────────────────────────────────────────────────

async function loginMode() {
  console.log(`[login] Auth state will be saved to: ${path.resolve(AUTH_STATE)}`);

  const browser = await chromium.launch({
    headless: false, // always visible for login so you can handle CAPTCHAs
    proxy: proxyConfig(),
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await automateLogin(page);
    await context.storageState({ path: AUTH_STATE });
    console.log(`[login] Session saved → ${path.resolve(AUTH_STATE)}`);
  } finally {
    await browser.close();
  }
}

// ─── Upload mode ──────────────────────────────────────────────────────────────

async function uploadMode() {
  if (!CAPTURE_MODE) {
    assertEnv('VIDEO_PATH', VIDEO_PATH);
    if (!fs.existsSync(VIDEO_PATH!)) {
      throw new Error(`Video file not found: ${VIDEO_PATH}`);
    }
  }

  if (!fs.existsSync(AUTH_STATE)) {
    throw new Error(
      `No session found at "${AUTH_STATE}". Run LOGIN=1 first.`
    );
  }

  const browser = await chromium.launch({
    headless: HEADLESS,
    proxy: proxyConfig(),
  });

  const context: BrowserContext = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  try {
    console.log('[playwright] Navigating to TikTok upload page...');
    await page.goto('https://www.tiktok.com/upload', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    // ── Capture mode ──────────────────────────────────────────────────────────
    if (CAPTURE_MODE) {
      const ts = timestamp();
      const htmlFile  = path.resolve(`tiktok_upload_dom_${ts}.html`);
      const shotFile  = path.resolve(`tiktok_upload_screenshot_${ts}.png`);
      fs.writeFileSync(htmlFile, await page.content(), 'utf8');
      await page.screenshot({ path: shotFile, fullPage: true });
      console.log(`[capture] DOM        → ${htmlFile}`);
      console.log(`[capture] Screenshot → ${shotFile}`);
      return;
    }

    // ── Step 1: upload file ───────────────────────────────────────────────────
    console.log('[playwright] Waiting for file input...');
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.waitFor({ state: 'attached', timeout: 30_000 });

    const absVideoPath = path.resolve(VIDEO_PATH!);
    console.log(`[playwright] Uploading: ${absVideoPath}`);
    await fileInput.setInputFiles(absVideoPath);

    // ── Step 2: wait for encoding ─────────────────────────────────────────────
    console.log('[playwright] Waiting for TikTok to encode the video...');
    await page.waitForSelector('[contenteditable="true"]', {
      state: 'visible',
      timeout: 120_000,
    });
    await page.waitForTimeout(1_500);

    // ── Step 3: caption ───────────────────────────────────────────────────────
    if (CAPTION) {
      console.log('[playwright] Filling caption...');
      const editor = page.locator('[contenteditable="true"]').first();
      await editor.click();
      await editor.fill(CAPTION);
    }

    // ── Step 4: post ──────────────────────────────────────────────────────────
    console.log('[playwright] Clicking Post...');
    const postBtn = page.getByRole('button', { name: /^post$/i });
    await postBtn.waitFor({ state: 'visible', timeout: 15_000 });
    await postBtn.click();

    // ── Step 5: confirm ───────────────────────────────────────────────────────
    await page.waitForTimeout(5_000);
    const resultFile = path.resolve(`tiktok_post_result_${timestamp()}.png`);
    await page.screenshot({ path: resultFile });
    console.log(`[playwright] Done. Screenshot → ${resultFile}`);

  } finally {
    await browser.close();
  }
}

// ─── Entry ────────────────────────────────────────────────────────────────────

async function main() {
  if (LOGIN_MODE) {
    await loginMode();
  } else {
    await uploadMode();
  }
}

main().catch((err) => {
  console.error('[error]', err.message ?? err);
  process.exit(1);
});
