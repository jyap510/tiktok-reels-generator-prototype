> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get profile by id

> Returns full profile info by id.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json get /browser/{id}
openapi: 3.0.0
info:
  title: GoLogin
  description: ''
  version: '1.0'
  contact: {}
servers:
  - url: https://api.gologin.com
security: []
tags:
  - name: Profile
    description: >-
      Profile is a main entity of the application. It stores all the information
      that needs to be saved in browser to change your fingerprint.
  - name: Proxy
    description: >-
      Proxy in Gologin is a separate entity that belongs to a profile but also
      can be managed separately for convinience.
  - name: Share
    description: This feature allows you to give an access to your profiles to other users.
  - name: Workspace
    description: >-
      Workspace is a group of profiles and users that can manage those
      profiles.        This feature helps a lot with a team collaboration
      because you can granually control permissions for each user.
  - name: Tags
    description: Tags are a way to categorize profiles.
paths:
  /browser/{id}:
    get:
      tags:
        - Profile
      summary: Get profile by id
      description: Returns full profile info by id.
      operationId: BrowserController_getBrowserById
      parameters:
        - name: id
          required: true
          in: path
          description: Id of the profile.
          schema:
            type: string
        - name: currentWorkspace
          required: false
          in: query
          description: If you want to get the profile from a specific workspace.
          schema:
            example: 60a763f86501b3abcdc54b21
            type: string
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OBrowser'
      security:
        - bearer: []
