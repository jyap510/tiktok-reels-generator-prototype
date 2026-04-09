On this page

# AndroidWebView

[AndroidWebView](</docs/api/class-androidwebview> "AndroidWebView") represents a WebView open on the [AndroidDevice](</docs/api/class-androiddevice> "AndroidDevice"). WebView is usually obtained using [androidDevice.webView()](</docs/api/class-androiddevice#android-device-web-view>).

* * *

## Methods​

### page​

Added in: v1.9 androidWebView.page

Connects to the WebView and returns a regular Playwright [Page](</docs/api/class-page> "Page") to interact with.

**Usage**
    
    
    await androidWebView.page();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Page](</docs/api/class-page> "Page")>#



* * *

### pid​

Added in: v1.9 androidWebView.pid

WebView process PID.

**Usage**
    
    
    androidWebView.pid();  
    

**Returns**

  * [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#



* * *

### pkg​

Added in: v1.9 androidWebView.pkg

WebView package identifier.

**Usage**
    
    
    androidWebView.pkg();  
    

**Returns**

  * [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#



* * *

## Events​

### on('close')​

Added in: v1.9 androidWebView.on('close')

Emitted when the WebView is closed.

**Usage**
    
    
    androidWebView.on('close', data => {});  
    
