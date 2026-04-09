On this page

# Mouse

The Mouse class operates in main-frame CSS pixels relative to the top-left corner of the viewport.

tip

If you want to debug where the mouse moved, you can use the [Trace viewer](</docs/trace-viewer-intro>) or [Playwright Inspector](</docs/running-tests>). A red dot showing the location of the mouse will be shown for every mouse action.

Every `page` object has its own Mouse, accessible with [page.mouse](</docs/api/class-page#page-mouse>).
    
    
    // Using ‘page.mouse’ to trace a 100x100 square.  
    await page.mouse.move(0, 0);  
    await page.mouse.down();  
    await page.mouse.move(0, 100);  
    await page.mouse.move(100, 100);  
    await page.mouse.move(100, 0);  
    await page.mouse.move(0, 0);  
    await page.mouse.up();  
    

* * *

## Methods​

### click​

Added before v1.9 mouse.click

Shortcut for [mouse.move()](</docs/api/class-mouse#mouse-move>), [mouse.down()](</docs/api/class-mouse#mouse-down>), [mouse.up()](</docs/api/class-mouse#mouse-up>).

**Usage**
    
    
    await mouse.click(x, y);  
    await mouse.click(x, y, options);  
    

**Arguments**

  * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

X coordinate relative to the main frame's viewport in CSS pixels.

  * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

Y coordinate relative to the main frame's viewport in CSS pixels.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `button` "left" | "right" | "middle" _(optional)_#

Defaults to `left`.

    * `clickCount` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

defaults to 1. See [UIEvent.detail](<https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail> "UIEvent.detail").

    * `delay` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### dblclick​

Added before v1.9 mouse.dblclick

Shortcut for [mouse.move()](</docs/api/class-mouse#mouse-move>), [mouse.down()](</docs/api/class-mouse#mouse-down>), [mouse.up()](</docs/api/class-mouse#mouse-up>), [mouse.down()](</docs/api/class-mouse#mouse-down>) and [mouse.up()](</docs/api/class-mouse#mouse-up>).

**Usage**
    
    
    await mouse.dblclick(x, y);  
    await mouse.dblclick(x, y, options);  
    

**Arguments**

  * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

X coordinate relative to the main frame's viewport in CSS pixels.

  * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

Y coordinate relative to the main frame's viewport in CSS pixels.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `button` "left" | "right" | "middle" _(optional)_#

Defaults to `left`.

    * `delay` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### down​

Added before v1.9 mouse.down

Dispatches a `mousedown` event.

**Usage**
    
    
    await mouse.down();  
    await mouse.down(options);  
    

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `button` "left" | "right" | "middle" _(optional)_#

Defaults to `left`.

    * `clickCount` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

defaults to 1. See [UIEvent.detail](<https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail> "UIEvent.detail").




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### move​

Added before v1.9 mouse.move

Dispatches a `mousemove` event.

**Usage**
    
    
    await mouse.move(x, y);  
    await mouse.move(x, y, options);  
    

**Arguments**

  * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

X coordinate relative to the main frame's viewport in CSS pixels.

  * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

Y coordinate relative to the main frame's viewport in CSS pixels.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `steps` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between Playwright's current cursor position and the provided destination. When set to 1, emits a single `mousemove` event at the destination location.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### up​

Added before v1.9 mouse.up

Dispatches a `mouseup` event.

**Usage**
    
    
    await mouse.up();  
    await mouse.up(options);  
    

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `button` "left" | "right" | "middle" _(optional)_#

Defaults to `left`.

    * `clickCount` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

defaults to 1. See [UIEvent.detail](<https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail> "UIEvent.detail").




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### wheel​

Added in: v1.15 mouse.wheel

Dispatches a `wheel` event. This method is usually used to manually scroll the page. See [scrolling](</docs/input#scrolling>) for alternative ways to scroll.

note

Wheel events may cause scrolling if they are not handled, and this method does not wait for the scrolling to finish before returning.

**Usage**
    
    
    await mouse.wheel(deltaX, deltaY);  
    

**Arguments**

  * `deltaX` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

Pixels to scroll horizontally.

  * `deltaY` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

Pixels to scroll vertically.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#


