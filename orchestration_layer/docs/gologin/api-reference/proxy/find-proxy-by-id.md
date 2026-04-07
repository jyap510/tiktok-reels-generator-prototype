> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Find proxy by id

> Gets a proxy info by proxy id.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json get /proxy/{id}
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
  /proxy/{id}:
    get:
      tags:
        - Proxy
      summary: Find proxy by id
      description: Gets a proxy info by proxy id.
      operationId: ProxyController_getProxyById
      parameters:
        - name: id
          required: true
          in: path
          description: id of the proxy.
          schema:
            type: string
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProxyDTO'
      security:
        - bearer: []
components:
  schemas:
    ProxyDTO:
      type: object
      properties:
        _id:
          type: string
          deprecated: true
        id:
          type: string
        mode:
          type: object
        host:
          type: string
        port:
          type: number
        username:
          type: string
        password:
          type: string
        lastIp:
          type: string
        changeIpUrl:
          type: string
        profiles:
          type: array
          items:
            type: string
        profilesCount:
          type: number
        customName:
          type: string
        status:
          type: boolean
        country:
          type: string
        defaultCountry:
          type: string
        city:
          type: string
        checkDate:
          format: date-time
          type: string
        createdAt:
          format: date-time
          type: string
        timezone:
          type: string
        languages:
          type: string
        connectionType:
          type: object
        notes:
          type: string
        isRestoredByOwner:
          type: boolean
        isStatic:
          type: boolean
      required:
        - _id
        - id
        - mode
        - host
        - port
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).