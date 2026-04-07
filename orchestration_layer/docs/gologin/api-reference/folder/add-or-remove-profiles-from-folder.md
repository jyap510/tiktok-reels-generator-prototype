> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Add or remove profiles from folder

> Add or remove profiles from folder.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json patch /folders/folder
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
  /folders/folder:
    patch:
      tags:
        - Folder
      summary: Add or remove profiles from folder
      description: Add or remove profiles from folder.
      operationId: OldFoldersController_patchFolder
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchFolderValidation'
      responses:
        '200':
          description: ''
      security:
        - bearer: []
components:
  schemas:
    PatchFolderValidation:
      type: object
      properties:
        name:
          type: string
          description: Name of the folder.
          example: My Folder
        profiles:
          description: List of profile IDs that you want to add or remove from the folder.
          example:
            - 60a763f86501b3aa69a5e5e5
            - 60a763f86501b3aa69a5e5e6
          type: array
          items:
            type: string
        action:
          type: string
          description: Action to perform with the profiles.
          enum:
            - add
            - remove
          example: add
      required:
        - name
        - profiles
        - action
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).