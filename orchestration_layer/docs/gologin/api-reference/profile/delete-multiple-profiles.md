> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete multiple profiles

> Deletes multiple profiles by ids.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json delete /browser
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
  /browser:
    delete:
      tags:
        - Profile
      summary: Delete multiple profiles
      description: Deletes multiple profiles by ids.
      operationId: BrowserController_deleteMultipleBrowsers
      parameters: []
      requestBody:
        required: true
        description: You need to pass an array of profile ids.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/IDeleleMultipleBrowsersDTO'
      responses:
        '204':
          description: ''
      security:
        - bearer: []
components:
  schemas:
    IDeleleMultipleBrowsersDTO:
      type: object
      properties:
        profilesToDelete:
          description: Array of profile IDs that you want to delete.
          example:
            - 6200f55e7685342e170dc531
          type: array
          items:
            type: string
      required:
        - profilesToDelete
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).