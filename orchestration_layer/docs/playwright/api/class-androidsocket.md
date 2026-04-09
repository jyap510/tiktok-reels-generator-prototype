On this page

# AndroidSocket

[AndroidSocket](</docs/api/class-androidsocket> "AndroidSocket") is a way to communicate with a process launched on the [AndroidDevice](</docs/api/class-androiddevice> "AndroidDevice"). Use [androidDevice.open()](</docs/api/class-androiddevice#android-device-open>) to open a socket.

* * *

## Methods​

### close​

Added in: v1.9 androidSocket.close

Closes the socket.

**Usage**
    
    
    await androidSocket.close();  
    

**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

### write​

Added in: v1.9 androidSocket.write

Writes some [data](</docs/api/class-androidsocket#android-socket-write-option-data>) to the socket.

**Usage**
    
    
    await androidSocket.write(data);  
    

**Arguments**

  * `data` [Buffer](<https://nodejs.org/api/buffer.html#buffer_class_buffer> "Buffer")#

Data to write.




**Returns**

  * [Promise](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise> "Promise")<[void](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined> "void")>#



* * *

## Events​

### on('close')​

Added in: v1.9 androidSocket.on('close')

Emitted when the socket is closed.

**Usage**
    
    
    androidSocket.on('close', data => {});  
    

* * *

### on('data')​

Added in: v1.9 androidSocket.on('data')

Emitted when data is available to read from the socket.

**Usage**
    
    
    androidSocket.on('data', data => {});  
    

**Event data**

  * [Buffer](<https://nodejs.org/api/buffer.html#buffer_class_buffer> "Buffer")


