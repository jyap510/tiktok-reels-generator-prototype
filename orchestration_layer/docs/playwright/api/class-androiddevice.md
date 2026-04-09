On this page

# AndroidDevice

[AndroidDevice](</docs/api/class-androiddevice> "AndroidDevice") represents a connected device, either real hardware or emulated. Devices can be obtained using [android.devices()](</docs/api/class-android#android-devices>).

* * *

## Methods​

### close​

Added in: v1.9 androidDevice.close

Disconnects from the device.

**Usage**
    
    
    await androidDevice.close();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### drag​

Added in: v1.9 androidDevice.drag

Drags the widget defined by [selector](</docs/api/class-androiddevice#android-device-drag-option-selector>) towards [dest](</docs/api/class-androiddevice#android-device-drag-option-dest>) point.

**Usage**
    
    
    await androidDevice.drag(selector, dest);  
    await androidDevice.drag(selector, dest, options);  
    

**Arguments**

  * `selector` [AndroidSelector]#

Selector to drag.

  * `dest` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")#

    * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

    * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Point to drag to.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `speed` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Optional speed of the drag in pixels per second.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>) method.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### fill​

Added in: v1.9 androidDevice.fill

Fills the specific [selector](</docs/api/class-androiddevice#android-device-fill-option-selector>) input box with [text](</docs/api/class-androiddevice#android-device-fill-option-text>).

**Usage**
    
    
    await androidDevice.fill(selector, text);  
    await androidDevice.fill(selector, text, options);  
    

**Arguments**

  * `selector` [AndroidSelector]#

Selector to fill.

  * `text` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Text to be filled in the input box.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>) method.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### fling​

Added in: v1.9 androidDevice.fling

Flings the widget defined by [selector](</docs/api/class-androiddevice#android-device-fling-option-selector>) in the specified [direction](</docs/api/class-androiddevice#android-device-fling-option-direction>).

**Usage**
    
    
    await androidDevice.fling(selector, direction);  
    await androidDevice.fling(selector, direction, options);  
    

**Arguments**

  * `selector` [AndroidSelector]#

Selector to fling.

  * `direction` "down" | "up" | "left" | "right"#

Fling direction.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `speed` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Optional speed of the fling in pixels per second.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>) method.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### info​

Added in: v1.9 androidDevice.info

Returns information about a widget defined by [selector](</docs/api/class-androiddevice#android-device-info-option-selector>).

**Usage**
    
    
    await androidDevice.info(selector);  
    

**Arguments**

  * `selector` [AndroidSelector]#

Selector to return information about.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[AndroidElementInfo]>#



* * *

### installApk​

Added in: v1.9 androidDevice.installApk

Installs an apk on the device.

**Usage**
    
    
    await androidDevice.installApk(file);  
    await androidDevice.installApk(file, options);  
    

**Arguments**

  * `file` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [Buffer](<https://nodejs.org/api/buffer.html#buffer_class_buffer> "Buffer")#

Either a path to the apk file, or apk file content.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `args` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")> _(optional)_#

Optional arguments to pass to the `shell:cmd package install` call. Defaults to `-r -t -S`.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### launchBrowser​

Added in: v1.9 androidDevice.launchBrowser

Launches Chrome browser on the device, and returns its persistent context.

**Usage**
    
    
    await androidDevice.launchBrowser();  
    await androidDevice.launchBrowser(options);  
    

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `acceptDownloads` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.

    * `args` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")> _(optional)_ Added in: v1.29#

warning

Use custom browser args at your own risk, as some of them may break Playwright functionality.

Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](<https://peter.sh/experiments/chromium-command-line-switches/>).

    * `baseURL` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

When using [page.goto()](</docs/api/class-page#page-goto>), [page.route()](</docs/api/class-page#page-route>), [page.waitForURL()](</docs/api/class-page#page-wait-for-url>), [page.waitForRequest()](</docs/api/class-page#page-wait-for-request>), or [page.waitForResponse()](</docs/api/class-page#page-wait-for-response>) it takes the base URL in consideration by using the [`URL()`](<https://developer.mozilla.org/en-US/docs/Web/API/URL/URL>) constructor for building the corresponding URL. Unset by default. Examples:

      * baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
      * baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
      * baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`
    * `bypassCSP` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Toggles bypassing page's Content-Security-Policy. Defaults to `false`.

    * `colorScheme` [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | "light" | "dark" | "no-preference" _(optional)_#

Emulates [prefers-colors-scheme](<https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme>) media feature, supported values are `'light'` and `'dark'`. See [page.emulateMedia()](</docs/api/class-page#page-emulate-media>) for more details. Passing `null` resets emulation to system defaults. Defaults to `'light'`.

    * `contrast` [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | "no-preference" | "more" _(optional)_#

Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [page.emulateMedia()](</docs/api/class-page#page-emulate-media>) for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.

    * `deviceScaleFactor` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Specify device scale factor (can be thought of as dpr). Defaults to `1`. Learn more about [emulating devices with device scale factor](</docs/emulation#devices>).

    * `extraHTTPHeaders` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string"), [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")> _(optional)_#

An object containing additional HTTP headers to be sent with every request. Defaults to none.

    * `forcedColors` [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | "active" | "none" _(optional)_#

Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [page.emulateMedia()](</docs/api/class-page#page-emulate-media>) for more details. Passing `null` resets emulation to system defaults. Defaults to `'none'`.

    * `geolocation` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

      * `latitude` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Latitude between -90 and 90.

      * `longitude` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Longitude between -180 and 180.

      * `accuracy` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_

Non-negative accuracy value. Defaults to `0`.

    * `hasTouch` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Specifies if viewport supports touch events. Defaults to false. Learn more about [mobile emulation](</docs/emulation#devices>).

    * `httpCredentials` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

      * `username` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

      * `password` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

      * `origin` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Restrain sending http credentials on specific origin (scheme://host:port).

      * `send` "unauthorized" | "always" _(optional)_

This option only applies to the requests sent from corresponding [APIRequestContext](</docs/api/class-apirequestcontext> "APIRequestContext") and does not affect requests sent from the browser. `'always'` \- `Authorization` header with basic authentication credentials will be sent with the each API request. `'unauthorized` \- the credentials are only sent when 401 (Unauthorized) response with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.

Credentials for [HTTP authentication](<https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication>). If no origin is specified, the username and password are sent to any servers upon unauthorized responses.

    * `ignoreHTTPSErrors` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.

    * `isMobile` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether the `meta viewport` tag is taken into account and touch events are enabled. isMobile is a part of device, so you don't actually need to set it manually. Defaults to `false` and is not supported in Firefox. Learn more about [mobile emulation](</docs/emulation#ismobile>).

    * `javaScriptEnabled` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether or not to enable JavaScript in the context. Defaults to `true`. Learn more about [disabling JavaScript](</docs/emulation#javascript-enabled>).

    * `locale` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to the system default locale. Learn more about emulation in our [emulation guide](</docs/emulation#locale--timezone>).

    * `logger` [Logger](</docs/api/class-logger> "Logger") _(optional)_#

Deprecated

The logs received by the logger are incomplete. Please use tracing instead.

Logger sink for Playwright logging.

    * `offline` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to emulate network being offline. Defaults to `false`. Learn more about [network emulation](</docs/emulation#offline>).

    * `permissions` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")> _(optional)_#

A list of permissions to grant to all pages in this context. See [browserContext.grantPermissions()](</docs/api/class-browsercontext#browser-context-grant-permissions>) for more details. Defaults to none.

    * `pkg` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Optional package name to launch instead of default Chrome for Android.

    * `proxy` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_ Added in: v1.29#

      * `server` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.

      * `bypass` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.

      * `username` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Optional username to use if HTTP proxy requires authentication.

      * `password` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Optional password to use if HTTP proxy requires authentication.

Network proxy settings.

    * `recordHar` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

      * `omitContent` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_

Optional setting to control whether to omit request content from the HAR. Defaults to `false`. Deprecated, use `content` policy instead.

      * `content` "omit" | "embed" | "attach" _(optional)_

Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file as per HAR specification. Defaults to `attach` for `.zip` output files and to `embed` for all other file extensions.

      * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

Path on the filesystem to write the HAR file to. If the file name ends with `.zip`, `content: 'attach'` is used by default.

      * `mode` "full" | "minimal" _(optional)_

When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.

      * `urlFilter` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") _(optional)_

A glob or regex pattern to filter requests that are stored in the HAR. When a [baseURL](</docs/api/class-browser#browser-new-context-option-base-url>) via the context options was provided and the passed URL is a path, it gets merged via the [`new URL()`](<https://developer.mozilla.org/en-US/docs/Web/API/URL/URL>) constructor. Defaults to none.

Enables [HAR](<http://www.softwareishard.com/blog/har-12-spec>) recording for all pages into `recordHar.path` file. If not specified, the HAR is not recorded. Make sure to await [browserContext.close()](</docs/api/class-browsercontext#browser-context-close>) for the HAR to be saved.

    * `recordVideo` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

      * `dir` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Path to the directory to put videos into. If not specified, the videos will be stored in `artifactsDir` (see [browserType.launch()](</docs/api/class-browsertype#browser-type-launch>) options).

      * `size` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

        * `width` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Video frame width.

        * `height` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Video frame height.

Optional dimensions of the recorded videos. If not specified the size will be equal to `viewport` scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450. Actual picture of each page will be scaled down if necessary to fit the specified size.

      * `showActions` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

        * `duration` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_

How long each annotation is displayed in milliseconds. Defaults to `500`.

        * `position` "top-left" | "top" | "top-right" | "bottom-left" | "bottom" | "bottom-right" _(optional)_

Position of the action title overlay. Defaults to `"top-right"`.

        * `fontSize` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_

Font size of the action title in pixels. Defaults to `24`.

If specified, enables visual annotations on interacted elements during video recording.

Enables video recording for all pages into `recordVideo.dir` directory. If not specified videos are not recorded. Make sure to await [browserContext.close()](</docs/api/class-browsercontext#browser-context-close>) for videos to be saved.

    * `reducedMotion` [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | "reduce" | "no-preference" _(optional)_#

Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [page.emulateMedia()](</docs/api/class-page#page-emulate-media>) for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.

    * `screen` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

      * `width` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

page width in pixels.

      * `height` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

page height in pixels.

Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the [viewport](</docs/api/class-androiddevice#android-device-launch-browser-option-viewport>) is set.

    * `serviceWorkers` "allow" | "block" _(optional)_#

Whether to allow sites to register Service workers. Defaults to `'allow'`.

      * `'allow'`: [Service Workers](<https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API>) can be registered.
      * `'block'`: Playwright will block all registration of Service Workers.
    * `strictSelectors` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

If set to true, enables strict selectors mode for this context. In the strict selectors mode all operations on selectors that imply single target DOM element will throw when more than one element matches the selector. This option does not affect any Locator APIs (Locators are always strict). Defaults to `false`. See [Locator](</docs/api/class-locator> "Locator") to learn more about the strict mode.

    * `timezoneId` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Changes the timezone of the context. See [ICU's metaZones.txt](<https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1>) for a list of supported timezone IDs. Defaults to the system timezone.

    * `userAgent` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Specific user agent to use in this context.

    * `videoSize` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

Deprecated

Use [recordVideo](</docs/api/class-androiddevice#android-device-launch-browser-option-record-video>) instead.

      * `width` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Video frame width.

      * `height` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Video frame height.

    * `videosPath` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Deprecated

Use [recordVideo](</docs/api/class-androiddevice#android-device-launch-browser-option-record-video>) instead.

    * `viewport` [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

      * `width` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

page width in pixels.

      * `height` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

page height in pixels.

Emulates consistent viewport for each page. Defaults to an 1280x720 viewport. Use `null` to disable the consistent viewport emulation. Learn more about [viewport emulation](</docs/emulation#viewport>).

note

The `null` value opts out from the default presets, makes viewport depend on the host window size defined by the operating system. It makes the execution of the tests non-deterministic.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[BrowserContext](</docs/api/class-browsercontext> "BrowserContext")>#



* * *

### longTap​

Added in: v1.9 androidDevice.longTap

Performs a long tap on the widget defined by [selector](</docs/api/class-androiddevice#android-device-long-tap-option-selector>).

**Usage**
    
    
    await androidDevice.longTap(selector);  
    await androidDevice.longTap(selector, options);  
    

**Arguments**

  * `selector` [AndroidSelector]#

Selector to tap on.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>) method.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### model​

Added in: v1.9 androidDevice.model

Device model.

**Usage**
    
    
    androidDevice.model();  
    

**Returns**

  * [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#



* * *

### open​

Added in: v1.9 androidDevice.open

Launches a process in the shell on the device and returns a socket to communicate with the launched process.

**Usage**
    
    
    await androidDevice.open(command);  
    

**Arguments**

  * `command` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Shell command to execute.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[AndroidSocket](</docs/api/class-androidsocket> "AndroidSocket")>#



* * *

### pinchClose​

Added in: v1.9 androidDevice.pinchClose

Pinches the widget defined by [selector](</docs/api/class-androiddevice#android-device-pinch-close-option-selector>) in the closing direction.

**Usage**
    
    
    await androidDevice.pinchClose(selector, percent);  
    await androidDevice.pinchClose(selector, percent, options);  
    

**Arguments**

  * `selector` [AndroidSelector]#

Selector to pinch close.

  * `percent` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

The size of the pinch as a percentage of the widget's size.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `speed` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Optional speed of the pinch in pixels per second.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>) method.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### pinchOpen​

Added in: v1.9 androidDevice.pinchOpen

Pinches the widget defined by [selector](</docs/api/class-androiddevice#android-device-pinch-open-option-selector>) in the open direction.

**Usage**
    
    
    await androidDevice.pinchOpen(selector, percent);  
    await androidDevice.pinchOpen(selector, percent, options);  
    

**Arguments**

  * `selector` [AndroidSelector]#

Selector to pinch open.

  * `percent` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

The size of the pinch as a percentage of the widget's size.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `speed` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Optional speed of the pinch in pixels per second.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>) method.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### press​

Added in: v1.9 androidDevice.press

Presses the specific [key](</docs/api/class-androiddevice#android-device-press-option-key>) in the widget defined by [selector](</docs/api/class-androiddevice#android-device-press-option-selector>).

**Usage**
    
    
    await androidDevice.press(selector, key);  
    await androidDevice.press(selector, key, options);  
    

**Arguments**

  * `selector` [AndroidSelector]#

Selector to press the key in.

  * `key` [AndroidKey]#

The key to press.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>) method.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### push​

Added in: v1.9 androidDevice.push

Copies a file to the device.

**Usage**
    
    
    await androidDevice.push(file, path);  
    await androidDevice.push(file, path, options);  
    

**Arguments**

  * `file` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [Buffer](<https://nodejs.org/api/buffer.html#buffer_class_buffer> "Buffer")#

Either a path to the file, or file content.

  * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Path to the file on the device.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `mode` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Optional file mode, defaults to `644` (`rw-r--r--`).




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### screenshot​

Added in: v1.9 androidDevice.screenshot

Returns the buffer with the captured screenshot of the device.

**Usage**
    
    
    await androidDevice.screenshot();  
    await androidDevice.screenshot(options);  
    

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

The file path to save the image to. If [path](</docs/api/class-androiddevice#android-device-screenshot-option-path>) is a relative path, then it is resolved relative to the current working directory. If no path is provided, the image won't be saved to the disk.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Buffer](<https://nodejs.org/api/buffer.html#buffer_class_buffer> "Buffer")>#



* * *

### scroll​

Added in: v1.9 androidDevice.scroll

Scrolls the widget defined by [selector](</docs/api/class-androiddevice#android-device-scroll-option-selector>) in the specified [direction](</docs/api/class-androiddevice#android-device-scroll-option-direction>).

**Usage**
    
    
    await androidDevice.scroll(selector, direction, percent);  
    await androidDevice.scroll(selector, direction, percent, options);  
    

**Arguments**

  * `selector` [AndroidSelector]#

Selector to scroll.

  * `direction` "down" | "up" | "left" | "right"#

Scroll direction.

  * `percent` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

Distance to scroll as a percentage of the widget's size.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `speed` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Optional speed of the scroll in pixels per second.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>) method.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### serial​

Added in: v1.9 androidDevice.serial

Device serial number.

**Usage**
    
    
    androidDevice.serial();  
    

**Returns**

  * [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#



* * *

### setDefaultTimeout​

Added in: v1.9 androidDevice.setDefaultTimeout

This setting will change the default maximum time for all the methods accepting [timeout](</docs/api/class-androiddevice#android-device-set-default-timeout-option-timeout>) option.

**Usage**
    
    
    androidDevice.setDefaultTimeout(timeout);  
    

**Arguments**

  * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

Maximum time in milliseconds




* * *

### shell​

Added in: v1.9 androidDevice.shell

Executes a shell command on the device and returns its output.

**Usage**
    
    
    await androidDevice.shell(command);  
    

**Arguments**

  * `command` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Shell command to execute.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Buffer](<https://nodejs.org/api/buffer.html#buffer_class_buffer> "Buffer")>#



* * *

### swipe​

Added in: v1.9 androidDevice.swipe

Swipes the widget defined by [selector](</docs/api/class-androiddevice#android-device-swipe-option-selector>) in the specified [direction](</docs/api/class-androiddevice#android-device-swipe-option-direction>).

**Usage**
    
    
    await androidDevice.swipe(selector, direction, percent);  
    await androidDevice.swipe(selector, direction, percent, options);  
    

**Arguments**

  * `selector` [AndroidSelector]#

Selector to swipe.

  * `direction` "down" | "up" | "left" | "right"#

Swipe direction.

  * `percent` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

Distance to swipe as a percentage of the widget's size.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `speed` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Optional speed of the swipe in pixels per second.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>) method.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### tap​

Added in: v1.9 androidDevice.tap

Taps on the widget defined by [selector](</docs/api/class-androiddevice#android-device-tap-option-selector>).

**Usage**
    
    
    await androidDevice.tap(selector);  
    await androidDevice.tap(selector, options);  
    

**Arguments**

  * `selector` [AndroidSelector]#

Selector to tap on.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `duration` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Optional duration of the tap in milliseconds.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>) method.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### wait​

Added in: v1.9 androidDevice.wait

Waits for the specific [selector](</docs/api/class-androiddevice#android-device-wait-option-selector>) to either appear or disappear, depending on the [state](</docs/api/class-androiddevice#android-device-wait-option-state>).

**Usage**
    
    
    await androidDevice.wait(selector);  
    await androidDevice.wait(selector, options);  
    

**Arguments**

  * `selector` [AndroidSelector]#

Selector to wait for.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `state` "gone" _(optional)_#

Optional state. Can be either:

      * default - wait for element to be present.
      * `'gone'` \- wait for element to not be present.
    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>) method.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### waitForEvent​

Added in: v1.9 androidDevice.waitForEvent

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy value.

**Usage**
    
    
    await androidDevice.waitForEvent(event);  
    await androidDevice.waitForEvent(event, optionsOrPredicate);  
    

**Arguments**

  * `event` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Event name, same one typically passed into `*.on(event)`.

  * `optionsOrPredicate` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function") | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

    * `predicate` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")

receives the event data and resolves to truthy value when the waiting should resolve.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_

maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>).

Either a predicate that receives an event or an options object. Optional.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>#



* * *

### webView​

Added in: v1.9 androidDevice.webView

This method waits until [AndroidWebView](</docs/api/class-androidwebview> "AndroidWebView") matching the [selector](</docs/api/class-androiddevice#android-device-web-view-option-selector>) is opened and returns it. If there is already an open [AndroidWebView](</docs/api/class-androidwebview> "AndroidWebView") matching the [selector](</docs/api/class-androiddevice#android-device-web-view-option-selector>), returns immediately.

**Usage**
    
    
    await androidDevice.webView(selector);  
    await androidDevice.webView(selector, options);  
    

**Arguments**

  * `selector` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")#
    * `pkg` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Optional Package identifier.

    * `socketName` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Optional webview socket name.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [androidDevice.setDefaultTimeout()](</docs/api/class-androiddevice#android-device-set-default-timeout>) method.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[AndroidWebView](</docs/api/class-androidwebview> "AndroidWebView")>#



* * *

### webViews​

Added in: v1.9 androidDevice.webViews

Currently open WebViews.

**Usage**
    
    
    androidDevice.webViews();  
    

**Returns**

  * [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[AndroidWebView](</docs/api/class-androidwebview> "AndroidWebView")>#



* * *

## Properties​

### input​

Added in: v1.9 androidDevice.input

**Usage**
    
    
    androidDevice.input  
    

**Type**

  * [AndroidInput](</docs/api/class-androidinput> "AndroidInput")



* * *

## Events​

### on('close')​

Added in: v1.28 androidDevice.on('close')

Emitted when the device connection gets closed.

**Usage**
    
    
    androidDevice.on('close', data => {});  
    

**Event data**

  * [AndroidDevice](</docs/api/class-androiddevice> "AndroidDevice")



* * *

### on('webview')​

Added in: v1.9 androidDevice.on('webview')

Emitted when a new WebView instance is detected.

**Usage**
    
    
    androidDevice.on('webview', data => {});  
    

**Event data**

  * [AndroidWebView](</docs/api/class-androidwebview> "AndroidWebView")


