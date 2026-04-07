> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create gologin high quality proxy

> Gologin provides high quality proxies out of the box. This endpoint allows you to create a proxy.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json post /users-proxies/mobile-proxy
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
  /users-proxies/mobile-proxy:
    post:
      tags:
        - Proxy
      summary: Create gologin high quality proxy
      description: >-
        Gologin provides high quality proxies out of the box. This endpoint
        allows you to create a proxy.
      operationId: UsersProxiesController_getVpnUfoProxy
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/VpnUfoProxyValidation'
      responses:
        '201':
          description: ''
      security:
        - bearer: []
components:
  schemas:
    VpnUfoProxyValidation:
      type: object
      properties:
        countryCode:
          type: string
          description: Country cod with 2 lowercase letters
          example: us
        city:
          type: string
          description: if you want a proxy in a specific city you can specify it here.
          example: New York
        profileIdToLink:
          type: string
          description: >-
            Put here profile id if you want to add this proxy to profiles after
            creation.
          example: 60a763f86501b3aa69a5e5e5
        isMobile:
          type: boolean
          description: >-
            Gologin has 3 type of proxies: mobile, datacenter and residential.
            This parameter means that you want to get a mobile proxy.
          example: mobile
        isDC:
          type: boolean
          description: Is DC means that you want to get a datacenter proxy.
          example: 'true'
        customName:
          type: string
          description: Custom name for proxy for proxy management.
          example: My proxy
      required:
        - countryCode
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).