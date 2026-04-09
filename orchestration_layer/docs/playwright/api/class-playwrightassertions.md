On this page

# PlaywrightAssertions

Playwright gives you Web-First Assertions with convenience methods for creating assertions that will wait and retry until the expected condition is met.

Consider the following example:
    
    
    import { test, expect } from '@playwright/test';  
      
    test('status becomes submitted', async ({ page }) => {  
      // ...  
      await page.locator('#submit-button').click();  
      await expect(page.locator('.status')).toHaveText('Submitted');  
    });  
    

Playwright will be re-testing the node with the selector `.status` until fetched Node has the `"Submitted"` text. It will be re-fetching the node and checking it over and over, until the condition is met or until the timeout is reached. You can pass this timeout as an option.

By default, the timeout for assertions is set to 5 seconds.

* * *

## Methods​

### expect(response)​

Added in: v1.18 playwrightAssertions.expect(response)

Creates a [APIResponseAssertions](</docs/api/class-apiresponseassertions> "APIResponseAssertions") object for the given [APIResponse](</docs/api/class-apiresponse> "APIResponse").

**Usage**

**Arguments**

  * `response` [APIResponse](</docs/api/class-apiresponse> "APIResponse")#

[APIResponse](</docs/api/class-apiresponse> "APIResponse") object to use for assertions.




**Returns**

  * [APIResponseAssertions](</docs/api/class-apiresponseassertions> "APIResponseAssertions")#



* * *

### expect(value)​

Added in: v1.9 playwrightAssertions.expect(value)

Creates a [GenericAssertions](</docs/api/class-genericassertions> "GenericAssertions") object for the given value.

**Usage**
    
    
    expect(value);  
    

**Arguments**

  * `value` [Object](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object> "Object")#

Value that will be asserted.




**Returns**

  * [GenericAssertions](</docs/api/class-genericassertions> "GenericAssertions")#



* * *

### expect(locator)​

Added in: v1.18 playwrightAssertions.expect(locator)

Creates a [LocatorAssertions](</docs/api/class-locatorassertions> "LocatorAssertions") object for the given [Locator](</docs/api/class-locator> "Locator").

**Usage**

**Arguments**

  * `locator` [Locator](</docs/api/class-locator> "Locator")#

[Locator](</docs/api/class-locator> "Locator") object to use for assertions.




**Returns**

  * [LocatorAssertions](</docs/api/class-locatorassertions> "LocatorAssertions")#



* * *

### expect(page)​

Added in: v1.18 playwrightAssertions.expect(page)

Creates a [PageAssertions](</docs/api/class-pageassertions> "PageAssertions") object for the given [Page](</docs/api/class-page> "Page").

**Usage**

**Arguments**

  * `page` [Page](</docs/api/class-page> "Page")#

[Page](</docs/api/class-page> "Page") object to use for assertions.




**Returns**

  * [PageAssertions](</docs/api/class-pageassertions> "PageAssertions")#


