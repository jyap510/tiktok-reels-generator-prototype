> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Session Live View

Session Live View lets you open a running cloud browser session in a normal browser tab to verify the session is active and see what the profile is doing in real time.

You can start cloud sessions either:

* from your automation code (Puppeteer / Playwright), or
* directly from the Gologin UI (Cloud Browser tab).

## Start a session from the Gologin UI

1. Open **Profile sections** in the Gologin web app - [https://app.gologin.com/profileList](https://app.gologin.com/profileList)
2. Select a profile.
3. Click **Run**.

When the session starts, you can open Live View to observe the running browser.

<video src="https://mintcdn.com/gologin/MYomXKgJO-Tvjooo/videos/0305.mp4?fit=max&auto=format&n=MYomXKgJO-Tvjooo&q=85&s=54130f37c532f213640a7185226e8747" controls={true} data-path="videos/0305.mp4" />

## Live View URL format

A running session can be opened using a URL like:

`https://cloudbrowser.gologin.com/browsers/<profileId>/<sessionId-or-view-token>/`

* `<profileId>` — the profile used for the session
* `<sessionId-or-view-token>` — a unique identifier for that running session (session id or view token)

> Treat this URL as sensitive while the session is active.

## When to use Live View

* Debugging automation flows (navigation, clicks, selectors, timeouts)
* Verifying that the cloud session actually started
* Observing the browser UI when a website behaves unexpectedly
* Confirming which profile is used for the running session

## Notes

* Live View is available only while the session is running.
* Closing the automation connection may end the session (depends on your workflow and plan limits).
* For repeatable configuration (proxy, fingerprint, etc.), configure the profile via the REST API:
  * Profiles API: [https://gologin.com/docs/api-reference/profile](https://gologin.com/docs/api-reference/profile)
  * Proxy API: [https://gologin.com/docs/api-reference/proxy](https://gologin.com/docs/api-reference/proxy)

## Next steps

* Cloud Browser → Getting Started: [https://gologin.com/docs/api-reference/cloud-browser/getting-started](https://gologin.com/docs/api-reference/cloud-browser/getting-started)
* Scraping Solution: [https://gologin.com/docs/api-reference/cloud-browser/scraping](https://gologin.com/docs/api-reference/cloud-browser/scrapping)


Built with [Mintlify](https://mintlify.com).