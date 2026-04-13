/**
 * tiktok_upload.ts
 *
 * Uploads a video to TikTok via a GoLogin Orbita local profile + Playwright.
 *
 * Prerequisites:
 *   1. Install deps (from orchestration_layer/):
 *        npm install gologin
 *        npx playwright install chromium
 *
 *   2. Log into TikTok inside your GoLogin profile manually first:
 *        - Open Orbita for the profile in the GoLogin desktop app
 *        - Navigate to tiktok.com and complete login (including 2FA)
 *        - Close Orbita — cookies are now persisted in the profile
 *
 *   3. Set environment variables:
 *        GOLOGIN_TOKEN      — your GoLogin API token (API & MCP > API tab)
 *        GOLOGIN_PROFILE_ID — the profile ID to use
 *        VIDEO_PATH         — absolute or relative path to the .mp4 file
 *        CAPTION            — caption text for the post
 *
 * Usage:
 *   npx tsx scripts/tiktok_upload.ts
 *
 * Capture/inspect mode (dumps DOM + screenshot to inspect TikTok's actual selectors):
 *   CAPTURE=1 npx tsx scripts/tiktok_upload.ts
 */

import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ─── Config ──────────────────────────────────────────────────────────────────

const GOLOGIN_TOKEN = process.env.GOLOGIN_TOKEN;
const GOLOGIN_PROFILE_ID = process.env.GOLOGIN_PROFILE_ID;
const VIDEO_PATH = process.env.VIDEO_PATH;
const CAPTION = process.env.CAPTION ?? '';
const CAPTURE_MODE = process.env.CAPTURE === '1';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function assertEnv(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function timestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const token = assertEnv('GOLOGIN_TOKEN', GOLOGIN_TOKEN);
  const profileId = assertEnv('GOLOGIN_PROFILE_ID', GOLOGIN_PROFILE_ID);

  if (!CAPTURE_MODE) {
    assertEnv('VIDEO_PATH', VIDEO_PATH);
    if (!fs.existsSync(VIDEO_PATH!)) {
      throw new Error(`Video file not found: ${VIDEO_PATH}`);
    }
  }

  // Dynamic import — gologin is a CJS module
  const { default: GoLogin } = await import('gologin');

  const GL = new GoLogin({
    token,
    profile_id: profileId,
  });

  let wsUrl: string;

  console.log('[gologin] Starting Orbita profile...');
  const { status, wsUrl: url } = await GL.start() as { status: string; wsUrl: string };
  wsUrl = url;
  console.log(`[gologin] Profile started (status: ${status})`);
  console.log(`[gologin] CDP endpoint: ${wsUrl}`);

  // Connect Playwright over CDP — wsUrl is a raw CDP endpoint, not a Playwright server
  const browser = await chromium.connectOverCDP(wsUrl);

  // Orbita launches with an existing context; use it instead of creating a new one
  const context = browser.contexts()[0] ?? await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('[playwright] Navigating to TikTok upload page...');
    await page.goto('https://www.tiktok.com/upload', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    // ── Capture mode: dump DOM + screenshot so you can inspect actual selectors ──
    if (CAPTURE_MODE) {
      const ts = timestamp();
      const htmlFile = path.resolve(`tiktok_upload_dom_${ts}.html`);
      const screenshotFile = path.resolve(`tiktok_upload_screenshot_${ts}.png`);

      const html = await page.content();
      fs.writeFileSync(htmlFile, html, 'utf8');
      await page.screenshot({ path: screenshotFile, fullPage: true });

      console.log(`[capture] DOM saved   → ${htmlFile}`);
      console.log(`[capture] Screenshot  → ${screenshotFile}`);
      console.log('[capture] Share these files to confirm selectors before running upload mode.');
      return;
    }

    // ── Step 1: Upload the video file ─────────────────────────────────────────
    //
    // TikTok's upload area has a hidden <input type="file"> in the DOM.
    // Playwright's setInputFiles() works on hidden inputs directly — no need
    // to click the drag-drop zone.
    //
    // NOTE: If this selector doesn't match, run CAPTURE=1 to get the actual DOM.

    console.log('[playwright] Waiting for file input...');
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.waitFor({ state: 'attached', timeout: 30_000 });

    const absVideoPath = path.resolve(VIDEO_PATH!);
    console.log(`[playwright] Uploading: ${absVideoPath}`);
    await fileInput.setInputFiles(absVideoPath);

    // ── Step 2: Wait for TikTok to finish encoding the video ──────────────────
    //
    // TikTok encodes the video client-side after upload. The caption editor
    // only becomes interactive after encoding completes.
    //
    // Strategy: wait for a [contenteditable] to appear (caption editor).
    // Timeout is generous (2 min) to handle large files over slow connections.

    console.log('[playwright] Waiting for video encoding to complete...');
    await page.waitForSelector('[contenteditable="true"]', {
      state: 'visible',
      timeout: 120_000,
    });

    // Small floor to avoid race on fast encodes where editor renders
    // but is not yet fully interactive
    await page.waitForTimeout(1_500);

    // ── Step 3: Fill the caption ──────────────────────────────────────────────
    //
    // TikTok uses a Draft.js / contenteditable editor for captions.
    // .first() guards against any other [contenteditable] in the nav.
    //
    // If the wrong element is targeted, CAPTURE=1 will show you the DOM
    // structure to find the correct locator.

    if (CAPTION) {
      console.log('[playwright] Filling caption...');
      const captionEditor = page.locator('[contenteditable="true"]').first();
      await captionEditor.click();
      await captionEditor.fill(CAPTION);
    }

    // ── Step 4: Click Post ────────────────────────────────────────────────────
    //
    // Role + accessible name is the most stable selector across TikTok deploys.

    console.log('[playwright] Clicking Post button...');
    const postButton = page.getByRole('button', { name: /^post$/i });
    await postButton.waitFor({ state: 'visible', timeout: 15_000 });
    await postButton.click();

    // ── Step 5: Confirm ───────────────────────────────────────────────────────

    // Wait briefly and screenshot the result page
    await page.waitForTimeout(5_000);
    const resultFile = path.resolve(`tiktok_post_result_${timestamp()}.png`);
    await page.screenshot({ path: resultFile });
    console.log(`[playwright] Done. Result screenshot → ${resultFile}`);

  } finally {
    await browser.close();
    console.log('[gologin] Stopping profile...');
    await GL.stop();
    console.log('[gologin] Profile stopped.');
  }
}

main().catch((err) => {
  console.error('[error]', err.message ?? err);
  process.exit(1);
});
