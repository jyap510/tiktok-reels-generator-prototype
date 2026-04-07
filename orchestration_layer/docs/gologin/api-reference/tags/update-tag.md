> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update tag



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json post /tags/{id}
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
  /tags/{id}:
    post:
      tags:
        - Tags
      summary: Update tag
      operationId: TagsController_updateTag
      parameters:
        - name: id
          required: true
          in: path
          description: Id of the profile.
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PostTagDto'
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
    PostTagDto:
      type: object
      properties:
        title:
          type: string
        color:
          allOf:
            - $ref: '#/components/schemas/TagColor'
        field:
          type: string
          default: tags
          enum:
            - tags
            - custom-status
        workspace:
          type: string
          description: >-
            Workspace ID. Dont add this field if you want to add tag to your
            default workspace.
      required:
        - title
        - color
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
    TagColor:
      type: string
      enum:
        - pink
        - yellow
        - green
        - blue
        - lightgrey
        - peach
        - lime
        - turquoise
        - lilac
        - grey
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).