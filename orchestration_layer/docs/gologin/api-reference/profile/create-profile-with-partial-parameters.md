> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create profile with partial parameters

> Creates a new profile - here you can specify particular parameters for the profile. Unspecified parameters will be calculated randomly.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json post /browser/custom
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
  /browser/custom:
    post:
      tags:
        - Profile
      summary: Create profile with partial parameters
      description: >-
        Creates a new profile - here you can specify particular parameters for
        the profile. Unspecified parameters will be calculated randomly.
      operationId: BrowserController_addCustomBrowser
      parameters:
        - name: workspaceId
          required: false
          in: query
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateCustomBrowserValidation'
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OBrowserListDTO'
      security:
        - bearer: []
        - bearer: []
components:
  schemas:
    CreateCustomBrowserValidation:
      type: object
      properties:
        name:
          type: string
          description: Profile name.
          example: My Test Profile
        notes:
          type: string
          description: >-
            Here you can put some information about the profile that wil help
            you to navigate.
          example: Temporary profile for testing
        autoLang:
          type: boolean
          description: >-
            If true, the browser will automatically change the language to the
            language of your location or proxy location if proxy is enabled.
          example: true
        lockEnabled:
          type: boolean
          default: false
          description: >-
            If enabled - other users will not be able to run this profile when
            its already running.
          example: false
        folderName:
          type: string
        bookmarks:
          description: Bookmarks of the browser that will be created.
          allOf:
            - $ref: '#/components/schemas/BookmarkFolders'
        os:
          type: string
          enum:
            - lin
            - mac
            - win
            - android
            - android-cloud
          description: >-
            OS type. It should be the same with the OS you want to run the
            browser on.
          example: win
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
          description: >-
            Here you can specify OS specification. For example chip version for
            macos or version of windows.
          example: win11
        devicePixelRatio:
          type: number
          description: >-
            Parameter of mobile devices, tablets and notebooks. If you not sure
            what to put - leave it empty.
          example: 1
        navigator:
          $ref: '#/components/schemas/NavigatorModel'
        proxy:
          $ref: '#/components/schemas/BrowserProxyCreateValidation'
        dns:
          type: string
          default: ''
          description: >-
            Allows you to specify custom DNS (Domain Name System) settings for
            the browser profile.
          example: 8.8.8.8
        timezone:
          description: >-
            The timezone configuration is a setting that controls how the
            browser handles time and date information.
          allOf:
            - $ref: '#/components/schemas/TimezoneModel'
        geolocation:
          description: >-
            Geolocation in the browser is a feature that allows websites to
            access the user's geographical location.
          allOf:
            - $ref: '#/components/schemas/GeolocationModel'
        audioContext:
          description: >-
            AudioContext is a configuration component that controls how Chromium
            handles the Web Audio API.
          allOf:
            - $ref: '#/components/schemas/AudioContextModel'
        canvas:
          description: >-
            Canvas is a browser feature that utilizes the HTML5 Canvas API for
            rendering 2D and 3D graphics in web browsers.
          allOf:
            - $ref: '#/components/schemas/CanvasModel'
        fonts:
          description: >-
            Fonts are a configuration component that controls how Chromium
            handles the Fonts API.
          allOf:
            - $ref: '#/components/schemas/FontsModel'
        mediaDevices:
          description: >-
            A feature that provides access to connected media input and output
            devices like cameras, microphones, and speakers.
          allOf:
            - $ref: '#/components/schemas/MediaDevicesModel'
        webRTC:
          description: >-
            WebRTC in browser configuration refers to settings that control how
            the browser handles real-time communication protocols.
          allOf:
            - $ref: '#/components/schemas/WebRTCModel'
        webGL:
          description: >-
            WebGL (Web Graphics Library) is a JavaScript API in Chromium-based
            browsers that allows websites to render interactive 2D and 3D   
            graphics without requiring plugins. It provides direct access to the
            computer's GPU(Graphics Processing Unit) for accelerated rendering.
          allOf:
            - $ref: '#/components/schemas/WebGlModel'
        clientRects:
          description: Controls whether the client rectangle values are randomized.
          allOf:
            - $ref: '#/components/schemas/ClientRectsModel'
        webGLMetadata:
          description: Controls WebGL metadata such as vendor and renderer information.
          allOf:
            - $ref: '#/components/schemas/WebGlMetadataModel'
        chromeExtensions:
          default: []
          description: List of Chrome extensions to be installed in the browser profile.
          type: array
          items:
            type: string
        userChromeExtensions:
          default: []
          description: >-
            List of custom Chrome extensions to be installed in the browser
            profile.
          type: array
          items:
            type: string
        folders:
          default: []
          description: >-
            List of folder identifiers associated with this browser profile for
            organization.
          type: array
          items:
            type: string
        createProxy:
          type: boolean
          description: If you want to create a proxy for the profile.
          example: false
    OBrowserListDTO:
      type: object
      properties:
        name:
          type: string
        role:
          type: string
        id:
          type: string
        notes:
          type: string
        browserType:
          type: string
        lockEnabled:
          type: boolean
        timezone:
          type: object
        navigator:
          $ref: '#/components/schemas/NavigatorModel'
        geolocation:
          type: object
        debugMode:
          type: boolean
        isM1:
          type: boolean
        isPinned:
          type: boolean
        updateUALastChosenBrowserV:
          type: string
        canBeRunning:
          type: boolean
        isRunDisabled:
          type: boolean
        runDisabledReason:
          type: string
          enum:
            - unpaid-share
        isRunning:
          type: boolean
        isWeb:
          type: boolean
        os:
          type: object
        osSpec:
          type: object
        proxy:
          type: object
        host:
          type: string
        port:
          type: number
        proxyType:
          type: string
        proxyRegion:
          type: string
        status:
          type: string
        folders:
          type: array
          items:
            type: string
        sharedEmails:
          type: array
          items:
            type: string
        shareId:
          type: string
        createdAt:
          format: date-time
          type: string
          description: Date string
        updatedAt:
          format: date-time
          type: string
          description: Date string
        lastActivity:
          format: date-time
          type: string
          description: Date string
        chromeExtensions:
          type: array
          items:
            type: string
        userChromeExtensions:
          type: array
          items:
            type: string
        tags:
          type: array
          items:
            type: string
        permissions:
          $ref: '#/components/schemas/ProfilePermissionsDTO'
        proxyEnabled:
          type: boolean
        isAutoGenerated:
          type: boolean
        isBookmarksSynced:
          type: boolean
        defaultProps:
          $ref: '#/components/schemas/IDefaultProfilePropsDTO'
        autoLang:
          type: boolean
        remoteOrbitaUrl:
          type: string
        webGLMetadata:
          $ref: '#/components/schemas/WebGlMetadataModel'
        fonts:
          $ref: '#/components/schemas/FontsModel'
        facebookAccountData:
          $ref: '#/components/schemas/ParsedFacebookDataDTO'
        order:
          type: number
      required:
        - name
        - role
        - id
        - notes
        - browserType
        - lockEnabled
        - timezone
        - navigator
        - geolocation
        - debugMode
        - canBeRunning
        - isRunning
        - proxy
        - proxyType
        - proxyRegion
        - createdAt
        - updatedAt
        - lastActivity
        - userChromeExtensions
        - permissions
        - remoteOrbitaUrl
        - webGLMetadata
    BookmarkFolders:
      type: object
      properties:
        BookmarkName:
          description: >-
            Bookmark object - it could be folder or bookmark item. Here should
            be the name of the bookmark or bookmark folder.
          example:
            bookmarks_bar:
              name: Bookmark Name
              type: folder
              children:
                - name: Bookmark Name
                  type: url
                  url: https://www.google.com
          allOf:
            - $ref: '#/components/schemas/Bookmarks'
      required:
        - BookmarkName
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
    ProfilePermissionsDTO:
      type: object
      properties:
        transferProfile:
          type: boolean
        transferToMyWorkspace:
          type: boolean
        shareProfile:
          type: boolean
        manageFolders:
          type: boolean
        editProfile:
          type: boolean
        deleteProfile:
          type: boolean
        cloneProfile:
          type: boolean
        exportProfile:
          type: boolean
        updateUA:
          type: boolean
        addVpnUfoProxy:
          type: boolean
        runProfile:
          type: boolean
        runProfileWeb:
          type: boolean
        viewProfile:
          type: boolean
        addProfileTag:
          type: boolean
        removeProfileTag:
          type: boolean
        viewShareLinks:
          type: boolean
        createShareLinks:
          type: boolean
        updateShareLinks:
          type: boolean
        deleteShareLinks:
          type: boolean
        viewCustomExtensions:
          type: boolean
      required:
        - transferProfile
        - transferToMyWorkspace
        - shareProfile
        - manageFolders
        - editProfile
        - deleteProfile
        - cloneProfile
        - exportProfile
        - updateUA
        - addVpnUfoProxy
        - runProfile
        - runProfileWeb
        - viewProfile
        - addProfileTag
        - removeProfileTag
        - viewShareLinks
        - createShareLinks
        - updateShareLinks
        - deleteShareLinks
        - viewCustomExtensions
    IDefaultProfilePropsDTO:
      type: object
      properties:
        profileNameIsDefault:
          type: boolean
        profileNotesIsDefault:
          type: boolean
      required:
        - profileNameIsDefault
        - profileNotesIsDefault
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
    Bookmarks:
      type: object
      properties:
        bookmark_bar:
          $ref: '#/components/schemas/BookmarkFolder'
        other:
          $ref: '#/components/schemas/BookmarkFolder'
        synced:
          $ref: '#/components/schemas/BookmarkFolder'
      required:
        - bookmark_bar
        - other
        - synced
    BookmarkFolder:
      type: object
      properties:
        children:
          type: array
          items:
            $ref: '#/components/schemas/SiteBookmark'
        name:
          type: string
        type:
          type: string
      required:
        - children
        - name
        - type
    SiteBookmark:
      type: object
      properties:
        name:
          type: string
          description: Bookmark name.
        type:
          type: string
          description: Type of bookmark item, usually "url".
          example: url
        url:
          type: string
          description: Bookmark URL.
          example: https://www.google.com
      required:
        - name
        - type
        - url
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).