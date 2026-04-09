On this page

# Dialog

[Dialog](</docs/api/class-dialog> "Dialog") objects are dispatched by page via the [page.on('dialog')](</docs/api/class-page#page-event-dialog>) event.

An example of using `Dialog` class:
    
    
    const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.  
      
    (async () => {  
      const browser = await chromium.launch();  
      const page = await browser.newPage();  
      page.on('dialog', async dialog => {  
        console.log(dialog.message());  
        await dialog.dismiss();  
      });  
      await page.evaluate(() => alert('1'));  
      await browser.close();  
    })();  
    

note

Dialogs are dismissed automatically, unless there is a [page.on('dialog')](</docs/api/class-page#page-event-dialog>) listener. When listener is present, it **must** either [dialog.accept()](</docs/api/class-dialog#dialog-accept>) or [dialog.dismiss()](</docs/api/class-dialog#dialog-dismiss>) the dialog - otherwise the page will [freeze](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#never_blocking>) waiting for the dialog, and actions like click will never finish.

* * *

## Methods​

### accept​

Added before v1.9 dialog.accept

Returns when the dialog has been accepted.

**Usage**
    
    
    await dialog.accept();  
    await dialog.accept(promptText);  
    

**Arguments**

  * `promptText` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

A text to enter in prompt. Does not cause any effects if the dialog's `type` is not prompt. Optional.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### defaultValue​

Added before v1.9 dialog.defaultValue

If dialog is prompt, returns default prompt value. Otherwise, returns empty string.

**Usage**
    
    
    dialog.defaultValue();  
    

**Returns**

  * [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#



* * *

### dismiss​

Added before v1.9 dialog.dismiss

Returns when the dialog has been dismissed.

**Usage**
    
    
    await dialog.dismiss();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### message​

Added before v1.9 dialog.message

A message displayed in the dialog.

**Usage**
    
    
    dialog.message();  
    

**Returns**

  * [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#



* * *

### page​

Added in: v1.34 dialog.page

The page that initiated this dialog, if available.

**Usage**
    
    
    dialog.page();  
    

**Returns**

  * [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [Page](</docs/api/class-page> "Page")#



* * *

### type​

Added before v1.9 dialog.type

Returns dialog's type, can be one of `alert`, `beforeunload`, `confirm` or `prompt`.

**Usage**
    
    
    dialog.type();  
    

**Returns**

  * [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#


