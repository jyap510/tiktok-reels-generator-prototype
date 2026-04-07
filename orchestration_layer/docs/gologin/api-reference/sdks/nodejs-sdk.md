> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Node.js SDK

> Run GoLogin profiles programmatically with the Node.js SDK

### Installation

```bash  theme={null}
npm i gologin
```

### Basic usage

```javascript  theme={null}
import GoLogin from 'gologin';

const GL = new GoLogin({
  token: 'your-api-token',
  profile_id: 'your-profile-id',
});

const { status, wsUrl } = await GL.start();
// Connect Puppeteer or Playwright using wsUrl
// ... your automation code ...
await GL.stop();
```

### Key parameters

| Parameter               | Default  | Description                                                                                               |
| ----------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `token`                 | required | Your GoLogin API token                                                                                    |
| `profile_id`            | required | Profile ID to launch                                                                                      |
| `executablePath`        | auto     | Path to Orbita browser binary                                                                             |
| `uploadCookiesToServer` | `false`  | Upload cookies to cloud on profile stop. Set to `true` if you need session persistence across devices.    |
| `checkBrowserUpdate`    | `true`   | Check for Orbita updates for this profile's version on launch. Set to `false` to pin the current version. |
| `autoUpdateBrowser`     | `true`   | Automatically download new Orbita versions. Set to `false` to prevent unexpected updates.                 |
| `extra_params`          | `[]`     | Additional Chromium flags passed to the browser                                                           |

### Stopping profiles

```javascript  theme={null}
// Stop and sync to cloud (default)
await GL.stop();

// Stop without syncing any data to cloud
await GL.stop({ posting: false });
```

Note: `posting: false` prevents profile data from being uploaded to GoLogin servers. Use this when running on servers where you don't want cloud sync.

### Managing Orbita browser versions

```javascript  theme={null}
import { checkAndDownloadBrowserByOpts } from 'gologin';

// Pre-download the latest Orbita version
await checkAndDownloadBrowserByOpts({ lastActualCount: 1 });

// Pre-download specific versions
await checkAndDownloadBrowserByOpts({ majorVersions: [142, 143] });
```

Use `checkAndDownloadBrowserByOpts` before launching profiles in parallel to avoid multiple simultaneous downloads.

### Running 100+ profiles in parallel

When running many profiles concurrently on a server:

```javascript  theme={null}
// Use a queue to limit concurrent launches
const CONCURRENCY = 10;
const queue = [...profileIds];
const active = new Set();

async function launchProfile(profileId) {
  const gl = new GoLogin({ token, profile_id: profileId });
  try {
    const { wsUrl } = await gl.start();
    // ... your automation ...
  } finally {
    await gl.stop();
  }
}

async function processQueue() {
  while (queue.length > 0) {
    while (active.size >= CONCURRENCY) {
      await new Promise(r => setTimeout(r, 1000));
    }
    const id = queue.shift();
    active.add(id);
    launchProfile(id).finally(() => active.delete(id));
  }
}
```

**Important for servers:**

* Limit concurrent profile launches (10-20 recommended to start)
* Pre-download Orbita versions before launching
* On Linux: install Xvfb and set `DISPLAY=:99`
* Increase file descriptor limits: `ulimit -n 65536`
* Monitor RAM: each profile uses \~300-500 MB

### Debugging

Set the environment variable for verbose logging:

```bash  theme={null}
DEBUG=gologin node your-script.js
```

### GitHub & Changelog

* Source code: [https://github.com/gologinapp/gologin](https://github.com/gologinapp/gologin)
* [Changelog](/api-reference/sdks/nodejs-changelog)


Built with [Mintlify](https://mintlify.com).