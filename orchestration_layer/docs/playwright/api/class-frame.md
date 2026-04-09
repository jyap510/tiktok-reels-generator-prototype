On this page

# Frame

At every point of time, page exposes its current frame tree via the [page.mainFrame()](</docs/api/class-page#page-main-frame>) and [frame.childFrames()](</docs/api/class-frame#frame-child-frames>) methods.

[Frame](</docs/api/class-frame> "Frame") object's lifecycle is controlled by three events, dispatched on the page object:

  * [page.on('frameattached')](</docs/api/class-page#page-event-frame-attached>) \- fired when the frame gets attached to the page. A Frame can be attached to the page only once.
  * [page.on('framenavigated')](</docs/api/class-page#page-event-frame-navigated>) \- fired when the frame commits navigation to a different URL.
  * [page.on('framedetached')](</docs/api/class-page#page-event-frame-detached>) \- fired when the frame gets detached from the page. A Frame can be detached from the page only once.



An example of dumping frame tree:
    
    
    const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.  
      
    (async () => {  
      const browser = await firefox.launch();  
      const page = await browser.newPage();  
      await page.goto('https://www.google.com/chrome/browser/canary.html');  
      dumpFrameTree(page.mainFrame(), '');  
      await browser.close();  
      
      function dumpFrameTree(frame, indent) {  
        console.log(indent + frame.url());  
        for (const child of frame.childFrames())  
          dumpFrameTree(child, indent + '  ');  
      }  
    })();  
    

* * *

## Methods​

### addScriptTag​

Added before v1.9 frame.addScriptTag

Returns the added tag when the script's onload fires or when the script content was injected into frame.

Adds a `<script>` tag into the page with the desired url or content.

**Usage**
    
    
    await frame.addScriptTag();  
    await frame.addScriptTag(options);  
    

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `content` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Raw JavaScript content to be injected into frame.

    * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to the current working directory.

    * `type` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Script type. Use 'module' in order to load a JavaScript ES6 module. See [script](<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script>) for more details.

    * `url` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

URL of a script to be added.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[ElementHandle](</docs/api/class-elementhandle> "ElementHandle")>#



* * *

### addStyleTag​

Added before v1.9 frame.addStyleTag

Returns the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the content.

**Usage**
    
    
    await frame.addStyleTag();  
    await frame.addStyleTag(options);  
    

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `content` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Raw CSS content to be injected into frame.

    * `path` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to the current working directory.

    * `url` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

URL of the `<link>` tag.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[ElementHandle](</docs/api/class-elementhandle> "ElementHandle")>#



* * *

### childFrames​

Added before v1.9 frame.childFrames

**Usage**
    
    
    frame.childFrames();  
    

**Returns**

  * [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Frame](</docs/api/class-frame> "Frame")>#



* * *

### content​

Added before v1.9 frame.content

Gets the full HTML contents of the frame, including the doctype.

**Usage**
    
    
    await frame.content();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")>#



* * *

### dragAndDrop​

Added in: v1.13 frame.dragAndDrop

**Usage**
    
    
    await frame.dragAndDrop(source, target);  
    await frame.dragAndDrop(source, target, options);  
    

**Arguments**

  * `source` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element to drag. If there are multiple elements satisfying the selector, the first will be used.

  * `target` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element to drop onto. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `force` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to bypass the [actionability](</docs/actionability>) checks. Defaults to `false`.

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option has no effect.

This option has no effect.

    * `sourcePosition` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_ Added in: v1.14#

      * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

      * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Clicks on the source element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.

    * `steps` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_ Added in: v1.57#

Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between the `mousedown` and `mouseup` of the drag. When set to 1, emits a single `mousemove` event at the destination location.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `targetPosition` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_ Added in: v1.14#

      * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

      * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

Drops on the target element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.

    * `trial` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

When set, this method only performs the [actionability](</docs/actionability>) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### evaluate​

Added before v1.9 frame.evaluate

Returns the return value of [pageFunction](</docs/api/class-frame#frame-evaluate-option-expression>).

If the function passed to the [frame.evaluate()](</docs/api/class-frame#frame-evaluate>) returns a [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise"), then [frame.evaluate()](</docs/api/class-frame#frame-evaluate>) would wait for the promise to resolve and return its value.

If the function passed to the [frame.evaluate()](</docs/api/class-frame#frame-evaluate>) returns a non-[Serializable](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description> "Serializable") value, then [frame.evaluate()](</docs/api/class-frame#frame-evaluate>) returns `undefined`. Playwright also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`.

**Usage**
    
    
    const result = await frame.evaluate(([x, y]) => {  
      return Promise.resolve(x * y);  
    }, [7, 8]);  
    console.log(result); // prints "56"  
    

A string can also be passed in instead of a function.
    
    
    console.log(await frame.evaluate('1 + 2')); // prints "3"  
    

[ElementHandle](</docs/api/class-elementhandle> "ElementHandle") instances can be passed as an argument to the [frame.evaluate()](</docs/api/class-frame#frame-evaluate>):
    
    
    const bodyHandle = await frame.evaluate('document.body');  
    const html = await frame.evaluate(([body, suffix]) =>  
      body.innerHTML + suffix, [bodyHandle, 'hello'],  
    );  
    await bodyHandle.dispose();  
    

**Arguments**

  * `pageFunction` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function") | [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Function to be evaluated in the page context.

  * `arg` [EvaluationArgument](</docs/evaluating#evaluation-argument> "EvaluationArgument") _(optional)_#

Optional argument to pass to [pageFunction](</docs/api/class-frame#frame-evaluate-option-expression>).




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Serializable](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description> "Serializable")>#



* * *

### evaluateHandle​

Added before v1.9 frame.evaluateHandle

Returns the return value of [pageFunction](</docs/api/class-frame#frame-evaluate-handle-option-expression>) as a [JSHandle](</docs/api/class-jshandle> "JSHandle").

The only difference between [frame.evaluate()](</docs/api/class-frame#frame-evaluate>) and [frame.evaluateHandle()](</docs/api/class-frame#frame-evaluate-handle>) is that [frame.evaluateHandle()](</docs/api/class-frame#frame-evaluate-handle>) returns [JSHandle](</docs/api/class-jshandle> "JSHandle").

If the function, passed to the [frame.evaluateHandle()](</docs/api/class-frame#frame-evaluate-handle>), returns a [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise"), then [frame.evaluateHandle()](</docs/api/class-frame#frame-evaluate-handle>) would wait for the promise to resolve and return its value.

**Usage**
    
    
    // Handle for the window object  
    const aWindowHandle = await frame.evaluateHandle(() => Promise.resolve(window));  
    

A string can also be passed in instead of a function.
    
    
    const aHandle = await frame.evaluateHandle('document'); // Handle for the 'document'.  
    

[JSHandle](</docs/api/class-jshandle> "JSHandle") instances can be passed as an argument to the [frame.evaluateHandle()](</docs/api/class-frame#frame-evaluate-handle>):
    
    
    const aHandle = await frame.evaluateHandle(() => document.body);  
    const resultHandle = await frame.evaluateHandle(([body, suffix]) =>  
      body.innerHTML + suffix, [aHandle, 'hello'],  
    );  
    console.log(await resultHandle.jsonValue());  
    await resultHandle.dispose();  
    

**Arguments**

  * `pageFunction` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function") | [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Function to be evaluated in the page context.

  * `arg` [EvaluationArgument](</docs/evaluating#evaluation-argument> "EvaluationArgument") _(optional)_#

Optional argument to pass to [pageFunction](</docs/api/class-frame#frame-evaluate-handle-option-expression>).




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[JSHandle](</docs/api/class-jshandle> "JSHandle")>#



* * *

### frameElement​

Added before v1.9 frame.frameElement

Returns the `frame` or `iframe` element handle which corresponds to this frame.

This is an inverse of [elementHandle.contentFrame()](</docs/api/class-elementhandle#element-handle-content-frame>). Note that returned handle actually belongs to the parent frame.

This method throws an error if the frame has been detached before `frameElement()` returns.

**Usage**
    
    
    const frameElement = await frame.frameElement();  
    const contentFrame = await frameElement.contentFrame();  
    console.log(frame === contentFrame);  // -> true  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[ElementHandle](</docs/api/class-elementhandle> "ElementHandle")>#



* * *

### frameLocator​

Added in: v1.17 frame.frameLocator

When working with iframes, you can create a frame locator that will enter the iframe and allow selecting elements in that iframe.

**Usage**

Following snippet locates element with text "Submit" in the iframe with id `my-frame`, like `<iframe id="my-frame">`:
    
    
    const locator = frame.frameLocator('#my-iframe').getByText('Submit');  
    await locator.click();  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to use when resolving DOM element.




**Returns**

  * [FrameLocator](</docs/api/class-framelocator> "FrameLocator")#



* * *

### getByAltText​

Added in: v1.27 frame.getByAltText

Allows locating elements by their alt text.

**Usage**

For example, this method will find the image by alt text "Playwright logo":
    
    
    <img alt='Playwright logo'>  
    
    
    
    await page.getByAltText('Playwright logo').click();  
    

**Arguments**

  * `text` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp")#

Text to locate the element for.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `exact` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.




**Returns**

  * [Locator](</docs/api/class-locator> "Locator")#



* * *

### getByLabel​

Added in: v1.27 frame.getByLabel

Allows locating input elements by the text of the associated `<label>` or `aria-labelledby` element, or by the `aria-label` attribute.

**Usage**

For example, this method will find inputs by label "Username" and "Password" in the following DOM:
    
    
    <input aria-label="Username">  
    <label for="password-input">Password:</label>  
    <input id="password-input">  
    
    
    
    await page.getByLabel('Username').fill('john');  
    await page.getByLabel('Password').fill('secret');  
    

**Arguments**

  * `text` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp")#

Text to locate the element for.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `exact` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.




**Returns**

  * [Locator](</docs/api/class-locator> "Locator")#



* * *

### getByPlaceholder​

Added in: v1.27 frame.getByPlaceholder

Allows locating input elements by the placeholder text.

**Usage**

For example, consider the following DOM structure.
    
    
    <input type="email" placeholder="name@example.com" />  
    

You can fill the input after locating it by the placeholder text:
    
    
    await page  
        .getByPlaceholder('name@example.com')  
        .fill('playwright@microsoft.com');  
    

**Arguments**

  * `text` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp")#

Text to locate the element for.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `exact` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.




**Returns**

  * [Locator](</docs/api/class-locator> "Locator")#



* * *

### getByRole​

Added in: v1.27 frame.getByRole

Allows locating elements by their [ARIA role](<https://www.w3.org/TR/wai-aria-1.2/#roles>), [ARIA attributes](<https://www.w3.org/TR/wai-aria-1.2/#aria-attributes>) and [accessible name](<https://w3c.github.io/accname/#dfn-accessible-name>).

**Usage**

Consider the following DOM structure.
    
    
    <h3>Sign up</h3>  
    <label>  
      <input type="checkbox" /> Subscribe  
    </label>  
    <br/>  
    <button>Submit</button>  
    

You can locate each element by its implicit role:
    
    
    await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();  
      
    await page.getByRole('checkbox', { name: 'Subscribe' }).check();  
      
    await page.getByRole('button', { name: /submit/i }).click();  
    

**Arguments**

  * `role` "alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem"#

Required aria role.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `checked` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

An attribute that is usually set by `aria-checked` or native `<input type=checkbox>` controls.

Learn more about [`aria-checked`](<https://www.w3.org/TR/wai-aria-1.2/#aria-checked>).

    * `disabled` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

An attribute that is usually set by `aria-disabled` or `disabled`.

note

Unlike most other attributes, `disabled` is inherited through the DOM hierarchy. Learn more about [`aria-disabled`](<https://www.w3.org/TR/wai-aria-1.2/#aria-disabled>).

    * `exact` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.28#

Whether [name](</docs/api/class-frame#frame-get-by-role-option-name>) is matched exactly: case-sensitive and whole-string. Defaults to false. Ignored when [name](</docs/api/class-frame#frame-get-by-role-option-name>) is a regular expression. Note that exact match still trims whitespace.

    * `expanded` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

An attribute that is usually set by `aria-expanded`.

Learn more about [`aria-expanded`](<https://www.w3.org/TR/wai-aria-1.2/#aria-expanded>).

    * `includeHidden` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Option that controls whether hidden elements are matched. By default, only non-hidden elements, as [defined by ARIA](<https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion>), are matched by role selector.

Learn more about [`aria-hidden`](<https://www.w3.org/TR/wai-aria-1.2/#aria-hidden>).

    * `level` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

A number attribute that is usually present for roles `heading`, `listitem`, `row`, `treeitem`, with default values for `<h1>-<h6>` elements.

Learn more about [`aria-level`](<https://www.w3.org/TR/wai-aria-1.2/#aria-level>).

    * `name` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") _(optional)_#

Option to match the [accessible name](<https://w3c.github.io/accname/#dfn-accessible-name>). By default, matching is case-insensitive and searches for a substring, use [exact](</docs/api/class-frame#frame-get-by-role-option-exact>) to control this behavior.

Learn more about [accessible name](<https://w3c.github.io/accname/#dfn-accessible-name>).

    * `pressed` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

An attribute that is usually set by `aria-pressed`.

Learn more about [`aria-pressed`](<https://www.w3.org/TR/wai-aria-1.2/#aria-pressed>).

    * `selected` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

An attribute that is usually set by `aria-selected`.

Learn more about [`aria-selected`](<https://www.w3.org/TR/wai-aria-1.2/#aria-selected>).




**Returns**

  * [Locator](</docs/api/class-locator> "Locator")#



**Details**

Role selector **does not replace** accessibility audits and conformance tests, but rather gives early feedback about the ARIA guidelines.

Many html elements have an implicitly [defined role](<https://w3c.github.io/html-aam/#html-element-role-mappings>) that is recognized by the role selector. You can find all the [supported roles here](<https://www.w3.org/TR/wai-aria-1.2/#role_definitions>). ARIA guidelines **do not recommend** duplicating implicit roles and attributes by setting `role` and/or `aria-*` attributes to default values.

* * *

### getByTestId​

Added in: v1.27 frame.getByTestId

Locate element by the test id.

**Usage**

Consider the following DOM structure.
    
    
    <button data-testid="directions">Itinéraire</button>  
    

You can locate the element by its test id:
    
    
    await page.getByTestId('directions').click();  
    

**Arguments**

  * `testId` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp")#

Id to locate the element by.




**Returns**

  * [Locator](</docs/api/class-locator> "Locator")#



**Details**

By default, the `data-testid` attribute is used as a test id. Use [selectors.setTestIdAttribute()](</docs/api/class-selectors#selectors-set-test-id-attribute>) to configure a different test id attribute if necessary.
    
    
    // Set custom test id attribute from @playwright/test config:  
    import { defineConfig } from '@playwright/test';  
      
    export default defineConfig({  
      use: {  
        testIdAttribute: 'data-pw'  
      },  
    });  
    

* * *

### getByText​

Added in: v1.27 frame.getByText

Allows locating elements that contain given text.

See also [locator.filter()](</docs/api/class-locator#locator-filter>) that allows to match by another criteria, like an accessible role, and then filter by the text content.

**Usage**

Consider the following DOM structure:
    
    
    <div>Hello <span>world</span></div>  
    <div>Hello</div>  
    

You can locate by text substring, exact string, or a regular expression:
    
    
    // Matches <span>  
    page.getByText('world');  
      
    // Matches first <div>  
    page.getByText('Hello world');  
      
    // Matches second <div>  
    page.getByText('Hello', { exact: true });  
      
    // Matches both <div>s  
    page.getByText(/Hello/);  
      
    // Matches second <div>  
    page.getByText(/^hello$/i);  
    

**Arguments**

  * `text` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp")#

Text to locate the element for.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `exact` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.




**Returns**

  * [Locator](</docs/api/class-locator> "Locator")#



**Details**

Matching by text always normalizes whitespace, even with exact match. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.

Input elements of the type `button` and `submit` are matched by their `value` instead of the text content. For example, locating by text `"Log in"` matches `<input type=button value="Log in">`.

* * *

### getByTitle​

Added in: v1.27 frame.getByTitle

Allows locating elements by their title attribute.

**Usage**

Consider the following DOM structure.
    
    
    <span title='Issues count'>25 issues</span>  
    

You can check the issues count after locating it by the title text:
    
    
    await expect(page.getByTitle('Issues count')).toHaveText('25 issues');  
    

**Arguments**

  * `text` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp")#

Text to locate the element for.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `exact` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.




**Returns**

  * [Locator](</docs/api/class-locator> "Locator")#



* * *

### goto​

Added before v1.9 frame.goto

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

The method will throw an error if:

  * there's an SSL error (e.g. in case of self-signed certificates).
  * target URL is invalid.
  * the [timeout](</docs/api/class-frame#frame-goto-option-timeout>) is exceeded during navigation.
  * the remote server does not respond or is unreachable.
  * the main resource failed to load.



The method will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error". The status code for such responses can be retrieved by calling [response.status()](</docs/api/class-response#response-status>).

note

The method either throws an error or returns a main resource response. The only exceptions are navigation to `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.

note

Headless mode doesn't support navigation to a PDF document. See the [upstream issue](<https://bugs.chromium.org/p/chromium/issues/detail?id=761295>).

**Usage**
    
    
    await frame.goto(url);  
    await frame.goto(url, options);  
    

**Arguments**

  * `url` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

URL to navigate frame to. The url should include scheme, e.g. `https://`.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `referer` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_#

Referer header value. If provided it will take preference over the referer header value set by [page.setExtraHTTPHeaders()](</docs/api/class-page#page-set-extra-http-headers>).

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum operation time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `navigationTimeout` option in the config, or by using the [browserContext.setDefaultNavigationTimeout()](</docs/api/class-browsercontext#browser-context-set-default-navigation-timeout>), [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>), [page.setDefaultNavigationTimeout()](</docs/api/class-page#page-set-default-navigation-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.

    * `waitUntil` "load" | "domcontentloaded" | "networkidle" | "commit" _(optional)_#

When to consider operation succeeded, defaults to `load`. Events can be either:

      * `'domcontentloaded'` \- consider operation to be finished when the `DOMContentLoaded` event is fired.
      * `'load'` \- consider operation to be finished when the `load` event is fired.
      * `'networkidle'` \- **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
      * `'commit'` \- consider operation to be finished when network response is received and the document started loading.



**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [Response](</docs/api/class-response> "Response")>#



* * *

### isDetached​

Added before v1.9 frame.isDetached

Returns `true` if the frame has been detached, or `false` otherwise.

**Usage**
    
    
    frame.isDetached();  
    

**Returns**

  * [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")#



* * *

### isEnabled​

Added before v1.9 frame.isEnabled

Returns whether the element is [enabled](</docs/actionability#enabled>).

**Usage**
    
    
    await frame.isEnabled(selector);  
    await frame.isEnabled(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")>#



* * *

### locator​

Added in: v1.14 frame.locator

The method returns an element locator that can be used to perform actions on this page / frame. Locator is resolved to the element immediately before performing an action, so a series of actions on the same locator can in fact be performed on different DOM elements. That would happen if the DOM structure between those actions has changed.

[Learn more about locators](</docs/locators>).

[Learn more about locators](</docs/locators>).

**Usage**
    
    
    frame.locator(selector);  
    frame.locator(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to use when resolving DOM element.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `has` [Locator](</docs/api/class-locator> "Locator") _(optional)_#

Narrows down the results of the method to those which contain elements matching this relative locator. For example, `article` that has `text=Playwright` matches `<article><div>Playwright</div></article>`.

Inner locator **must be relative** to the outer locator and is queried starting with the outer locator match, not the document root. For example, you can find `content` that has `div` in `<article><content><div>Playwright</div></content></article>`. However, looking for `content` that has `article div` will fail, because the inner locator must be relative and should not use any elements outside the `content`.

Note that outer and inner locators must belong to the same frame. Inner locator must not contain [FrameLocator](</docs/api/class-framelocator> "FrameLocator")s.

    * `hasNot` [Locator](</docs/api/class-locator> "Locator") _(optional)_ Added in: v1.33#

Matches elements that do not contain an element that matches an inner locator. Inner locator is queried against the outer one. For example, `article` that does not have `div` matches `<article><span>Playwright</span></article>`.

Note that outer and inner locators must belong to the same frame. Inner locator must not contain [FrameLocator](</docs/api/class-framelocator> "FrameLocator")s.

    * `hasNotText` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") _(optional)_ Added in: v1.33#

Matches elements that do not contain specified text somewhere inside, possibly in a child or a descendant element. When passed a [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string"), matching is case-insensitive and searches for a substring.

    * `hasText` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") _(optional)_#

Matches elements containing specified text somewhere inside, possibly in a child or a descendant element. When passed a [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string"), matching is case-insensitive and searches for a substring. For example, `"Playwright"` matches `<article><div>Playwright</div></article>`.




**Returns**

  * [Locator](</docs/api/class-locator> "Locator")#



* * *

### name​

Added before v1.9 frame.name

Returns frame's name attribute as specified in the tag.

If the name is empty, returns the id attribute instead.

note

This value is calculated once when the frame is created, and will not update if the attribute is changed later.

**Usage**
    
    
    frame.name();  
    

**Returns**

  * [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#



* * *

### page​

Added before v1.9 frame.page

Returns the page containing this frame.

**Usage**
    
    
    frame.page();  
    

**Returns**

  * [Page](</docs/api/class-page> "Page")#



* * *

### parentFrame​

Added before v1.9 frame.parentFrame

Parent frame, if any. Detached frames and main frames return `null`.

**Usage**
    
    
    frame.parentFrame();  
    

**Returns**

  * [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [Frame](</docs/api/class-frame> "Frame")#



* * *

### setContent​

Added before v1.9 frame.setContent

This method internally calls [document.write()](<https://developer.mozilla.org/en-US/docs/Web/API/Document/write>), inheriting all its specific characteristics and behaviors.

**Usage**
    
    
    await frame.setContent(html);  
    await frame.setContent(html, options);  
    

**Arguments**

  * `html` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

HTML markup to assign to the page.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum operation time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `navigationTimeout` option in the config, or by using the [browserContext.setDefaultNavigationTimeout()](</docs/api/class-browsercontext#browser-context-set-default-navigation-timeout>), [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>), [page.setDefaultNavigationTimeout()](</docs/api/class-page#page-set-default-navigation-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.

    * `waitUntil` "load" | "domcontentloaded" | "networkidle" | "commit" _(optional)_#

When to consider operation succeeded, defaults to `load`. Events can be either:

      * `'domcontentloaded'` \- consider operation to be finished when the `DOMContentLoaded` event is fired.
      * `'load'` \- consider operation to be finished when the `load` event is fired.
      * `'networkidle'` \- **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
      * `'commit'` \- consider operation to be finished when network response is received and the document started loading.



**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### title​

Added before v1.9 frame.title

Returns the page title.

**Usage**
    
    
    await frame.title();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")>#



* * *

### url​

Added before v1.9 frame.url

Returns frame's url.

**Usage**
    
    
    frame.url();  
    

**Returns**

  * [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#



* * *

### waitForFunction​

Added before v1.9 frame.waitForFunction

Returns when the [pageFunction](</docs/api/class-frame#frame-wait-for-function-option-expression>) returns a truthy value, returns that value.

**Usage**

The [frame.waitForFunction()](</docs/api/class-frame#frame-wait-for-function>) can be used to observe viewport size change:
    
    
    const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.  
      
    (async () => {  
      const browser = await firefox.launch();  
      const page = await browser.newPage();  
      const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');  
      await page.setViewportSize({ width: 50, height: 50 });  
      await watchDog;  
      await browser.close();  
    })();  
    

To pass an argument to the predicate of `frame.waitForFunction` function:
    
    
    const selector = '.foo';  
    await frame.waitForFunction(selector => !!document.querySelector(selector), selector);  
    

**Arguments**

  * `pageFunction` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function") | [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Function to be evaluated in the page context.

  * `arg` [EvaluationArgument](</docs/evaluating#evaluation-argument> "EvaluationArgument") _(optional)_#

Optional argument to pass to [pageFunction](</docs/api/class-frame#frame-wait-for-function-option-expression>).

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `polling` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") | "raf" _(optional)_#

If [polling](</docs/api/class-frame#frame-wait-for-function-option-polling>) is `'raf'`, then [pageFunction](</docs/api/class-frame#frame-wait-for-function-option-expression>) is constantly executed in `requestAnimationFrame` callback. If [polling](</docs/api/class-frame#frame-wait-for-function-option-polling>) is a number, then it is treated as an interval in milliseconds at which the function would be executed. Defaults to `raf`.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time to wait for in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[JSHandle](</docs/api/class-jshandle> "JSHandle")>#



* * *

### waitForLoadState​

Added before v1.9 frame.waitForLoadState

Waits for the required load state to be reached.

This returns when the frame reaches a required load state, `load` by default. The navigation must have been committed when this method is called. If current document has already reached the required state, resolves immediately.

note

Most of the time, this method is not needed because Playwright [auto-waits before every action](</docs/actionability>).

**Usage**
    
    
    await frame.click('button'); // Click triggers navigation.  
    await frame.waitForLoadState(); // Waits for 'load' state by default.  
    

**Arguments**

  * `state` "load" | "domcontentloaded" | "networkidle" _(optional)_#

Optional load state to wait for, defaults to `load`. If the state has been already reached while loading current document, the method resolves immediately. Can be one of:

    * `'load'` \- wait for the `load` event to be fired.
    * `'domcontentloaded'` \- wait for the `DOMContentLoaded` event to be fired.
    * `'networkidle'` \- **DISCOURAGED** wait until there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum operation time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `navigationTimeout` option in the config, or by using the [browserContext.setDefaultNavigationTimeout()](</docs/api/class-browsercontext#browser-context-set-default-navigation-timeout>), [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>), [page.setDefaultNavigationTimeout()](</docs/api/class-page#page-set-default-navigation-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### waitForURL​

Added in: v1.11 frame.waitForURL

Waits for the frame to navigate to the given URL.

**Usage**
    
    
    await frame.click('a.delayed-navigation'); // Clicking the link will indirectly cause a navigation  
    await frame.waitForURL('**/target.html');  
    

**Arguments**

  * `url` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") | [URLPattern] | [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")([URL](<https://nodejs.org/api/url.html> "URL")):[boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")#

A glob pattern, regex pattern, URL pattern, or predicate receiving [URL](<https://nodejs.org/api/url.html> "URL") to match while waiting for the navigation. Note that if the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly equal to the string.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum operation time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `navigationTimeout` option in the config, or by using the [browserContext.setDefaultNavigationTimeout()](</docs/api/class-browsercontext#browser-context-set-default-navigation-timeout>), [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>), [page.setDefaultNavigationTimeout()](</docs/api/class-page#page-set-default-navigation-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.

    * `waitUntil` "load" | "domcontentloaded" | "networkidle" | "commit" _(optional)_#

When to consider operation succeeded, defaults to `load`. Events can be either:

      * `'domcontentloaded'` \- consider operation to be finished when the `DOMContentLoaded` event is fired.
      * `'load'` \- consider operation to be finished when the `load` event is fired.
      * `'networkidle'` \- **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
      * `'commit'` \- consider operation to be finished when network response is received and the document started loading.



**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

## Deprecated​

### $​

Added in: v1.9 frame.$

Discouraged

Use locator-based [frame.locator()](</docs/api/class-frame#frame-locator>) instead. Read more about [locators](</docs/locators>).

Returns the ElementHandle pointing to the frame element.

caution

The use of [ElementHandle](</docs/api/class-elementhandle> "ElementHandle") is discouraged, use [Locator](</docs/api/class-locator> "Locator") objects and web-first assertions instead.

The method finds an element matching the specified selector within the frame. If no elements match the selector, returns `null`.

**Usage**
    
    
    await frame.$(selector);  
    await frame.$(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to query for.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [ElementHandle](</docs/api/class-elementhandle> "ElementHandle")>#



* * *

### $$​

Added in: v1.9 frame.$$

Discouraged

Use locator-based [frame.locator()](</docs/api/class-frame#frame-locator>) instead. Read more about [locators](</docs/locators>).

Returns the ElementHandles pointing to the frame elements.

caution

The use of [ElementHandle](</docs/api/class-elementhandle> "ElementHandle") is discouraged, use [Locator](</docs/api/class-locator> "Locator") objects instead.

The method finds all elements matching the specified selector within the frame. If no elements match the selector, returns empty array.

**Usage**
    
    
    await frame.$$(selector);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to query for.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[ElementHandle](</docs/api/class-elementhandle> "ElementHandle")>>#



* * *

### $eval​

Added in: v1.9 frame.$eval

Discouraged

This method does not wait for the element to pass the actionability checks and therefore can lead to the flaky tests. Use [locator.evaluate()](</docs/api/class-locator#locator-evaluate>), other [Locator](</docs/api/class-locator> "Locator") helper methods or web-first assertions instead.

Returns the return value of [pageFunction](</docs/api/class-frame#frame-eval-on-selector-option-expression>).

The method finds an element matching the specified selector within the frame and passes it as a first argument to [pageFunction](</docs/api/class-frame#frame-eval-on-selector-option-expression>). If no elements match the selector, the method throws an error.

If [pageFunction](</docs/api/class-frame#frame-eval-on-selector-option-expression>) returns a [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise"), then [frame.$eval()](</docs/api/class-frame#frame-eval-on-selector>) would wait for the promise to resolve and return its value.

**Usage**
    
    
    const searchValue = await frame.$eval('#search', el => el.value);  
    const preloadHref = await frame.$eval('link[rel=preload]', el => el.href);  
    const html = await frame.$eval('.main-container', (e, suffix) => e.outerHTML + suffix, 'hello');  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to query for.

  * `pageFunction` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")([Element](<https://developer.mozilla.org/en-US/docs/Web/API/element> "Element")) | [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Function to be evaluated in the page context.

  * `arg` [EvaluationArgument](</docs/evaluating#evaluation-argument> "EvaluationArgument") _(optional)_#

Optional argument to pass to [pageFunction](</docs/api/class-frame#frame-eval-on-selector-option-expression>).

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Serializable](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description> "Serializable")>#



* * *

### $$eval​

Added in: v1.9 frame.$$eval

Discouraged

In most cases, [locator.evaluateAll()](</docs/api/class-locator#locator-evaluate-all>), other [Locator](</docs/api/class-locator> "Locator") helper methods and web-first assertions do a better job.

Returns the return value of [pageFunction](</docs/api/class-frame#frame-eval-on-selector-all-option-expression>).

The method finds all elements matching the specified selector within the frame and passes an array of matched elements as a first argument to [pageFunction](</docs/api/class-frame#frame-eval-on-selector-all-option-expression>).

If [pageFunction](</docs/api/class-frame#frame-eval-on-selector-all-option-expression>) returns a [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise"), then [frame.$$eval()](</docs/api/class-frame#frame-eval-on-selector-all>) would wait for the promise to resolve and return its value.

**Usage**
    
    
    const divsCounts = await frame.$$eval('div', (divs, min) => divs.length >= min, 10);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to query for.

  * `pageFunction` [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")([Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Element](<https://developer.mozilla.org/en-US/docs/Web/API/element> "Element")>) | [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Function to be evaluated in the page context.

  * `arg` [EvaluationArgument](</docs/evaluating#evaluation-argument> "EvaluationArgument") _(optional)_#

Optional argument to pass to [pageFunction](</docs/api/class-frame#frame-eval-on-selector-all-option-expression>).




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Serializable](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description> "Serializable")>#



* * *

### check​

Added before v1.9 frame.check

Discouraged

Use locator-based [locator.check()](</docs/api/class-locator#locator-check>) instead. Read more about [locators](</docs/locators>).

This method checks an element matching [selector](</docs/api/class-frame#frame-check-option-selector>) by performing the following steps:

  1. Find an element matching [selector](</docs/api/class-frame#frame-check-option-selector>). If there is none, wait until a matching element is attached to the DOM.
  2. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already checked, this method returns immediately.
  3. Wait for [actionability](</docs/actionability>) checks on the matched element, unless [force](</docs/api/class-frame#frame-check-option-force>) option is set. If the element is detached during the checks, the whole action is retried.
  4. Scroll the element into view if needed.
  5. Use [page.mouse](</docs/api/class-page#page-mouse>) to click in the center of the element.
  6. Ensure that the element is now checked. If not, this method throws.



When all steps combined have not finished during the specified [timeout](</docs/api/class-frame#frame-check-option-timeout>), this method throws a [TimeoutError](</docs/api/class-timeouterror> "TimeoutError"). Passing zero timeout disables this.

**Usage**
    
    
    await frame.check(selector);  
    await frame.check(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `force` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to bypass the [actionability](</docs/actionability>) checks. Defaults to `false`.

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option has no effect.

This option has no effect.

    * `position` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_ Added in: v1.11#

      * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

      * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.

    * `trial` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.11#

When set, this method only performs the [actionability](</docs/actionability>) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### click​

Added before v1.9 frame.click

Discouraged

Use locator-based [locator.click()](</docs/api/class-locator#locator-click>) instead. Read more about [locators](</docs/locators>).

This method clicks an element matching [selector](</docs/api/class-frame#frame-click-option-selector>) by performing the following steps:

  1. Find an element matching [selector](</docs/api/class-frame#frame-click-option-selector>). If there is none, wait until a matching element is attached to the DOM.
  2. Wait for [actionability](</docs/actionability>) checks on the matched element, unless [force](</docs/api/class-frame#frame-click-option-force>) option is set. If the element is detached during the checks, the whole action is retried.
  3. Scroll the element into view if needed.
  4. Use [page.mouse](</docs/api/class-page#page-mouse>) to click in the center of the element, or the specified [position](</docs/api/class-frame#frame-click-option-position>).
  5. Wait for initiated navigations to either succeed or fail, unless [noWaitAfter](</docs/api/class-frame#frame-click-option-no-wait-after>) option is set.



When all steps combined have not finished during the specified [timeout](</docs/api/class-frame#frame-click-option-timeout>), this method throws a [TimeoutError](</docs/api/class-timeouterror> "TimeoutError"). Passing zero timeout disables this.

**Usage**
    
    
    await frame.click(selector);  
    await frame.click(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `button` "left" | "right" | "middle" _(optional)_#

Defaults to `left`.

    * `clickCount` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

defaults to 1. See [UIEvent.detail](<https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail> "UIEvent.detail").

    * `delay` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.

    * `force` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to bypass the [actionability](</docs/actionability>) checks. Defaults to `false`.

    * `modifiers` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift"> _(optional)_#

Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option will default to `true` in the future.

Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.

    * `position` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

      * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

      * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.

    * `trial` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.11#

When set, this method only performs the [actionability](</docs/actionability>) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### dblclick​

Added before v1.9 frame.dblclick

Discouraged

Use locator-based [locator.dblclick()](</docs/api/class-locator#locator-dblclick>) instead. Read more about [locators](</docs/locators>).

This method double clicks an element matching [selector](</docs/api/class-frame#frame-dblclick-option-selector>) by performing the following steps:

  1. Find an element matching [selector](</docs/api/class-frame#frame-dblclick-option-selector>). If there is none, wait until a matching element is attached to the DOM.
  2. Wait for [actionability](</docs/actionability>) checks on the matched element, unless [force](</docs/api/class-frame#frame-dblclick-option-force>) option is set. If the element is detached during the checks, the whole action is retried.
  3. Scroll the element into view if needed.
  4. Use [page.mouse](</docs/api/class-page#page-mouse>) to double click in the center of the element, or the specified [position](</docs/api/class-frame#frame-dblclick-option-position>). if the first click of the `dblclick()` triggers a navigation event, this method will throw.



When all steps combined have not finished during the specified [timeout](</docs/api/class-frame#frame-dblclick-option-timeout>), this method throws a [TimeoutError](</docs/api/class-timeouterror> "TimeoutError"). Passing zero timeout disables this.

note

`frame.dblclick()` dispatches two `click` events and a single `dblclick` event.

**Usage**
    
    
    await frame.dblclick(selector);  
    await frame.dblclick(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `button` "left" | "right" | "middle" _(optional)_#

Defaults to `left`.

    * `delay` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.

    * `force` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to bypass the [actionability](</docs/actionability>) checks. Defaults to `false`.

    * `modifiers` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift"> _(optional)_#

Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option has no effect.

This option has no effect.

    * `position` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

      * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

      * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.

    * `trial` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.11#

When set, this method only performs the [actionability](</docs/actionability>) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### dispatchEvent​

Added before v1.9 frame.dispatchEvent

Discouraged

Use locator-based [locator.dispatchEvent()](</docs/api/class-locator#locator-dispatch-event>) instead. Read more about [locators](</docs/locators>).

The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the element, `click` is dispatched. This is equivalent to calling [element.click()](<https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click>).

**Usage**
    
    
    await frame.dispatchEvent('button#submit', 'click');  
    

Under the hood, it creates an instance of an event based on the given [type](</docs/api/class-frame#frame-dispatch-event-option-type>), initializes it with [eventInit](</docs/api/class-frame#frame-dispatch-event-option-event-init>) properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by default.

Since [eventInit](</docs/api/class-frame#frame-dispatch-event-option-event-init>) is event-specific, please refer to the events documentation for the lists of initial properties:

  * [DeviceMotionEvent](<https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/DeviceMotionEvent>)
  * [DeviceOrientationEvent](<https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/DeviceOrientationEvent>)
  * [DragEvent](<https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent>)
  * [Event](<https://developer.mozilla.org/en-US/docs/Web/API/Event/Event>)
  * [FocusEvent](<https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent>)
  * [KeyboardEvent](<https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent>)
  * [MouseEvent](<https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent>)
  * [PointerEvent](<https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/PointerEvent>)
  * [TouchEvent](<https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent>)
  * [WheelEvent](<https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/WheelEvent>)



You can also specify `JSHandle` as the property value if you want live objects to be passed into the event:
    
    
    // Note you can only create DataTransfer in Chromium and Firefox  
    const dataTransfer = await frame.evaluateHandle(() => new DataTransfer());  
    await frame.dispatchEvent('#source', 'dragstart', { dataTransfer });  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `type` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

DOM event type: `"click"`, `"dragstart"`, etc.

  * `eventInit` [EvaluationArgument](</docs/evaluating#evaluation-argument> "EvaluationArgument") _(optional)_#

Optional event-specific initialization properties.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### fill​

Added before v1.9 frame.fill

Discouraged

Use locator-based [locator.fill()](</docs/api/class-locator#locator-fill>) instead. Read more about [locators](</docs/locators>).

This method waits for an element matching [selector](</docs/api/class-frame#frame-fill-option-selector>), waits for [actionability](</docs/actionability>) checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an `<input>`, `<textarea>` or `[contenteditable]` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](<https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control>), the control will be filled instead.

To send fine-grained keyboard events, use [locator.pressSequentially()](</docs/api/class-locator#locator-press-sequentially>).

**Usage**
    
    
    await frame.fill(selector, value);  
    await frame.fill(selector, value, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `value` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Value to fill for the `<input>`, `<textarea>` or `[contenteditable]` element.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `force` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.13#

Whether to bypass the [actionability](</docs/actionability>) checks. Defaults to `false`.

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option has no effect.

This option has no effect.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### focus​

Added before v1.9 frame.focus

Discouraged

Use locator-based [locator.focus()](</docs/api/class-locator#locator-focus>) instead. Read more about [locators](</docs/locators>).

This method fetches an element with [selector](</docs/api/class-frame#frame-focus-option-selector>) and focuses it. If there's no element matching [selector](</docs/api/class-frame#frame-focus-option-selector>), the method waits until a matching element appears in the DOM.

**Usage**
    
    
    await frame.focus(selector);  
    await frame.focus(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### getAttribute​

Added before v1.9 frame.getAttribute

Discouraged

Use locator-based [locator.getAttribute()](</docs/api/class-locator#locator-get-attribute>) instead. Read more about [locators](</docs/locators>).

Returns element attribute value.

**Usage**
    
    
    await frame.getAttribute(selector, name);  
    await frame.getAttribute(selector, name, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `name` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Attribute name to get the value for.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")>#



* * *

### hover​

Added before v1.9 frame.hover

Discouraged

Use locator-based [locator.hover()](</docs/api/class-locator#locator-hover>) instead. Read more about [locators](</docs/locators>).

This method hovers over an element matching [selector](</docs/api/class-frame#frame-hover-option-selector>) by performing the following steps:

  1. Find an element matching [selector](</docs/api/class-frame#frame-hover-option-selector>). If there is none, wait until a matching element is attached to the DOM.
  2. Wait for [actionability](</docs/actionability>) checks on the matched element, unless [force](</docs/api/class-frame#frame-hover-option-force>) option is set. If the element is detached during the checks, the whole action is retried.
  3. Scroll the element into view if needed.
  4. Use [page.mouse](</docs/api/class-page#page-mouse>) to hover over the center of the element, or the specified [position](</docs/api/class-frame#frame-hover-option-position>).



When all steps combined have not finished during the specified [timeout](</docs/api/class-frame#frame-hover-option-timeout>), this method throws a [TimeoutError](</docs/api/class-timeouterror> "TimeoutError"). Passing zero timeout disables this.

**Usage**
    
    
    await frame.hover(selector);  
    await frame.hover(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `force` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to bypass the [actionability](</docs/actionability>) checks. Defaults to `false`.

    * `modifiers` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift"> _(optional)_#

Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.28#

Deprecated

This option has no effect.

This option has no effect.

    * `position` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

      * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

      * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.

    * `trial` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.11#

When set, this method only performs the [actionability](</docs/actionability>) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### innerHTML​

Added before v1.9 frame.innerHTML

Discouraged

Use locator-based [locator.innerHTML()](</docs/api/class-locator#locator-inner-html>) instead. Read more about [locators](</docs/locators>).

Returns `element.innerHTML`.

**Usage**
    
    
    await frame.innerHTML(selector);  
    await frame.innerHTML(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")>#



* * *

### innerText​

Added before v1.9 frame.innerText

Discouraged

Use locator-based [locator.innerText()](</docs/api/class-locator#locator-inner-text>) instead. Read more about [locators](</docs/locators>).

Returns `element.innerText`.

**Usage**
    
    
    await frame.innerText(selector);  
    await frame.innerText(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")>#



* * *

### inputValue​

Added in: v1.13 frame.inputValue

Discouraged

Use locator-based [locator.inputValue()](</docs/api/class-locator#locator-input-value>) instead. Read more about [locators](</docs/locators>).

Returns `input.value` for the selected `<input>` or `<textarea>` or `<select>` element.

Throws for non-input elements. However, if the element is inside the `<label>` element that has an associated [control](<https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control>), returns the value of the control.

**Usage**
    
    
    await frame.inputValue(selector);  
    await frame.inputValue(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")>#



* * *

### isChecked​

Added before v1.9 frame.isChecked

Discouraged

Use locator-based [locator.isChecked()](</docs/api/class-locator#locator-is-checked>) instead. Read more about [locators](</docs/locators>).

Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

**Usage**
    
    
    await frame.isChecked(selector);  
    await frame.isChecked(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")>#



* * *

### isDisabled​

Added before v1.9 frame.isDisabled

Discouraged

Use locator-based [locator.isDisabled()](</docs/api/class-locator#locator-is-disabled>) instead. Read more about [locators](</docs/locators>).

Returns whether the element is disabled, the opposite of [enabled](</docs/actionability#enabled>).

**Usage**
    
    
    await frame.isDisabled(selector);  
    await frame.isDisabled(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")>#



* * *

### isEditable​

Added before v1.9 frame.isEditable

Discouraged

Use locator-based [locator.isEditable()](</docs/api/class-locator#locator-is-editable>) instead. Read more about [locators](</docs/locators>).

Returns whether the element is [editable](</docs/actionability#editable>).

**Usage**
    
    
    await frame.isEditable(selector);  
    await frame.isEditable(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")>#



* * *

### isHidden​

Added before v1.9 frame.isHidden

Discouraged

Use locator-based [locator.isHidden()](</docs/api/class-locator#locator-is-hidden>) instead. Read more about [locators](</docs/locators>).

Returns whether the element is hidden, the opposite of [visible](</docs/actionability#visible>). [selector](</docs/api/class-frame#frame-is-hidden-option-selector>) that does not match any elements is considered hidden.

**Usage**
    
    
    await frame.isHidden(selector);  
    await frame.isHidden(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Deprecated

This option is ignored. [frame.isHidden()](</docs/api/class-frame#frame-is-hidden>) does not wait for the element to become hidden and returns immediately.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")>#



* * *

### isVisible​

Added before v1.9 frame.isVisible

Discouraged

Use locator-based [locator.isVisible()](</docs/api/class-locator#locator-is-visible>) instead. Read more about [locators](</docs/locators>).

Returns whether the element is [visible](</docs/actionability#visible>). [selector](</docs/api/class-frame#frame-is-visible-option-selector>) that does not match any elements is considered not visible.

**Usage**
    
    
    await frame.isVisible(selector);  
    await frame.isVisible(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Deprecated

This option is ignored. [frame.isVisible()](</docs/api/class-frame#frame-is-visible>) does not wait for the element to become visible and returns immediately.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")>#



* * *

### press​

Added before v1.9 frame.press

Discouraged

Use locator-based [locator.press()](</docs/api/class-locator#locator-press>) instead. Read more about [locators](</docs/locators>).

[key](</docs/api/class-frame#frame-press-option-key>) can specify the intended [keyboardEvent.key](<https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key>) value or a single character to generate the text for. A superset of the [key](</docs/api/class-frame#frame-press-option-key>) values can be found [here](<https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values>). Examples of the keys are:

`F1` \- `F12`, `Digit0`\- `Digit9`, `KeyA`\- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`. `ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [key](</docs/api/class-frame#frame-press-option-key>) in the upper case.

If [key](</docs/api/class-frame#frame-press-option-key>) is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

**Usage**
    
    
    await frame.press(selector, key);  
    await frame.press(selector, key, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `key` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `delay` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option will default to `true` in the future.

Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### selectOption​

Added before v1.9 frame.selectOption

Discouraged

Use locator-based [locator.selectOption()](</docs/api/class-locator#locator-select-option>) instead. Read more about [locators](</docs/locators>).

This method waits for an element matching [selector](</docs/api/class-frame#frame-select-option-option-selector>), waits for [actionability](</docs/actionability>) checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](<https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control>), the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**
    
    
    // Single selection matching the value or label  
    frame.selectOption('select#colors', 'blue');  
      
    // single selection matching both the value and the label  
    frame.selectOption('select#colors', { label: 'Blue' });  
      
    // multiple selection  
    frame.selectOption('select#colors', 'red', 'green', 'blue');  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to query for.

  * `values` [null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [ElementHandle](</docs/api/class-elementhandle> "ElementHandle") | [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")> | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") | [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[ElementHandle](</docs/api/class-elementhandle> "ElementHandle")> | [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>#

    * `value` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Matches by `option.value`. Optional.

    * `label` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") _(optional)_

Matches by `option.label`. Optional.

    * `index` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_

Matches by the index. Optional.

Options to select. If the `<select>` has the `multiple` attribute, all matching options are selected, otherwise only the first option matching one of the passed options is selected. String values are matching both values and labels. Option is considered matching if all specified properties match.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `force` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.13#

Whether to bypass the [actionability](</docs/actionability>) checks. Defaults to `false`.

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option has no effect.

This option has no effect.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")>>#



* * *

### setChecked​

Added in: v1.15 frame.setChecked

Discouraged

Use locator-based [locator.setChecked()](</docs/api/class-locator#locator-set-checked>) instead. Read more about [locators](</docs/locators>).

This method checks or unchecks an element matching [selector](</docs/api/class-frame#frame-set-checked-option-selector>) by performing the following steps:

  1. Find an element matching [selector](</docs/api/class-frame#frame-set-checked-option-selector>). If there is none, wait until a matching element is attached to the DOM.
  2. Ensure that matched element is a checkbox or a radio input. If not, this method throws.
  3. If the element already has the right checked state, this method returns immediately.
  4. Wait for [actionability](</docs/actionability>) checks on the matched element, unless [force](</docs/api/class-frame#frame-set-checked-option-force>) option is set. If the element is detached during the checks, the whole action is retried.
  5. Scroll the element into view if needed.
  6. Use [page.mouse](</docs/api/class-page#page-mouse>) to click in the center of the element.
  7. Ensure that the element is now checked or unchecked. If not, this method throws.



When all steps combined have not finished during the specified [timeout](</docs/api/class-frame#frame-set-checked-option-timeout>), this method throws a [TimeoutError](</docs/api/class-timeouterror> "TimeoutError"). Passing zero timeout disables this.

**Usage**
    
    
    await frame.setChecked(selector, checked);  
    await frame.setChecked(selector, checked, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `checked` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean")#

Whether to check or uncheck the checkbox.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `force` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to bypass the [actionability](</docs/actionability>) checks. Defaults to `false`.

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option has no effect.

This option has no effect.

    * `position` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

      * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

      * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.

    * `trial` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

When set, this method only performs the [actionability](</docs/actionability>) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### setInputFiles​

Added before v1.9 frame.setInputFiles

Discouraged

Use locator-based [locator.setInputFiles()](</docs/api/class-locator#locator-set-input-files>) instead. Read more about [locators](</docs/locators>).

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they are resolved relative to the current working directory. For empty array, clears the selected files.

This method expects [selector](</docs/api/class-frame#frame-set-input-files-option-selector>) to point to an [input element](<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input>). However, if the element is inside the `<label>` element that has an associated [control](<https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control>), targets the control instead.

**Usage**
    
    
    await frame.setInputFiles(selector, files);  
    await frame.setInputFiles(selector, files, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `files` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")> | [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") | [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<[Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")>#

    * `name` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

File name

    * `mimeType` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")

File type

    * `buffer` [Buffer](<https://nodejs.org/api/buffer.html#buffer_class_buffer> "Buffer")

File content

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option has no effect.

This option has no effect.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### tap​

Added before v1.9 frame.tap

Discouraged

Use locator-based [locator.tap()](</docs/api/class-locator#locator-tap>) instead. Read more about [locators](</docs/locators>).

This method taps an element matching [selector](</docs/api/class-frame#frame-tap-option-selector>) by performing the following steps:

  1. Find an element matching [selector](</docs/api/class-frame#frame-tap-option-selector>). If there is none, wait until a matching element is attached to the DOM.
  2. Wait for [actionability](</docs/actionability>) checks on the matched element, unless [force](</docs/api/class-frame#frame-tap-option-force>) option is set. If the element is detached during the checks, the whole action is retried.
  3. Scroll the element into view if needed.
  4. Use [page.touchscreen](</docs/api/class-page#page-touchscreen>) to tap the center of the element, or the specified [position](</docs/api/class-frame#frame-tap-option-position>).



When all steps combined have not finished during the specified [timeout](</docs/api/class-frame#frame-tap-option-timeout>), this method throws a [TimeoutError](</docs/api/class-timeouterror> "TimeoutError"). Passing zero timeout disables this.

note

`frame.tap()` requires that the `hasTouch` option of the browser context be set to true.

**Usage**
    
    
    await frame.tap(selector);  
    await frame.tap(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `force` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to bypass the [actionability](</docs/actionability>) checks. Defaults to `false`.

    * `modifiers` [Array](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array> "Array")<"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift"> _(optional)_#

Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option has no effect.

This option has no effect.

    * `position` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_#

      * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

      * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.

    * `trial` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.11#

When set, this method only performs the [actionability](</docs/actionability>) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### textContent​

Added before v1.9 frame.textContent

Discouraged

Use locator-based [locator.textContent()](</docs/api/class-locator#locator-text-content>) instead. Read more about [locators](</docs/locators>).

Returns `element.textContent`.

**Usage**
    
    
    await frame.textContent(selector);  
    await frame.textContent(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")>#



* * *

### type​

Added before v1.9 frame.type

Deprecated

In most cases, you should use [locator.fill()](</docs/api/class-locator#locator-fill>) instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [locator.pressSequentially()](</docs/api/class-locator#locator-press-sequentially>).

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `frame.type` can be used to send fine-grained keyboard events. To fill values in form fields, use [frame.fill()](</docs/api/class-frame#frame-fill>).

To press a special key, like `Control` or `ArrowDown`, use [keyboard.press()](</docs/api/class-keyboard#keyboard-press>).

**Usage**

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `text` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A text to type into a focused element.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `delay` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Time to wait between key presses in milliseconds. Defaults to 0.

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option has no effect.

This option has no effect.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### uncheck​

Added before v1.9 frame.uncheck

Discouraged

Use locator-based [locator.uncheck()](</docs/api/class-locator#locator-uncheck>) instead. Read more about [locators](</docs/locators>).

This method checks an element matching [selector](</docs/api/class-frame#frame-uncheck-option-selector>) by performing the following steps:

  1. Find an element matching [selector](</docs/api/class-frame#frame-uncheck-option-selector>). If there is none, wait until a matching element is attached to the DOM.
  2. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already unchecked, this method returns immediately.
  3. Wait for [actionability](</docs/actionability>) checks on the matched element, unless [force](</docs/api/class-frame#frame-uncheck-option-force>) option is set. If the element is detached during the checks, the whole action is retried.
  4. Scroll the element into view if needed.
  5. Use [page.mouse](</docs/api/class-page#page-mouse>) to click in the center of the element.
  6. Ensure that the element is now unchecked. If not, this method throws.



When all steps combined have not finished during the specified [timeout](</docs/api/class-frame#frame-uncheck-option-timeout>), this method throws a [TimeoutError](</docs/api/class-timeouterror> "TimeoutError"). Passing zero timeout disables this.

**Usage**
    
    
    await frame.uncheck(selector);  
    await frame.uncheck(selector, options);  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `force` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Whether to bypass the [actionability](</docs/actionability>) checks. Defaults to `false`.

    * `noWaitAfter` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

Deprecated

This option has no effect.

This option has no effect.

    * `position` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_ Added in: v1.11#

      * `x` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

      * `y` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")

A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.

    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.

    * `trial` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.11#

When set, this method only performs the [actionability](</docs/actionability>) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### waitForNavigation​

Added before v1.9 frame.waitForNavigation

Deprecated

This method is inherently racy, please use [frame.waitForURL()](</docs/api/class-frame#frame-wait-for-url>) instead.

Waits for the frame navigation and returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

**Usage**

This method waits for the frame to navigate to a new URL. It is useful for when you run code which will indirectly cause the frame to navigate. Consider this example:
    
    
    // Start waiting for navigation before clicking. Note no await.  
    const navigationPromise = page.waitForNavigation();  
    await page.getByText('Navigate after timeout').click();  
    await navigationPromise;  
    

note

Usage of the [History API](<https://developer.mozilla.org/en-US/docs/Web/API/History_API>) to change the URL is considered a navigation.

**Arguments**

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_
    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum operation time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `navigationTimeout` option in the config, or by using the [browserContext.setDefaultNavigationTimeout()](</docs/api/class-browsercontext#browser-context-set-default-navigation-timeout>), [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>), [page.setDefaultNavigationTimeout()](</docs/api/class-page#page-set-default-navigation-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.

    * `url` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string") | [RegExp](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp> "RegExp") | [URLPattern] | [function](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function> "Function")([URL](<https://nodejs.org/api/url.html> "URL")):[boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_#

A glob pattern, regex pattern, URL pattern, or predicate receiving [URL](<https://nodejs.org/api/url.html> "URL") to match while waiting for the navigation. Note that if the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly equal to the string.

    * `waitUntil` "load" | "domcontentloaded" | "networkidle" | "commit" _(optional)_#

When to consider operation succeeded, defaults to `load`. Events can be either:

      * `'domcontentloaded'` \- consider operation to be finished when the `DOMContentLoaded` event is fired.
      * `'load'` \- consider operation to be finished when the `load` event is fired.
      * `'networkidle'` \- **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
      * `'commit'` \- consider operation to be finished when network response is received and the document started loading.



**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [Response](</docs/api/class-response> "Response")>#



* * *

### waitForSelector​

Added before v1.9 frame.waitForSelector

Discouraged

Use web assertions that assert visibility or a locator-based [locator.waitFor()](</docs/api/class-locator#locator-wait-for>) instead. Read more about [locators](</docs/locators>).

Returns when element specified by selector satisfies [state](</docs/api/class-frame#frame-wait-for-selector-option-state>) option. Returns `null` if waiting for `hidden` or `detached`.

note

Playwright automatically waits for element to be ready before performing an action. Using [Locator](</docs/api/class-locator> "Locator") objects and web-first assertions make the code wait-for-selector-free.

Wait for the [selector](</docs/api/class-frame#frame-wait-for-selector-option-selector>) to satisfy [state](</docs/api/class-frame#frame-wait-for-selector-option-state>) option (either appear/disappear from dom, or become visible/hidden). If at the moment of calling the method [selector](</docs/api/class-frame#frame-wait-for-selector-option-selector>) already satisfies the condition, the method will return immediately. If the selector doesn't satisfy the condition for the [timeout](</docs/api/class-frame#frame-wait-for-selector-option-timeout>) milliseconds, the function will throw.

**Usage**

This method works across navigations:
    
    
    const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.  
      
    (async () => {  
      const browser = await chromium.launch();  
      const page = await browser.newPage();  
      for (const currentURL of ['https://google.com', 'https://bbc.com']) {  
        await page.goto(currentURL);  
        const element = await page.mainFrame().waitForSelector('img');  
        console.log('Loaded image: ' + await element.getAttribute('src'));  
      }  
      await browser.close();  
    })();  
    

**Arguments**

  * `selector` [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")#

A selector to query for.

  * `options` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object") _(optional)_

    * `state` "attached" | "detached" | "visible" | "hidden" _(optional)_#

Defaults to `'visible'`. Can be either:

      * `'attached'` \- wait for element to be present in DOM.
      * `'detached'` \- wait for element to not be present in DOM.
      * `'visible'` \- wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element without any content or with `display:none` has an empty bounding box and is not considered visible.
      * `'hidden'` \- wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`. This is opposite to the `'visible'` option.
    * `strict` [boolean](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type> "Boolean") _(optional)_ Added in: v1.14#

When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.

    * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number") _(optional)_#

Maximum time in milliseconds. Defaults to `0` \- no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [browserContext.setDefaultTimeout()](</docs/api/class-browsercontext#browser-context-set-default-timeout>) or [page.setDefaultTimeout()](</docs/api/class-page#page-set-default-timeout>) methods.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[null](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null> "null") | [ElementHandle](</docs/api/class-elementhandle> "ElementHandle")>#



* * *

### waitForTimeout​

Added before v1.9 frame.waitForTimeout

Discouraged

Never wait for timeout in production. Tests that wait for time are inherently flaky. Use [Locator](</docs/api/class-locator> "Locator") actions and web assertions that wait automatically.

Waits for the given [timeout](</docs/api/class-frame#frame-wait-for-timeout-option-timeout>) in milliseconds.

Note that `frame.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going to be flaky. Use signals such as network events, selectors becoming visible and others instead.

**Usage**
    
    
    await frame.waitForTimeout(timeout);  
    

**Arguments**

  * `timeout` [number](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type> "Number")#

A timeout to wait for




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#


