On this page

# Screencast

Interface for capturing screencast frames from a page.

* * *

## Methods​

### hideActions​

Added in: v1.59 screencast.hideActions

Removes action decorations.

**Usage**
    
    
    await screencast.hideActions();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### hideOverlays​

Added in: v1.59 screencast.hideOverlays

Hides overlays without removing them.

**Usage**
    
    
    await screencast.hideOverlays();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### showActions​

Added in: v1.59 screencast.showActions

Enables visual annotations on interacted elements. Returns a disposable that stops showing actions when disposed.

**Usage**
    
    
    await screencast.showActions();  
    await screencast.showActions(options);  
    

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `duration` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

How long each annotation is displayed in milliseconds. Defaults to `500`.

    * `fontSize` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Font size of the action title in pixels. Defaults to `24`.

    * `position` "top-left" | "top" | "top-right" | "bottom-left" | "bottom" | "bottom-right" _(optional)_#

Position of the action title overlay. Defaults to `"top-right"`.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Disposable](</docs/api/class-disposable> "Disposable")>#



* * *

### showChapter​

Added in: v1.59 screencast.showChapter

Shows a chapter overlay with a title and optional description, centered on the page with a blurred backdrop. Useful for narrating video recordings. The overlay is removed after the specified duration, or 2000ms.

**Usage**
    
    
    await screencast.showChapter(title);  
    await screencast.showChapter(title, options);  
    

**Arguments**

  * `title` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Title text displayed prominently in the overlay.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `description` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Optional description text displayed below the title.

    * `duration` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Duration in milliseconds after which the overlay is automatically removed. Defaults to `2000`.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### showOverlay​

Added in: v1.59 screencast.showOverlay

Adds an overlay with the given HTML content. The overlay is displayed on top of the page until removed. Returns a disposable that removes the overlay when disposed.

**Usage**
    
    
    await screencast.showOverlay(html);  
    await screencast.showOverlay(html, options);  
    

**Arguments**

  * `html` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

HTML content for the overlay.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `duration` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Duration in milliseconds after which the overlay is automatically removed. Overlay stays until dismissed if not provided.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Disposable](</docs/api/class-disposable> "Disposable")>#



* * *

### showOverlays​

Added in: v1.59 screencast.showOverlays

Shows overlays.

**Usage**
    
    
    await screencast.showOverlays();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### start​

Added in: v1.59 screencast.start

Starts the screencast. When [path](</docs/api/class-screencast#screencast-start-option-path>) is provided, it saves video recording to the specified file. When [onFrame](</docs/api/class-screencast#screencast-start-option-on-frame>) is provided, delivers JPEG-encoded frames to the callback. Both can be used together.

**Usage**
    
    
    // Record video  
    await page.screencast.start({ path: 'video.webm', size: { width: 1280, height: 800 } });  
    // ... perform actions ...  
    await page.screencast.stop();  
    
    
    
    // Capture frames  
    await page.screencast.start({  
      onFrame: ({ data }) => console.log(`frame size: ${data.length}`),  
      size: { width: 800, height: 600 },  
    });  
    // ... perform actions ...  
    await page.screencast.stop();  
    

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `onFrame` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")([Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")):[Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise") _(optional)_#

      * `data` [Buffer](<https://nodejs.org/api/buffer.html#buffer_class_buffer> "Buffer")

JPEG-encoded frame data.

Callback that receives JPEG-encoded frame data.

    * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Path where the video should be saved when the screencast is stopped. When provided, video recording is started.

    * `quality` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

The quality of the image, between 0-100.

    * `size` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

      * `width` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Max frame width in pixels.

      * `height` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Max frame height in pixels.

Specifies the dimensions of screencast frames. The actual frame is scaled to preserve the page's aspect ratio and may be smaller than these bounds. If a screencast is already active (e.g. started by tracing or video recording), the existing configuration takes precedence and the frame size may exceed these bounds or this option may be ignored. If not specified the size will be equal to page viewport scaled down to fit into 800×800.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Disposable](</docs/api/class-disposable> "Disposable")>#



* * *

### stop​

Added in: v1.59 screencast.stop

Stops the screencast and video recording if active. If a video was being recorded, saves it to the path specified in [screencast.start()](</docs/api/class-screencast#screencast-start>).

**Usage**
    
    
    await screencast.stop();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#


