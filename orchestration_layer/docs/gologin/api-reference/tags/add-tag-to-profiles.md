> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Add tag to profiles



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json post /tags/addToProfiles
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
  /tags/addToProfiles:
    post:
      tags:
        - Tags
      summary: Add tag to profiles
      operationId: TagsController_addToProfiles[0]
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AddTagToProfilesDto'
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NewTagDTO'
      security:
        - bearer: []
components:
  schemas:
    AddTagToProfilesDto:
      type: object
      properties:
        title:
          type: string
        color:
          type: string
        field:
          type: string
          default: tags
          enum:
            - tags
            - custom-status
        browserIds:
          type: array
          items:
            type: string
        workspace:
          type: string
      required:
        - title
        - color
        - browserIds
    NewTagDTO:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        color:
          type: string
        field:
          type: object
        success:
          type: boolean
        isNewAdded:
          type: boolean
      required:
        - id
        - title
        - color
        - field
        - success
        - isNewAdded
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).