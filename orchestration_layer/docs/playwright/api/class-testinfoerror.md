On this page

# TestInfoError

Information about an error thrown during test execution.

* * *

## Properties​

### cause​

Added in: v1.49 testInfoError.cause

Error cause. Set when there is a [cause](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause>) for the error. Will be `undefined` if there is no cause or if the cause is not an instance of [Error](<https://nodejs.org/api/errors.html#errors_class_error> "Error").

**Usage**
    
    
    testInfoError.cause  
    

**Type**

  * [TestInfoError](</docs/api/class-testinfoerror> "TestInfoError")



* * *

### message​

Added in: v1.10 testInfoError.message

Error message. Set when [Error](<https://nodejs.org/api/errors.html#errors_class_error> "Error") (or its subclass) has been thrown.

**Usage**
    
    
    testInfoError.message  
    

**Type**

  * [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")



* * *

### stack​

Added in: v1.10 testInfoError.stack

Error stack. Set when [Error](<https://nodejs.org/api/errors.html#errors_class_error> "Error") (or its subclass) has been thrown.

**Usage**
    
    
    testInfoError.stack  
    

**Type**

  * [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")



* * *

### value​

Added in: v1.10 testInfoError.value

The value that was thrown. Set when anything except the [Error](<https://nodejs.org/api/errors.html#errors_class_error> "Error") (or its subclass) has been thrown.

**Usage**
    
    
    testInfoError.value  
    

**Type**

  * [string](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type> "string")


