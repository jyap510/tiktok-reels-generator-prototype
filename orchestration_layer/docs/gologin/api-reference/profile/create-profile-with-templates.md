> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create profile with templates

> It uses templates for profile parameters.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json post /browser/quick
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
  /browser/quick:
    post:
      tags:
        - Profile
      summary: Create profile with templates
      description: It uses templates for profile parameters.
      operationId: BrowserController_quickAddBrowser
      parameters:
        - name: currentWorkspace
          required: false
          in: query
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateQuickProfileValidation'
      responses:
        '201':
          description: ''
      security:
        - bearer: []
components:
  schemas:
    CreateQuickProfileValidation:
      type: object
      properties:
        name:
          type: string
          description: Name of the profile.
          example: My Test Profile
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
      required:
        - os
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).