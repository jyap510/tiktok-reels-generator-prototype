> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update chrome extensions for multiple profiles

> Updates the chrome extensions for multiple profiles.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json patch /browser/chrome_extensions/many
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
  /browser/chrome_extensions/many:
    patch:
      tags:
        - Profile
      summary: Update chrome extensions for multiple profiles
      description: Updates the chrome extensions for multiple profiles.
      operationId: BrowserController_updateChromeExtensions
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchChromeExtensionsManyValidation'
      responses:
        '204':
          description: ''
      security:
        - bearer: []
components:
  schemas:
    PatchChromeExtensionsManyValidation:
      type: object
      properties:
        profileIds:
          description: List of profile IDs to update.
          example:
            - 6200f55e7685342e170dc531
          type: array
          items:
            type: string
        chromeExtensionIds:
          description: >-
            List of chrome extension IDs (oficial ID from chrome store) that you
            want to add to the profiles.
          example:
            - nkbihfbeogaeaoehlefnkodbefgpgknn
          type: array
          items:
            type: string
        customExtensionIds:
          description: >-
            Gologin allows you to add custom chrome extensions (not published in
            chrome store) to the profiles.        If you want to upload your
            custome extension - you need to upload it in out
            application.         Should be empty if you dont want to add any
            custom extensions.
          example:
            - nkbihfbeogaeaoehlefnkodbefgpgknn
          type: array
          items:
            type: string
        extensionsToRemove:
          description: >-
            List of chrome extension IDs that you want to remove from the
            profiles.
          example:
            - nkbihfbeogaeaoehlefnkodbefgpgknn
          type: array
          items:
            type: string
      required:
        - profileIds
        - chromeExtensionIds
        - customExtensionIds
        - extensionsToRemove
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).