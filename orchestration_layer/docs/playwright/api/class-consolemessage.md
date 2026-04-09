On this page

# ConsoleMessage

[ConsoleMessage](</docs/api/class-consolemessage> "ConsoleMessage") objects are dispatched by page via the [page.on('console')](</docs/api/class-page#page-event-console>) event. For each console message logged in the page there will be corresponding event in the Playwright context.
    
    
    // Listen for all console logs  
    page.on('console', msg => console.log(msg.text()));  
      
    // Listen for all console events and handle errors  
    page.on('console', msg => {  
      if (msg.type() === 'error')  
        console.log(`Error text: "${msg.text()}"`);  
    });  
      
    // Get the next console log  
    const msgPromise = page.waitForEvent('console');  
    await page.evaluate(() => {  
      console.log('hello', 42, { foo: 'bar' });  // Issue console.log inside the page  
    });  
    const msg = await msgPromise;  
      
    // Deconstruct console log arguments  
    await msg.args()[0].jsonValue(); // hello  
    await msg.args()[1].jsonValue(); // 42  
    

* * *

## Methods​

### args​

Added before v1.9 consoleMessage.args

List of arguments passed to a `console` function call. See also [page.on('console')](</docs/api/class-page#page-event-console>).

**Usage**
    
    
    consoleMessage.args();  
    

**Returns**

  * [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[JSHandle](</docs/api/class-jshandle> "JSHandle")>#



* * *

### location​

Added before v1.9 consoleMessage.location

**Usage**
    
    
    consoleMessage.location();  
    

**Returns**

  * [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")#
    * `url` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

URL of the resource.

    * `lineNumber` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

0-based line number in the resource.

    * `columnNumber` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

0-based column number in the resource.




* * *

### page​

Added in: v1.34 consoleMessage.page

The page that produced this console message, if any.

**Usage**
    
    
    consoleMessage.page();  
    

**Returns**

  * [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [Page](</docs/api/class-page> "Page")#



* * *

### text​

Added before v1.9 consoleMessage.text

The text of the console message.

**Usage**
    
    
    consoleMessage.text();  
    

**Returns**

  * [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#



* * *

### timestamp​

Added in: v1.59 consoleMessage.timestamp

The timestamp of the console message in milliseconds since the Unix epoch.

**Usage**
    
    
    consoleMessage.timestamp();  
    

**Returns**

  * [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#



* * *

### type​

Added before v1.9 consoleMessage.type

**Usage**
    
    
    consoleMessage.type();  
    

**Returns**

  * "log" | "debug" | "info" | "error" | "warning" | "dir" | "dirxml" | "table" | "trace" | "clear" | "startGroup" | "startGroupCollapsed" | "endGroup" | "assert" | "profile" | "profileEnd" | "count" | "time" | "timeEnd"#



* * *

### worker​

Added in: v1.57 consoleMessage.worker

The web worker or service worker that produced this console message, if any. Note that console messages from web workers also have non-null [consoleMessage.page()](</docs/api/class-consolemessage#console-message-page>).

**Usage**
    
    
    consoleMessage.worker();  
    

**Returns**

  * [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [Worker](</docs/api/class-worker> "Worker")#


