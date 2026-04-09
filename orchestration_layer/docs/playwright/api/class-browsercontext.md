On this page

# BrowserContext

BrowserContexts provide a way to operate multiple independent browser sessions.

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser context.

Playwright allows creating isolated non-persistent browser contexts with [browser.newContext()](</docs/api/class-browser#browser-new-context>) method. Non-persistent browser contexts don't write any browsing data to disk.
    
    
    // Create a new incognito browser context  
    const context = await browser.newContext();  
    // Create a new page inside context.  
    const page = await context.newPage();  
    await page.goto('https://example.com');  
    // Dispose context once it's no longer needed.  
    await context.close();  
    

* * *

## Methods​

### addCookies​

Added before v1.9 browserContext.addCookies

Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be obtained via [browserContext.cookies()](</docs/api/class-browsercontext#browser-context-cookies>).

**Usage**
    
    
    await browserContext.addCookies([cookieObject1, cookieObject2]);  
    

**Arguments**

  * `cookies` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>#
    * `name` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

    * `value` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

    * `url` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Either `url` or both `domain` and `path` are required. Optional.

    * `domain` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

For the cookie to apply to all subdomains as well, prefix domain with a dot, like this: ".example.com". Either `url` or both `domain` and `path` are required. Optional.

    * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Either `url` or both `domain` and `path` are required. Optional.

    * `expires` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_

Unix time in seconds. Optional.

    * `httpOnly` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_

Optional.

    * `secure` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_

Optional.

    * `sameSite` "Strict" | "Lax" | "None" _(optional)_

Optional.

    * `partitionKey` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

For partitioned third-party cookies (aka [CHIPS](<https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Privacy_sandbox/Partitioned_cookies>)), the partition key. Optional.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### addInitScript​

Added before v1.9 browserContext.addInitScript

Adds a script which would be evaluated in one of the following scenarios:

  * Whenever a page is created in the browser context or is navigated.
  * Whenever a child frame is attached or navigated in any page in the browser context. In this case, the script is evaluated in the context of the newly attached frame.



The script is evaluated after the document was created but before any of its scripts were run. This is useful to amend the JavaScript environment, e.g. to seed `Math.random`.

**Usage**

An example of overriding `Math.random` before the page loads:
    
    
    // preload.js  
    Math.random = () => 42;  
    
    
    
    // In your playwright script, assuming the preload.js file is in same directory.  
    await browserContext.addInitScript({  
      path: 'preload.js'  
    });  
    

note

The order of evaluation of multiple scripts installed via [browserContext.addInitScript()](</docs/api/class-browsercontext#browser-context-add-init-script>) and [page.addInitScript()](</docs/api/class-page#page-add-init-script>) is not defined.

**Arguments**

  * `script` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function") | [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")#

    * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the current working directory. Optional.

    * `content` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Raw script content. Optional.

Script to be evaluated in all pages in the browser context.

  * `arg` [Serializable](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description> "Serializable") _(optional)_#

Optional argument to pass to [script](</docs/api/class-browsercontext#browser-context-add-init-script-option-script>) (only supported when passing a function).




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Disposable](</docs/api/class-disposable> "Disposable")>#



* * *

### browser​

Added before v1.9 browserContext.browser

Gets the browser instance that owns the context. Returns `null` if the context is created outside of normal browser, e.g. Android or Electron.

**Usage**
    
    
    browserContext.browser();  
    

**Returns**

  * [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [Browser](</docs/api/class-browser> "Browser")#



* * *

### clearCookies​

Added before v1.9 browserContext.clearCookies

Removes cookies from context. Accepts optional filter.

**Usage**
    
    
    await context.clearCookies();  
    await context.clearCookies({ name: 'session-id' });  
    await context.clearCookies({ domain: 'my-origin.com' });  
    await context.clearCookies({ domain: /.*my-origin\.com/ });  
    await context.clearCookies({ path: '/api/v1' });  
    await context.clearCookies({ name: 'session-id', domain: 'my-origin.com' });  
    

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `domain` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") _(optional)_ Added in: v1.43#

Only removes cookies with the given domain.

    * `name` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") _(optional)_ Added in: v1.43#

Only removes cookies with the given name.

    * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") _(optional)_ Added in: v1.43#

Only removes cookies with the given path.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### clearPermissions​

Added before v1.9 browserContext.clearPermissions

Clears all permission overrides for the browser context.

**Usage**
    
    
    const context = await browser.newContext();  
    await context.grantPermissions(['clipboard-read']);  
    // do stuff ..  
    context.clearPermissions();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### close​

Added before v1.9 browserContext.close

Closes the browser context. All the pages that belong to the browser context will be closed.

note

The default browser context cannot be closed.

**Usage**
    
    
    await browserContext.close();  
    await browserContext.close(options);  
    

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `reason` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_ Added in: v1.40#

The reason to be reported to the operations interrupted by the context closure.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### cookies​

Added before v1.9 browserContext.cookies

If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs are returned.

**Usage**
    
    
    await browserContext.cookies();  
    await browserContext.cookies(urls);  
    

**Arguments**

  * `urls` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")> _(optional)_#

Optional list of URLs.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>>#
    * `name` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

    * `value` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

    * `domain` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

    * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

    * `expires` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Unix time in seconds.

    * `httpOnly` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")

    * `secure` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")

    * `sameSite` "Strict" | "Lax" | "None"

    * `partitionKey` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_




* * *

### exposeBinding​

Added before v1.9 browserContext.exposeBinding

The method adds a function called [name](</docs/api/class-browsercontext#browser-context-expose-binding-option-name>) on the `window` object of every frame in every page in the context. When called, the function executes [callback](</docs/api/class-browsercontext#browser-context-expose-binding-option-callback>) and returns a [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise") which resolves to the return value of [callback](</docs/api/class-browsercontext#browser-context-expose-binding-option-callback>). If the [callback](</docs/api/class-browsercontext#browser-context-expose-binding-option-callback>) returns a [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise"), it will be awaited.

The first argument of the [callback](</docs/api/class-browsercontext#browser-context-expose-binding-option-callback>) function contains information about the caller: `{ browserContext: BrowserContext, page: Page, frame: Frame }`.

See [page.exposeBinding()](</docs/api/class-page#page-expose-binding>) for page-only version.

**Usage**

An example of exposing page URL to all frames in all pages in the context:
    
    
    const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.  
      
    (async () => {  
      const browser = await webkit.launch({ headless: false });  
      const context = await browser.newContext();  
      await context.exposeBinding('pageURL', ({ page }) => page.url());  
      const page = await context.newPage();  
      await page.setContent(`  
        <script>  
          async function onClick() {  
            document.querySelector('div').textContent = await window.pageURL();  
          }  
        </script>  
        <button onclick="onClick()">Click me</button>  
        <div></div>  
      `);  
      await page.getByRole('button').click();  
    })();  
    

**Arguments**

  * `name` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Name of the function on the window object.

  * `callback` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")#

Callback function that will be called in the Playwright's context.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `handle` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option will be removed in the future.

Whether to pass the argument as a handle, instead of passing by value. When passing a handle, only one argument is supported. When passing by value, multiple arguments are supported.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Disposable](</docs/api/class-disposable> "Disposable")>#



* * *

### exposeFunction​

Added before v1.9 browserContext.exposeFunction

The method adds a function called [name](</docs/api/class-browsercontext#browser-context-expose-function-option-name>) on the `window` object of every frame in every page in the context. When called, the function executes [callback](</docs/api/class-browsercontext#browser-context-expose-function-option-callback>) and returns a [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise") which resolves to the return value of [callback](</docs/api/class-browsercontext#browser-context-expose-function-option-callback>).

If the [callback](</docs/api/class-browsercontext#browser-context-expose-function-option-callback>) returns a [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise"), it will be awaited.

See [page.exposeFunction()](</docs/api/class-page#page-expose-function>) for page-only version.

**Usage**

An example of adding a `sha256` function to all pages in the context:
    
    
    const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.  
    const crypto = require('crypto');  
      
    (async () => {  
      const browser = await webkit.launch({ headless: false });  
      const context = await browser.newContext();  
      await context.exposeFunction('sha256', text =>  
        crypto.createHash('sha256').update(text).digest('hex'),  
      );  
      const page = await context.newPage();  
      await page.setContent(`  
        <script>  
          async function onClick() {  
            document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');  
          }  
        </script>  
        <button onclick="onClick()">Click me</button>  
        <div></div>  
      `);  
      await page.getByRole('button').click();  
    })();  
    

**Arguments**

  * `name` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Name of the function on the window object.

  * `callback` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")#

Callback function that will be called in the Playwright's context.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Disposable](</docs/api/class-disposable> "Disposable")>#



* * *

### grantPermissions​

Added before v1.9 browserContext.grantPermissions

Grants specified permissions to the browser context. Only grants corresponding permissions to the given origin if specified.

**Usage**
    
    
    await browserContext.grantPermissions(permissions);  
    await browserContext.grantPermissions(permissions, options);  
    

**Arguments**

  * `permissions` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")>#

A list of permissions to grant.

danger

Supported permissions differ between browsers, and even between different versions of the same browser. Any permission may stop working after an update.

Here are some permissions that may be supported by some browsers:

    * `'accelerometer'`
    * `'ambient-light-sensor'`
    * `'background-sync'`
    * `'camera'`
    * `'clipboard-read'`
    * `'clipboard-write'`
    * `'geolocation'`
    * `'gyroscope'`
    * `'local-fonts'`
    * `'local-network-access'`
    * `'magnetometer'`
    * `'microphone'`
    * `'midi-sysex'` (system-exclusive midi)
    * `'midi'`
    * `'notifications'`
    * `'payment-handler'`
    * `'storage-access'`
    * `'screen-wake-lock'`
  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `origin` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

The [origin](<https://developer.mozilla.org/en-US/docs/Glossary/Origin> "Origin") to grant permissions to, e.g. "<https://example.com>".




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### isClosed​

Added in: v1.59 browserContext.isClosed

Indicates that the browser context is in the process of closing or has already been closed.

**Usage**
    
    
    browserContext.isClosed();  
    

**Returns**

  * [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")#



* * *

### newCDPSession​

Added in: v1.11 browserContext.newCDPSession

note

CDP sessions are only supported on Chromium-based browsers.

Returns the newly created session.

**Usage**
    
    
    await browserContext.newCDPSession(page);  
    

**Arguments**

  * `page` [Page](</docs/api/class-page> "Page") | [Frame](</docs/api/class-frame> "Frame")#

Target to create new session for. For backwards-compatibility, this parameter is named `page`, but it can be a `Page` or `Frame` type.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[CDPSession](</docs/api/class-cdpsession> "CDPSession")>#



* * *

### newPage​

Added before v1.9 browserContext.newPage

Creates a new page in the browser context.

**Usage**
    
    
    await browserContext.newPage();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Page](</docs/api/class-page> "Page")>#



* * *

### pages​

Added before v1.9 browserContext.pages

Returns all open pages in the context.

**Usage**
    
    
    browserContext.pages();  
    

**Returns**

  * [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Page](</docs/api/class-page> "Page")>#



* * *

### removeAllListeners​

Added in: v1.47 browserContext.removeAllListeners

Removes all the listeners of the given type (or all registered listeners if no type given). Allows to wait for async listeners to complete or to ignore subsequent errors from these listeners.

**Usage**
    
    
    await browserContext.removeAllListeners();  
    await browserContext.removeAllListeners(type, options);  
    

**Arguments**

  * `type` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#
  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `behavior` "wait" | "ignoreErrors" | "default" _(optional)_#

Specifies whether to wait for already running listeners and what to do if they throw errors:

      * `'default'` \- do not wait for current listener calls (if any) to finish, if the listener throws, it may result in unhandled error
      * `'wait'` \- wait for current listener calls (if any) to finish
      * `'ignoreErrors'` \- do not wait for current listener calls (if any) to finish, all errors thrown by the listeners after removal are silently caught



**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### route​

Added before v1.9 browserContext.route

Routing provides the capability to modify network requests that are made by any page in the browser context. Once route is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

note

[browserContext.route()](</docs/api/class-browsercontext#browser-context-route>) will not intercept requests intercepted by Service Worker. See [this](<https://github.com/microsoft/playwright/issues/1090>) issue. We recommend disabling Service Workers when using request interception by setting [serviceWorkers](</docs/api/class-browser#browser-new-context-option-service-workers>) to `'block'`.

**Usage**

An example of a naive handler that aborts all image requests:
    
    
    const context = await browser.newContext();  
    await context.route('**/*.{png,jpg,jpeg}', route => route.abort());  
    const page = await context.newPage();  
    await page.goto('https://example.com');  
    await browser.close();  
    

or the same snippet using a regex pattern instead:
    
    
    const context = await browser.newContext();  
    await context.route(/(\.png$)|(\.jpg$)/, route => route.abort());  
    const page = await context.newPage();  
    await page.goto('https://example.com');  
    await browser.close();  
    

It is possible to examine the request to decide the route action. For example, mocking all requests that contain some post data, and leaving all other requests as is:
    
    
    await context.route('/api/**', async route => {  
      if (route.request().postData().includes('my-string'))  
        await route.fulfill({ body: 'mocked-data' });  
      else  
        await route.continue();  
    });  
    

Page routes (set up with [page.route()](</docs/api/class-page#page-route>)) take precedence over browser context routes when request matches both handlers.

To remove a route with its handler you can use [browserContext.unroute()](</docs/api/class-browsercontext#browser-context-unroute>).

note

Enabling routing disables http cache.

**Arguments**

  * `url` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") | [URLPattern] | [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")([URL](<https://nodejs.org/api/url.html> "URL")):[boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")#

A glob pattern, regex pattern, URL pattern, or predicate that receives a [URL](<https://nodejs.org/api/url.html> "URL") to match during routing. If [baseURL](</docs/api/class-browser#browser-new-context-option-base-url>) is set in the context options and the provided URL is a string that does not start with `*`, it is resolved using the [`new URL()`](<https://developer.mozilla.org/en-US/docs/Web/API/URL/URL>) constructor.

  * `handler` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")([Route](</docs/api/class-route> "Route"), [Request](</docs/api/class-request> "Request")):[Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")> | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")#

handler function to route the request.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `times` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_ Added in: v1.15#

How often a route should be used. By default it will be used every time.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Disposable](</docs/api/class-disposable> "Disposable")>#



* * *

### routeFromHAR​

Added in: v1.23 browserContext.routeFromHAR

If specified the network requests that are made in the context will be served from the HAR file. Read more about [Replaying from HAR](</docs/mock#replaying-from-har>).

Playwright will not serve requests intercepted by Service Worker from the HAR file. See [this](<https://github.com/microsoft/playwright/issues/1090>) issue. We recommend disabling Service Workers when using request interception by setting [serviceWorkers](</docs/api/class-browser#browser-new-context-option-service-workers>) to `'block'`.

**Usage**
    
    
    await browserContext.routeFromHAR(har);  
    await browserContext.routeFromHAR(har, options);  
    

**Arguments**

  * `har` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Path to a [HAR](<http://www.softwareishard.com/blog/har-12-spec>) file with prerecorded network data. If `path` is a relative path, then it is resolved relative to the current working directory.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `notFound` "abort" | "fallback" _(optional)_#

      * If set to 'abort' any request not found in the HAR file will be aborted.
      * If set to 'fallback' falls through to the next route handler in the handler chain.

Defaults to abort.

    * `update` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

If specified, updates the given HAR with the actual network information instead of serving from file. The file is written to disk when [browserContext.close()](</docs/api/class-browsercontext#browser-context-close>) is called.

    * `updateContent` "embed" | "attach" _(optional)_ Added in: v1.32#

Optional setting to control resource content management. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file.

    * `updateMode` "full" | "minimal" _(optional)_ Added in: v1.32#

When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `minimal`.

    * `url` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") _(optional)_#

A glob pattern, regular expression or predicate to match the request URL. Only requests with URL matching the pattern will be served from the HAR file. If not specified, all requests are served from the HAR file.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### routeWebSocket​

Added in: v1.48 browserContext.routeWebSocket

This method allows to modify websocket connections that are made by any page in the browser context.

Note that only `WebSocket`s created after this method was called will be routed. It is recommended to call this method before creating any pages.

**Usage**

Below is an example of a simple handler that blocks some websocket messages. See [WebSocketRoute](</docs/api/class-websocketroute> "WebSocketRoute") for more details and examples.
    
    
    await context.routeWebSocket('/ws', async ws => {  
      ws.routeSend(message => {  
        if (message === 'to-be-blocked')  
          return;  
        ws.send(message);  
      });  
      await ws.connect();  
    });  
    

**Arguments**

  * `url` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") | [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")([URL](<https://nodejs.org/api/url.html> "URL")):[boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")#

Only WebSockets with the url matching this pattern will be routed. A string pattern can be relative to the [baseURL](</docs/api/class-browser#browser-new-context-option-base-url>) context option.

  * `handler` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")([WebSocketRoute](</docs/api/class-websocketroute> "WebSocketRoute")):[Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")> | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")#

Handler function to route the WebSocket.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### serviceWorkers​

Added in: v1.11 browserContext.serviceWorkers

note

Service workers are only supported on Chromium-based browsers.

All existing service workers in the context.

**Usage**
    
    
    browserContext.serviceWorkers();  
    

**Returns**

  * [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Worker](</docs/api/class-worker> "Worker")>#



* * *

### setDefaultNavigationTimeout​

Added before v1.9 browserContext.setDefaultNavigationTimeout

This setting will change the default maximum navigation time for the following methods and related shortcuts:

  * [page.goBack()](</docs/api/class-page#page-go-back>)
  * [page.goForward()](</docs/api/class-page#page-go-forward>)
  * [page.goto()](</docs/api/class-page#page-goto>)
  * [page.reload()](</docs/api/class-page#page-reload>)
  * [page.setContent()](</docs/api/class-page#page-set-content>)
  * [page.waitForNavigation()](</docs/api/class-page#page-wait-for-navigation>)



note

[page.setDefaultNavigationTimeout()](</docs/api/class-page#page-set-default-navigation-timeout>) and [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) take priority over [browserContext.setDefaultNavigationTimeout()](</docs/api/class-browsercontext#browser-context-set-default-navigation-timeout>).

**Usage**
    
    
    browserContext.setDefaultNavigationTimeout(timeout);  
    

**Arguments**

  * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

Maximum navigation time in milliseconds




* * *

### setDefaultTimeout​

Added before v1.9 browserContext.setDefaultTimeout

This setting will change the default maximum time for all the methods accepting [timeout](</docs/api/class-browsercontext#browser-context-set-default-timeout-option-timeout>) option.

note

[page.setDefaultNavigationTimeout()](</docs/api/class-page#page-set-default-navigation-timeout>), [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) and [browserContext.setDefaultNavigationTimeout()](</docs/api/class-browsercontext#browser-context-set-default-navigation-timeout>) take priority over [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>).

**Usage**
    
    
    browserContext.setDefaultTimeout(timeout);  
    

**Arguments**

  * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

Maximum time in milliseconds. Pass `0` to disable timeout.




* * *

### setExtraHTTPHeaders​

Added before v1.9 browserContext.setExtraHTTPHeaders

The extra HTTP headers will be sent with every request initiated by any page in the context. These headers are merged with page-specific extra HTTP headers set with [page.setExtraHTTPHeaders()](</docs/api/class-page#page-set-extra-http-headers>). If page overrides a particular header, page-specific header value will be used instead of the browser context header value.

note

[browserContext.setExtraHTTPHeaders()](</docs/api/class-browsercontext#browser-context-set-extra-http-headers>) does not guarantee the order of headers in the outgoing requests.

**Usage**
    
    
    await browserContext.setExtraHTTPHeaders(headers);  
    

**Arguments**

  * `headers` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string"), [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")>#

An object containing additional HTTP headers to be sent with every request. All header values must be strings.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### setGeolocation​

Added before v1.9 browserContext.setGeolocation

Sets the context's geolocation. Passing `null` or `undefined` emulates position unavailable.

**Usage**
    
    
    await browserContext.setGeolocation({ latitude: 59.95, longitude: 30.31667 });  
    

note

Consider using [browserContext.grantPermissions()](</docs/api/class-browsercontext#browser-context-grant-permissions>) to grant permissions for the browser context pages to read its geolocation.

**Arguments**

  * `geolocation` [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")#
    * `latitude` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Latitude between -90 and 90.

    * `longitude` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Longitude between -180 and 180.

    * `accuracy` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_

Non-negative accuracy value. Defaults to `0`.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### setOffline​

Added before v1.9 browserContext.setOffline

**Usage**
    
    
    await browserContext.setOffline(offline);  
    

**Arguments**

  * `offline` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")#

Whether to emulate network being offline for the browser context.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### setStorageState​

Added in: v1.59 browserContext.setStorageState

Clears the existing cookies, local storage and IndexedDB entries for all origins and sets the new storage state.

**Usage**
    
    
    // Load storage state from a file and apply it to the context.  
    await context.setStorageState('state.json');  
    

**Arguments**

  * `storageState` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")#

    * `cookies` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>

      * `name` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

      * `value` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

      * `domain` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

Domain and path are required. For the cookie to apply to all subdomains as well, prefix domain with a dot, like this: ".example.com"

      * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

Domain and path are required

      * `expires` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Unix time in seconds.

      * `httpOnly` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")

      * `secure` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")

      * `sameSite` "Strict" | "Lax" | "None"

sameSite flag

Cookies to set for context

    * `origins` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>

      * `origin` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

      * `localStorage` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>

        * `name` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

        * `value` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

localStorage to set for context

Learn more about [storage state and auth](</docs/auth>).

Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [browserContext.storageState()](</docs/api/class-browsercontext#browser-context-storage-state>).




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### storageState​

Added before v1.9 browserContext.storageState

Returns storage state for this browser context, contains current cookies, local storage snapshot and IndexedDB snapshot.

**Usage**
    
    
    await browserContext.storageState();  
    await browserContext.storageState(options);  
    

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `indexedDB` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.51#

Set to `true` to include [IndexedDB](<https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API>) in the storage state snapshot. If your application uses IndexedDB to store authentication tokens, like Firebase Authentication, enable this.

    * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

The file path to save the storage state to. If [path](</docs/api/class-browsercontext#browser-context-storage-state-option-path>) is a relative path, then it is resolved relative to current working directory. If no path is provided, storage state is still returned, but won't be saved to the disk.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>#
    * `cookies` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>

      * `name` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

      * `value` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

      * `domain` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

      * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

      * `expires` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Unix time in seconds.

      * `httpOnly` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")

      * `secure` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")

      * `sameSite` "Strict" | "Lax" | "None"

    * `origins` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>

      * `origin` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

      * `localStorage` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>

        * `name` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

        * `value` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")




* * *

### unroute​

Added before v1.9 browserContext.unroute

Removes a route created with [browserContext.route()](</docs/api/class-browsercontext#browser-context-route>). When [handler](</docs/api/class-browsercontext#browser-context-unroute-option-handler>) is not specified, removes all routes for the [url](</docs/api/class-browsercontext#browser-context-unroute-option-url>).

**Usage**
    
    
    await browserContext.unroute(url);  
    await browserContext.unroute(url, handler);  
    

**Arguments**

  * `url` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") | [URLPattern] | [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")([URL](<https://nodejs.org/api/url.html> "URL")):[boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")#

A glob pattern, regex pattern, URL pattern, or predicate receiving [URL](<https://nodejs.org/api/url.html> "URL") used to register a routing with [browserContext.route()](</docs/api/class-browsercontext#browser-context-route>).

  * `handler` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")([Route](</docs/api/class-route> "Route"), [Request](</docs/api/class-request> "Request")):[Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")> | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

Optional handler function used to register a routing with [browserContext.route()](</docs/api/class-browsercontext#browser-context-route>).




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### unrouteAll​

Added in: v1.41 browserContext.unrouteAll

Removes all routes created with [browserContext.route()](</docs/api/class-browsercontext#browser-context-route>) and [browserContext.routeFromHAR()](</docs/api/class-browsercontext#browser-context-route-from-har>).

**Usage**
    
    
    await browserContext.unrouteAll();  
    await browserContext.unrouteAll(options);  
    

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `behavior` "wait" | "ignoreErrors" | "default" _(optional)_#

Specifies whether to wait for already running handlers and what to do if they throw errors:

      * `'default'` \- do not wait for current handler calls (if any) to finish, if unrouted handler throws, it may result in unhandled error
      * `'wait'` \- wait for current handler calls (if any) to finish
      * `'ignoreErrors'` \- do not wait for current handler calls (if any) to finish, all errors thrown by the handlers after unrouting are silently caught



**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### waitForEvent​

Added before v1.9 browserContext.waitForEvent

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy value. Will throw an error if the context closes before the event is fired. Returns the event data value.

**Usage**
    
    
    const pagePromise = context.waitForEvent('page');  
    await page.getByRole('button').click();  
    const page = await pagePromise;  
    

**Arguments**

  * `event` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Event name, same one would pass into `browserContext.on(event)`.

  * `optionsOrPredicate` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function") | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

    * `predicate` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")

Receives the event data and resolves to truthy value when the waiting should resolve.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_

Maximum time to wait for in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) method.

Either a predicate that receives an event or an options object. Optional.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `predicate` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function") _(optional)_#

Receives the event data and resolves to truthy value when the waiting should resolve.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>#



* * *

## Properties​

### clock​

Added in: v1.45 browserContext.clock

Playwright has ability to mock clock and passage of time.

**Usage**
    
    
    browserContext.clock  
    

**Type**

  * [Clock](</docs/api/class-clock> "Clock")



* * *

### debugger​

Added in: v1.59 browserContext.debugger

Debugger allows to pause and resume the execution.

**Usage**
    
    
    browserContext.debugger  
    

**Type**

  * [Debugger](</docs/api/class-debugger> "Debugger")



* * *

### request​

Added in: v1.16 browserContext.request

API testing helper associated with this context. Requests made with this API will use context cookies.

**Usage**
    
    
    browserContext.request  
    

**Type**

  * [APIRequestContext](</docs/api/class-apirequestcontext> "APIRequestContext")



* * *

### tracing​

Added in: v1.12 browserContext.tracing

**Usage**
    
    
    browserContext.tracing  
    

**Type**

  * [Tracing](</docs/api/class-tracing> "Tracing")



* * *

## Events​

### on('close')​

Added before v1.9 browserContext.on('close')

Emitted when Browser context gets closed. This might happen because of one of the following:

  * Browser context is closed.
  * Browser application is closed or crashed.
  * The [browser.close()](</docs/api/class-browser#browser-close>) method was called.



**Usage**
    
    
    browserContext.on('close', data => {});  
    

**Event data**

  * [BrowserContext](</docs/api/class-browsercontext> "BrowserContext")



* * *

### on('console')​

Added in: v1.34 browserContext.on('console')

Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`.

The arguments passed into `console.log` and the page are available on the [ConsoleMessage](</docs/api/class-consolemessage> "ConsoleMessage") event handler argument.

**Usage**
    
    
    context.on('console', async msg => {  
      const values = [];  
      for (const arg of msg.args())  
        values.push(await arg.jsonValue());  
      console.log(...values);  
    });  
    await page.evaluate(() => console.log('hello', 5, { foo: 'bar' }));  
    

**Event data**

  * [ConsoleMessage](</docs/api/class-consolemessage> "ConsoleMessage")



* * *

### on('dialog')​

Added in: v1.34 browserContext.on('dialog')

Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Listener **must** either [dialog.accept()](</docs/api/class-dialog#dialog-accept>) or [dialog.dismiss()](</docs/api/class-dialog#dialog-dismiss>) the dialog - otherwise the page will [freeze](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking>) waiting for the dialog, and actions like click will never finish.

**Usage**
    
    
    context.on('dialog', dialog => {  
      dialog.accept();  
    });  
    

note

When no [page.on('dialog')](</docs/api/class-page#page-event-dialog>) or [browserContext.on('dialog')](</docs/api/class-browsercontext#browser-context-event-dialog>) listeners are present, all dialogs are automatically dismissed.

**Event data**

  * [Dialog](</docs/api/class-dialog> "Dialog")



* * *

### on('page')​

Added before v1.9 browserContext.on('page')

The event is emitted when a new Page is created in the BrowserContext. The page may still be loading. The event will also fire for popup pages. See also [page.on('popup')](</docs/api/class-page#page-event-popup>) to receive events about popups relevant to a specific page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a popup with `window.open('http://example.com')`, this event will fire when the network request to "<http://example.com>" is done and its response has started loading in the popup. If you would like to route/listen to this network request, use [browserContext.route()](</docs/api/class-browsercontext#browser-context-route>) and [browserContext.on('request')](</docs/api/class-browsercontext#browser-context-event-request>) respectively instead of similar methods on the [Page](</docs/api/class-page> "Page").
    
    
    const newPagePromise = context.waitForEvent('page');  
    await page.getByText('open new page').click();  
    const newPage = await newPagePromise;  
    console.log(await newPage.evaluate('location.href'));  
    

note

Use [page.waitForLoadState()](</docs/api/class-page#page-wait-for-load-state>) to wait until the page gets to a particular state (you should not need it in most cases).

**Usage**
    
    
    browserContext.on('page', data => {});  
    

**Event data**

  * [Page](</docs/api/class-page> "Page")



* * *

### on('request')​

Added in: v1.12 browserContext.on('request')

Emitted when a request is issued from any pages created through this context. The [request](</docs/api/class-request> "Request") object is read-only. To only listen for requests from a particular page, use [page.on('request')](</docs/api/class-page#page-event-request>).

In order to intercept and mutate requests, see [browserContext.route()](</docs/api/class-browsercontext#browser-context-route>) or [page.route()](</docs/api/class-page#page-route>).

**Usage**
    
    
    browserContext.on('request', data => {});  
    

**Event data**

  * [Request](</docs/api/class-request> "Request")



* * *

### on('requestfailed')​

Added in: v1.12 browserContext.on('requestfailed')

Emitted when a request fails, for example by timing out. To only listen for failed requests from a particular page, use [page.on('requestfailed')](</docs/api/class-page#page-event-request-failed>).

note

HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with [browserContext.on('requestfinished')](</docs/api/class-browsercontext#browser-context-event-request-finished>) event and not with [browserContext.on('requestfailed')](</docs/api/class-browsercontext#browser-context-event-request-failed>).

**Usage**
    
    
    browserContext.on('requestfailed', data => {});  
    

**Event data**

  * [Request](</docs/api/class-request> "Request")



* * *

### on('requestfinished')​

Added in: v1.12 browserContext.on('requestfinished')

Emitted when a request finishes successfully after downloading the response body. For a successful response, the sequence of events is `request`, `response` and `requestfinished`. To listen for successful requests from a particular page, use [page.on('requestfinished')](</docs/api/class-page#page-event-request-finished>).

**Usage**
    
    
    browserContext.on('requestfinished', data => {});  
    

**Event data**

  * [Request](</docs/api/class-request> "Request")



* * *

### on('response')​

Added in: v1.12 browserContext.on('response')

Emitted when [response](</docs/api/class-response> "Response") status and headers are received for a request. For a successful response, the sequence of events is `request`, `response` and `requestfinished`. To listen for response events from a particular page, use [page.on('response')](</docs/api/class-page#page-event-response>).

**Usage**
    
    
    browserContext.on('response', data => {});  
    

**Event data**

  * [Response](</docs/api/class-response> "Response")



* * *

### on('serviceworker')​

Added in: v1.11 browserContext.on('serviceworker')

note

Service workers are only supported on Chromium-based browsers.

Emitted when new service worker is created in the context.

**Usage**
    
    
    browserContext.on('serviceworker', data => {});  
    

**Event data**

  * [Worker](</docs/api/class-worker> "Worker")



* * *

### on('weberror')​

Added in: v1.38 browserContext.on('weberror')

Emitted when exception is unhandled in any of the pages in this context. To listen for errors from a particular page, use [page.on('pageerror')](</docs/api/class-page#page-event-page-error>) instead.

**Usage**
    
    
    browserContext.on('weberror', data => {});  
    

**Event data**

  * [WebError](</docs/api/class-weberror> "WebError")



* * *

## Deprecated​

### on('backgroundpage')​

Added in: v1.11 browserContext.on('backgroundpage')

Deprecated

Background pages have been removed from Chromium together with Manifest V2 extensions.

This event is not emitted.

**Usage**
    
    
    browserContext.on('backgroundpage', data => {});  
    

**Event data**

  * [Page](</docs/api/class-page> "Page")



* * *

### backgroundPages​

Added in: v1.11 browserContext.backgroundPages

Deprecated

Background pages have been removed from Chromium together with Manifest V2 extensions.

Returns an empty list.

**Usage**
    
    
    browserContext.backgroundPages();  
    

**Returns**

  * [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Page](</docs/api/class-page> "Page")>#



* * *

### setHTTPCredentials​

Added before v1.9 browserContext.setHTTPCredentials

Deprecated

Browsers may cache credentials after successful authentication. Create a new browser context instead.

**Usage**
    
    
    await browserContext.setHTTPCredentials(httpCredentials);  
    

**Arguments**

  * `httpCredentials` [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")#
    * `username` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

    * `password` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#


