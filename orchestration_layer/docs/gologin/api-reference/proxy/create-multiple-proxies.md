> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create multiple proxies

> Adds multiple proxies.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json post /proxy/add_proxies
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
  /proxy/add_proxies:
    post:
      tags:
        - Proxy
      summary: Create multiple proxies
      description: Adds multiple proxies.
      operationId: ProxyController_addProxies
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateProxiesValidation'
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ProxyDTO'
      security:
        - bearer: []
components:
  schemas:
    CreateProxiesValidation:
      type: object
      properties:
        proxies:
          type: array
          items:
            $ref: '#/components/schemas/CreateProxyValidation'
        workspaceId:
          type: string
      required:
        - proxies
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
    CreateProxyValidation:
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
        notes:
          type: string
          description: Parameter for proxy management.
      required:
        - mode
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).