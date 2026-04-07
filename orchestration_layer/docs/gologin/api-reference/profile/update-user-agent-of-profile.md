> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update user agent of profile

> Updates the user agent of profile to the new browser version.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json patch /browser/update_ua_to_new_browser_v
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
  /browser/update_ua_to_new_browser_v:
    patch:
      tags:
        - Profile
      summary: Update user agent of profile
      description: Updates the user agent of profile to the new browser version.
      operationId: BrowserController_updateUaToNewBrowserV
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
              $ref: '#/components/schemas/PatchUaToNewBrowserVValidation'
      responses:
        '200':
          description: ''
      security:
        - bearer: []
components:
  schemas:
    PatchUaToNewBrowserVValidation:
      type: object
      properties:
        updateUaToNewBrowserV:
          type: boolean
          description: Should be always true.
          example: true
        updateAllProfiles:
          type: boolean
          description: If true - updates all profiles that belongs to user.
          example: true
        browserIds:
          description: Profile IDs that you want to update.
          example:
            - 6200f55e7685342e170dc531
          type: array
          items:
            type: string
      required:
        - browserIds
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).