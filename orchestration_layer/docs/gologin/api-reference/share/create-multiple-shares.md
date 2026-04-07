> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create multiple shares

> Shares multiple profiles with a user.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json post /share/multi
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
  /share/multi:
    post:
      tags:
        - Share
      summary: Create multiple shares
      description: Shares multiple profiles with a user.
      operationId: ShareController_shareMultipleProfiles
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ICreateShareBrowser'
      responses:
        '201':
          description: ''
      security:
        - bearer: []
components:
  schemas:
    ICreateShareBrowser:
      type: object
      properties:
        type:
          type: string
          enum:
            - profile
            - folder
          description: >-
            Type of the instance you want to share. You can share particular
            profiles or group of profiles as a folder.
          example: profile
        instanceIds:
          description: IDs of the instances that should be shared.
          example:
            - 60a763f86501b32b88a109ca
            - 60a763f86501b32b88a109cb
          type: array
          items:
            type: string
        role:
          type: string
          enum:
            - administrator
            - redactor
            - guest
          description: Role of the recipient
          example: admin
        recepients:
          description: Array of emails of the recipients.
          example:
            - recipient1@example.com
            - recipient2@example.com
          type: array
          items:
            type: string
      required:
        - type
        - instanceIds
        - recepients
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).