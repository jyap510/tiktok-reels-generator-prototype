> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get a random fingerprint

> Returns a random fingerprint to create a new profile.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json get /browser/fingerprint
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
  /browser/fingerprint:
    get:
      tags:
        - Profile
        - Fingerprint
      summary: Get a random fingerprint
      description: Returns a random fingerprint to create a new profile.
      operationId: BrowserController_getRandomFingerprint
      parameters:
        - name: os
          required: true
          in: query
          description: The operating system to use for the fingerprint.
          schema:
            example: win
            enum:
              - lin
              - mac
              - win
              - android
              - android-cloud
              - macM1
            type: string
        - name: osSpec
          required: false
          in: query
          description: >-
            The specific version of the operating system to use for the
            fingerprint.
          schema:
            example: win11
            enum:
              - M1
              - M2
              - M3
              - M4
              - M5
              - win11
              - ''
            type: string
        - name: template
          required: false
          in: query
          description: The template to use for the fingerprint.
          schema:
            type: string
        - name: currentWorkspace
          required: true
          in: query
          description: The current workspace to use for the fingerprint.
          schema:
            type: string
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OFingerprintInst'
      security:
        - bearer: []
components:
  schemas:
    OFingerprintInst:
      type: object
      properties:
        navigator:
          $ref: '#/components/schemas/FPNavigatorModel'
        plugins:
          $ref: '#/components/schemas/FPPluginsModel'
        canvas:
          $ref: '#/components/schemas/FPCanvasModel'
        mediaDevices:
          $ref: '#/components/schemas/FPMediaDevicesModel'
        webGLMetadata:
          $ref: '#/components/schemas/FPWebGlMetadataModel'
        os:
          type: object
        osSpec:
          type: object
        devicePixelRatio:
          type: number
        fonts:
          type: array
          items:
            type: string
        extensionsToNewProfiles:
          type: array
          items:
            type: string
        userExtensionsToNewProfiles:
          type: array
          items:
            type: string
        autoLang:
          type: boolean
      required:
        - navigator
        - plugins
        - canvas
        - mediaDevices
        - webGLMetadata
        - os
        - osSpec
        - devicePixelRatio
        - fonts
        - extensionsToNewProfiles
        - userExtensionsToNewProfiles
        - autoLang
    FPNavigatorModel:
      type: object
      properties:
        userAgent:
          type: string
        resolution:
          type: string
        language:
          type: string
        platform:
          type: string
        hardwareConcurrency:
          type: number
        deviceMemory:
          type: number
        maxTouchPoints:
          type: number
      required:
        - userAgent
        - resolution
        - language
        - platform
        - hardwareConcurrency
        - deviceMemory
        - maxTouchPoints
    FPPluginsModel:
      type: object
      properties:
        enableVulnerable:
          type: boolean
        enableFlash:
          type: boolean
      required:
        - enableVulnerable
        - enableFlash
    FPCanvasModel:
      type: object
      properties:
        mode:
          type: string
          enum:
            - real
            - block
            - noise
            - natural
      required:
        - mode
    FPMediaDevicesModel:
      type: object
      properties:
        videoInputs:
          type: number
        audioInputs:
          type: number
        audioOutputs:
          type: number
      required:
        - videoInputs
        - audioInputs
        - audioOutputs
    FPWebGlMetadataModel:
      type: object
      properties:
        mode:
          type: string
          enum:
            - mask
            - noise
        vendor:
          type: string
        renderer:
          type: string
      required:
        - mode
        - vendor
        - renderer
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).