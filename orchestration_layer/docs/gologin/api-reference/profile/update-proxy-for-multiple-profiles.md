> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update proxy for multiple profiles

> Updates the proxy for multiple profiles.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json patch /browser/proxy/many/v2
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
  /browser/proxy/many/v2:
    patch:
      tags:
        - Profile
      summary: Update proxy for multiple profiles
      description: Updates the proxy for multiple profiles.
      operationId: BrowserController_updateProfileProxyMany
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchProxyManyV2Validation'
      responses:
        '204':
          description: ''
      security:
        - bearer: []
components:
  schemas:
    PatchProxyManyV2Validation:
      type: object
      properties:
        proxies:
          description: List of profiles with their proxies.
          type: array
          items:
            $ref: '#/components/schemas/ProfileProxy'
      required:
        - proxies
    ProfileProxy:
      type: object
      properties:
        profileId:
          type: string
          example: 6200f55e7685342e170dc531
          description: Profile ID to update.
        proxy:
          description: Proxy parameters that you want to update.
          allOf:
            - $ref: '#/components/schemas/BrowserProxyCreateValidation'
      required:
        - profileId
        - proxy
    BrowserProxyCreateValidation:
      type: object
      properties:
        id:
          type: string
          description: >-
            You can specify particular proxy by its id or leave it empty to use
            default proxy.
          example: 6201422450e3b9cd602f24e1
        mode:
          type: string
          enum:
            - http
            - socks4
            - socks5
            - possh
            - geolocation
            - none
            - gologin
            - tor
          description: Proxy mode represent the protocolo of the connection to the proxy.
          example: http
        host:
          type: string
          description: Proxy host. It could be ip address or domain name.
          example: 127.0.0.1
        port:
          type: number
          description: Proxy port.
          example: 80
        username:
          type: string
          description: Proxy username.
          example: user
        password:
          type: string
          description: Proxy password if proxy requires authentication.
          example: password
        changeIpUrl:
          type: string
          description: >-
            This allows you to change IP address of the proxy if your proxy
            provider supports it.
          example: https://some-proxy-provider.com/change-ip
        customName:
          type: string
          description: >-
            As proxy is separate entity in gologin, you can set custom name for
            it to identify it in the list of proxies.
          example: My Proxy
      required:
        - mode
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).