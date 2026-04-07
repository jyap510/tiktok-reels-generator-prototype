> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete tag



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json delete /tags/{tagId}
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
  /tags/{tagId}:
    delete:
      tags:
        - Tags
      summary: Delete tag
      operationId: TagsController_deleteTag
      parameters:
        - name: tagId
          required: true
          in: path
          schema:
            type: string
      responses:
        '204':
          description: ''
      security:
        - bearer: []
components:
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).