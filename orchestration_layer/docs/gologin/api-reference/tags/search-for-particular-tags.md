> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Search for particular tags



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json get /tags/search
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
  /tags/search:
    get:
      tags:
        - Tags
      summary: Search for particular tags
      operationId: TagsController_searchTag[0]
      parameters:
        - name: q
          required: true
          in: query
          description: Search query
          schema:
            type: string
        - name: workspace
          required: false
          in: query
          description: Workspace ID
          schema:
            type: string
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TagsListDTO'
      security:
        - bearer: []
components:
  schemas:
    TagsListDTO:
      type: object
      properties:
        success:
          type: boolean
        tags:
          type: array
          items:
            type: string
      required:
        - success
        - tags
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).