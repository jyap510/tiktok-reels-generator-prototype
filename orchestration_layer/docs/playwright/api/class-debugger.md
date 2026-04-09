On this page

# Debugger

API for controlling the Playwright debugger. The debugger allows pausing script execution and inspecting the page. Obtain the debugger instance via [browserContext.debugger](</docs/api/class-browsercontext#browser-context-debugger>).

* * *

## Methods​

### next​

Added in: v1.59 debugger.next

Resumes script execution and pauses again before the next action. Throws if the debugger is not paused.

**Usage**
    
    
    await debugger.next();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### pausedDetails​

Added in: v1.59 debugger.pausedDetails

Returns details about the currently paused call. Returns `null` if the debugger is not paused.

**Usage**
    
    
    debugger.pausedDetails();  
    

**Returns**

  * [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")#
    * `location` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")

      * `file` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

      * `line` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_

      * `column` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_

    * `title` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")




* * *

### requestPause​

Added in: v1.59 debugger.requestPause

Configures the debugger to pause before the next action is executed.

Throws if the debugger is already paused. Use [debugger.next()](</docs/api/class-debugger#debugger-next>) or [debugger.runTo()](</docs/api/class-debugger#debugger-run-to>) to step while paused.

Note that [page.pause()](</docs/api/class-page#page-pause>) is equivalent to a "debugger" statement — it pauses execution at the call site immediately. On the contrary, [debugger.requestPause()](</docs/api/class-debugger#debugger-request-pause>) is equivalent to "pause on next statement" — it configures the debugger to pause before the next action is executed.

**Usage**
    
    
    await debugger.requestPause();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### resume​

Added in: v1.59 debugger.resume

Resumes script execution. Throws if the debugger is not paused.

**Usage**
    
    
    await debugger.resume();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### runTo​

Added in: v1.59 debugger.runTo

Resumes script execution and pauses when an action originates from the given source location. Throws if the debugger is not paused.

**Usage**
    
    
    await debugger.runTo(location);  
    

**Arguments**

  * `location` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")#

    * `file` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

    * `line` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_

    * `column` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_

The source location to pause at.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

## Events​

### on('pausedstatechanged')​

Added in: v1.59 debugger.on('pausedstatechanged')

Emitted when the debugger pauses or resumes.

**Usage**
    
    
    debugger.on('pausedstatechanged', data => {});  
    
