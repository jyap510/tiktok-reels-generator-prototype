> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a new proxy device



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json post /proxy-devices
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
  /proxy-devices:
    post:
      tags:
        - Proxy Devices
      summary: Create a new proxy device
      operationId: ProxyDevicesController_createDevice
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateProxyDeviceValidation'
      responses:
        '201':
          description: Proxy device created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProxyDeviceResponseDto'
      security:
        - bearer: []
components:
  schemas:
    CreateProxyDeviceValidation:
      type: object
      properties:
        name:
          type: string
          description: Device name
        model:
          type: string
          description: Device model
        ip:
          type: string
          description: Device IP address
        deviceId:
          type: string
          description: Unique device identifier
        country:
          type: string
          description: Country code (2-letter) or country name
        proxyStatus:
          type: string
          description: Proxy status
          enum:
            - active
            - inactive
        smsStatus:
          type: string
          description: SMS status
          enum:
            - active
            - inactive
      required:
        - name
        - model
        - ip
        - deviceId
        - country
    ProxyDeviceResponseDto:
      type: object
      properties:
        id:
          type: string
          description: Unique identifier of the proxy device
        name:
          type: string
          description: Name of the proxy device
        model:
          type: string
          description: Model of the proxy device
        ip:
          type: string
          description: IP address of the proxy device
        country:
          type: string
          description: Country code of the proxy device
        proxyStatus:
          type: string
          description: Proxy status
          enum:
            - active
            - inactive
        smsStatus:
          type: string
          description: SMS status
          enum:
            - active
            - inactive
        createdAt:
          format: date-time
          type: string
          description: Date when the device was created
        updatedAt:
          format: date-time
          type: string
          description: Date when the device was last updated
        deviceId:
          type: string
          description: Unique device identifier
      required:
        - id
        - name
        - model
        - ip
        - country
        - proxyStatus
        - smsStatus
        - createdAt
        - updatedAt
        - deviceId
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).