> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update multiple profiles names

> Updates the names of multiple profiles.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json patch /browser/name/many
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
  /browser/name/many:
    patch:
      tags:
        - Profile
      summary: Update multiple profiles names
      description: Updates the names of multiple profiles.
      operationId: BrowserController_patchBrowserNameMany
      parameters: []
      requestBody:
        required: true
        description: Array of objects with profileId and new name.
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/PatchNameManyValidation'
      responses:
        '200':
          description: ''
      security:
        - bearer: []
        - bearer: []
components:
  schemas:
    PatchNameManyValidation:
      type: object
      properties:
        profileId:
          type: string
          description: Profile ID that you want to update.
          example: 6200f55e7685342e170dc531
        name:
          type: string
          description: Profile name.
          example: My Test Profile
      required:
        - profileId
        - name
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).