components:
  schemas:
    OBrowser:
      type: object
      properties:
        name:
          type: string
        id:
          type: string
        notes:
          type: string
        facebookAccountData:
          $ref: '#/components/schemas/ParsedFacebookDataDTO'
        browserType:
          type: string
          enum:
            - fierfox
            - chrome
        canBeRunning:
          type: boolean
        os:
          type: string
          enum:
            - lin
            - mac
            - win
            - android
            - android-cloud
        osSpec:
          type: string
          enum:
            - M1
            - M2
            - M3
            - M4
            - M5
            - win11
            - ''
        isM1:
          type: boolean
        startUrl:
          type: string
        autoLang:
          type: boolean
        bookmarks:
          type: object
        googleServicesEnabled:
          type: boolean
        isBookmarksSynced:
          type: boolean
        launchArguments:
          type: string
        lockEnabled:
          type: boolean
        debugMode:
          type: boolean
        navigator:
          $ref: '#/components/schemas/NavigatorModel'
        storage:
          $ref: '#/components/schemas/StorageModel'
        proxyEnabled:
          type: boolean
        autoProxyServer:
          type: string
        autoProxyUsername:
          type: string
        autoProxyPassword:
          type: string
        proxy:
          $ref: '#/components/schemas/BrowserProxyCreateValidation'
        archivedProxy:
          $ref: '#/components/schemas/BrowserArchivedProxyDTO'
        dns:
          type: string
        plugins:
          $ref: '#/components/schemas/PluginsModel'
        timezone:
          $ref: '#/components/schemas/TimezoneModel'
        geolocation:
          $ref: '#/components/schemas/GeolocationModel'
        audioContext:
          $ref: '#/components/schemas/AudioContextModel'
        canvas:
          $ref: '#/components/schemas/CanvasModel'
        fonts:
          $ref: '#/components/schemas/FontsModel'
        mediaDevices:
          $ref: '#/components/schemas/MediaDevicesModel'
        webRTC:
          $ref: '#/components/schemas/WebRTCModel'
        webGL:
          $ref: '#/components/schemas/WebGlModel'
        webGpu:
          type: object
        clientRects:
          $ref: '#/components/schemas/ClientRectsModel'
        webGLMetadata:
          $ref: '#/components/schemas/WebGlMetadataModel'
        extensions:
          $ref: '#/components/schemas/ExtensionsModel'
        profile:
          type: string
        s3Path:
          type: string
        s3Date:
          type: string
        s3SignedUrl:
          type: string
        createdInOs:
          type: object
        devicePixelRatio:
          type: number
        checkCookies:
          type: boolean
        chromeExtensions:
          type: array
          items:
            type: string
        userChromeExtensions:
          type: array
          items:
            type: string
        isAutoGenerated:
          type: boolean
        permissions:
          type: object
      required:
        - name
        - id
        - notes
        - browserType
        - os
        - osSpec
        - startUrl
        - autoLang
        - bookmarks
        - googleServicesEnabled
        - isBookmarksSynced
        - launchArguments
        - lockEnabled
        - debugMode
        - navigator
        - proxyEnabled
        - autoProxyServer
        - autoProxyUsername
        - autoProxyPassword
        - dns
    ParsedFacebookDataDTO:
      type: object
      properties:
        date:
          type: string
        token:
          type: string
        fbIdAccount:
          type: string
        email:
          type: string
        password:
          type: string
        googleDriveUrl:
          type: string
        fb2faToolUrl:
          type: string
        fbUrl:
          type: string
        uaVersion:
          type: string
        cookies:
          type: string
        notParsedData:
          type: array
          items:
            type: string
    NavigatorModel:
      type: object
      properties:
        userAgent:
          type: string
          description: >-
            The most important parameter of the browser.It decides which browser
            version will be used. It is not recommended to change it by yourself
          example: >-
            Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36
            (KHTML, like Gecko) Chrome/134.0.6998.36 Safari/537.36
        resolution:
          type: string
          description: >-
            Maximum resolution of the browser, should not exceed your system
            maximum resolution
          example: 1920x1080
        language:
          type: string
          description: >-
            Language of the browser. If autoLang is enabled - this option will
            be ignored.
          example: en-US
        platform:
          type: string
          description: >-
            It is internal browser parameter. "Win32", "MacIntel" - desktop,
            "Linux armv81", "Linux aarch64", "Linux armv8l", "Linux armv7l" -
            mobile. For mac os it is always "MacIntel" even for arm.
          enum:
            - Win32
            - MacIntel
            - Linux armv81
            - Linux aarch64
            - Linux x86_64
            - Linux armv8l
            - Linux armv7l
          example: Win32
        hardwareConcurrency:
          type: number
          description: Number of processor cores of the system.
          example: 4
        deviceMemory:
          type: number
          description: Number of operating system memory in gigabytes.
          example: 4
        maxTouchPoints:
          type: number
          description: >-
            Maximum number of simultaneous touch contact points supported by the
            device. Its particularly relevant for touch       - enabled devices
            like smartphones, tablets, and touchscreen laptops.
          example: 10
      required:
        - userAgent
        - resolution
        - language
        - platform
    StorageModel:
      type: object
      properties:
        local:
          type: boolean
          default: true
          description: If true, the browser will save local storage between sessions.
          example: true
        extensions:
          type: boolean
          default: true
          description: If true, the browser will save extensions between sessions.
          example: true
        bookmarks:
          type: boolean
          default: true
          description: If true, the browser will save bookmarks between sessions.
          example: true
        history:
          type: boolean
          default: true
          description: If true, the browser will save history between sessions.
          example: true
        passwords:
          type: boolean
          default: true
          description: If true, the browser will save passwords between sessions.
          example: true
        session:
          type: boolean
          default: true
          description: If true, the browser will save session between sessions.
          example: true
        indexedDb:
          type: boolean
          default: false
          description: If true, the browser will save indexedDb between sessions.
          example: false
        enableExternalExtensions:
          type: boolean
          default: false
          description: >-
            If true, the browser will block external extensions that your system
            will try to add.
          example: false
    BrowserProxyCreateValidation:
      type: object
      properties:
        id:
          type: string
          description: >-
            You can specify particular proxy by its id or leave it empty to use
            default proxy.
          example: 6201422450e3b9cd602f24e1
        mode:
          type: string
          enum:
            - http
            - socks4
            - socks5
            - possh
            - geolocation
            - none
            - gologin
            - tor
          description: Proxy mode represent the protocolo of the connection to the proxy.
          example: http
        host:
          type: string
          description: Proxy host. It could be ip address or domain name.
          example: 127.0.0.1
        port:
          type: number
          description: Proxy port.
          example: 80
        username:
          type: string
          description: Proxy username.
          example: user
        password:
          type: string
          description: Proxy password if proxy requires authentication.
          example: password
        changeIpUrl:
          type: string
          description: >-
            This allows you to change IP address of the proxy if your proxy
            provider supports it.
          example: https://some-proxy-provider.com/change-ip
        customName:
          type: string
          description: >-
            As proxy is separate entity in gologin, you can set custom name for
            it to identify it in the list of proxies.
          example: My Proxy
      required:
        - mode
    BrowserArchivedProxyDTO:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        country:
          type: string
      required:
        - id
    PluginsModel:
      type: object
      properties:
        enableVulnerable:
          type: boolean
          default: true
          description: If true, the browser will use vulnerable plugins.
        enableFlash:
          type: boolean
          default: true
          description: If true, the browser will use Flash.
    TimezoneModel:
      type: object
      properties:
        enabled:
          type: boolean
          default: true
          description: If true, the browser will use the timezone of the user.
        fillBasedOnIp:
          type: boolean
          default: true
          description: >-
            If true, the browser will use the timezone of the user based on
            their IP address or proxy IP address if proxy is enabled.
        timezone:
          type: string
          description: The timezone to use for the browser profile.
          example: America/New_York
    GeolocationModel:
      type: object
      properties:
        mode:
          type: string
          enum:
            - prompt
            - block
            - allow
          description: >-
            This setting controls how the browser handles      geolocation
            requests from websites. Prompt will ask the user       for
            permission to share their location, Block will block all       
            geolocation requests, Allow will allow all geolocation requests.
        enabled:
          type: boolean
          default: true
          description: If true, the browser will use the geolocation.
        customize:
          type: boolean
          default: true
          description: If true, user can customize the geolocation.
        fillBasedOnIp:
          type: boolean
          default: true
          description: >-
            If true, the browser will use the geolocation based on the IP
            address.
        isCustomCoordinates:
          type: boolean
          default: true
          description: If true, the browser will use the custom coordinates.
        latitude:
          type: number
          description: The latitude of the custom coordinates.
        longitude:
          type: number
          description: The longitude of the custom coordinates.
        accuracy:
          type: number
          description: The accuracy of the custom coordinates.
      required:
        - mode
    AudioContextModel:
      type: object
      properties:
        mode:
          type: string
          enum:
            - noise
            - 'off'
          default: 'off'
          description: >-
            When set to "noise", it applies a small randomization to audio
            processing.     When set to "off", audio fingerprinting protection
            is disabled.
          example: noise
        noise:
          type: number
          description: >-
            A floating-point number that adds subtle variations to audio
            processing.
          example: 0.1
    CanvasModel:
      type: object
      properties:
        mode:
          type: string
          enum:
            - block
            - noise
            - 'off'
          default: 'off'
          description: >-
            'block': Blocks canvas fingerprinting attempts completely    
            'noise': Applies a small randomization to canvas processing    
            'off': Disables canvas fingerprinting protection.
        noise:
          type: number
          description: >-
            A floating-point number that adds subtle variations to canvas
            processing.
          example: 0.1
    FontsModel:
      type: object
      properties:
        families:
          description: Array that tells the browser which fonts it can use.
          example:
            - Arial
            - Helvetica
            - Verdana
          type: array
          items:
            type: string
        enableMasking:
          type: boolean
          default: true
          description: >-
            A font fingerprinting protection feature that helps prevent websites
            from identifying users through font enumeration and detection.
          example: true
        enableDomRect:
          type: boolean
          default: true
          description: >-
            A companion setting to enableMasking that specifically protects
            against a technique called "DOM rect fingerprinting".
          example: true
      required:
        - families
    MediaDevicesModel:
      type: object
      properties:
        videoInputs:
          type: number
          description: >-
            Specifies the number of video capture devices (cameras) that will be
            reported to websites through the MediaDevices API.
          example: 1
        audioInputs:
          type: number
          description: >-
            Specifies the number of audio capture devices (microphones) that
            will be reported to websites through the MediaDevices API.
          example: 1
        audioOutputs:
          type: number
          description: >-
            Specifies the number of audio output devices (speakers, headphones,
            etc.)      that will be reported to websites through the
            MediaDevices API.
          example: 1
        enableMasking:
          type: boolean
          default: false
          description: >-
            When enabled, this prevents websites from obtaining the actual
            hardware identifiers of media devices.
        uid:
          type: string
          description: >-
            A unique identifier used to ensure consistent device IDs within a
            browser profile.
      required:
        - videoInputs
        - audioInputs
        - audioOutputs
    WebRTCModel:
      type: object
      properties:
        enable:
          type: boolean
          description: Boolean toggle that determines if WebRTC is active.
          default: true
          example: true
        isEmptyIceList:
          type: boolean
          default: true
          description: Controls whether ICE candidates are empty or not.
          example: true
        mode:
          type: string
          enum:
            - alerted
            - disabled
            - real
            - public
            - fake
          description: >-
            Sets the WebRTC operating mode from the allowed values.      alerted
            - Allows WebRTC connections but notifies users before establishing
            connections.      disabled - Completely turns off WebRTC
            functionality.      real - Allows WebRTC connections and uses real
            IP addresses.      public - Allows WebRTC connections and uses
            public IP addresses.      fake - Allows WebRTC connections and uses
            fake IP addresses.
          example: 'off'
      required:
        - mode
    WebGlModel:
      type: object
      properties:
        mode:
          type: string
          enum:
            - 'off'
            - noise
          default: noise
          description: >-
            Controls the WebGL rendering mode. off - Disables WebGL rendering.
            noise - Adds noise to the WebGL rendering.
          example: noise
        getClientRectsNoise:
          type: number
          description: Controls randomization of geometric calculations.
          example: 0.5
        noise:
          type: number
          description: >-
            Sets the noise level for the WebGL rendering. The value ranges from
            0 to 1, where 0 is no noise and 1 is maximum noise.
          example: 0.5
    ClientRectsModel:
      type: object
      properties:
        mode:
          type: string
          enum:
            - 'off'
            - noise
          default: noise
          description: >-
            Operating mode for client rects. Use "off" to disable or "noise" to
            add randomization.
          example: noise
        noise:
          type: number
          description: >-
            Amount of noise/randomization to apply to client rects (higher
            values = more randomization).
          example: 0.5
          minimum: 0
    WebGlMetadataModel:
      type: object
      properties:
        vendor:
          type: string
          description: >-
            The WebGL vendor string to use in the browser profile. This
            identifies the GPU vendor.
          example: Google Inc. (Intel)
        renderer:
          type: string
          description: >-
            The WebGL renderer string to use in the browser profile. This
            identifies the specific GPU model and rendering API.
          example: >-
            ANGLE (Intel, Intel(R) HD Graphics 630 Direct3D11 vs_5_0 ps_5_0,
            D3D11)
        mode:
          type: string
          default: mask
          enum:
            - mask
            - 'off'
          description: >-
            Controls the WebGL metadata mode. "mask" - Masks WebGL vendor and
            renderer information. "off" - Disables WebGL metadata masking.
          example: mask
    ExtensionsModel:
      type: object
      properties:
        enabled:
          type: boolean
          description: Whether WebGL extensions are enabled for the browser profile.
          default: true
          example: true
        preloadCustom:
          type: boolean
          description: Whether to preload custom WebGL extensions.
          default: true
          example: true
        names:
          description: List of WebGL extension names to be supported.
          example:
            - WEBGL_debug_renderer_info
            - EXT_texture_filter_anisotropic
          type: array
          items:
            type: string
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).