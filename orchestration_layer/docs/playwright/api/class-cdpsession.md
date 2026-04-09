On this page

# CDPSession

The `CDPSession` instances are used to talk raw Chrome Devtools Protocol:

  * protocol methods can be called with `session.send` method.
  * protocol events can be subscribed to with `session.on` method.



Useful links:

  * Documentation on DevTools Protocol can be found here: [DevTools Protocol Viewer](<https://chromedevtools.github.io/devtools-protocol/>).
  * Getting Started with DevTools Protocol: <https://github.com/aslushnikov/getting-started-with-cdp/blob/master/README.md>


    
    
    const client = await page.context().newCDPSession(page);  
    await client.send('Animation.enable');  
    client.on('Animation.animationCreated', () => console.log('Animation created!'));  
    const response = await client.send('Animation.getPlaybackRate');  
    console.log('playback rate is ' + response.playbackRate);  
    await client.send('Animation.setPlaybackRate', {  
      playbackRate: response.playbackRate / 2  
    });  
    

* * *

## Methods​

### detach​

Added before v1.9 cdpSession.detach

Detaches the CDPSession from the target. Once detached, the CDPSession object won't emit any events and can't be used to send messages.

**Usage**
    
    
    await cdpSession.detach();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### send​

Added before v1.9 cdpSession.send

**Usage**
    
    
    await cdpSession.send(method);  
    await cdpSession.send(method, params);  
    

**Arguments**

  * `method` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Protocol method name.

  * `params` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

Optional method parameters.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>#



* * *

## Events​

### on('close')​

Added in: v1.59 cdpSession.on('close')

Emitted when the session is closed, either because the target was closed or `session.detach()` was called.

**Usage**
    
    
    cdpSession.on('close', data => {});  
    

**Event data**

  * [CDPSession](</docs/api/class-cdpsession> "CDPSession")



* * *

### on('event')​

Added in: v1.59 cdpSession.on('event')

Emitted for every CDP event received from the session. Allows subscribing to all CDP events at once without knowing their names ahead of time.

**Usage**
    
    
    session.on('event', ({ name, params }) => {  
      console.log(`CDP event: ${name}`, params);  
    });  
    

**Event data**

  * [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")
    * `method` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

CDP event name.

    * `params` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

CDP event parameters.



