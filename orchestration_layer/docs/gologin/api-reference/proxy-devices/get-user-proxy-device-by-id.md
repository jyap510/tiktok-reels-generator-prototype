> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get user proxy device by ID



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json get /proxy-devices/{deviceId}
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
  /proxy-devices/{deviceId}:
    get:
      tags:
        - Proxy Devices
      summary: Get user proxy device by ID
      operationId: ProxyDevicesController_getDevice
      parameters:
        - name: deviceId
          required: true
          in: path
          schema:
            type: string
        - name: id
          required: true
          in: path
          description: Proxy device ID
          schema: {}
      responses:
        '200':
          description: User proxy device retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProxyDeviceResponseDto'
      security:
        - bearer: []
components:
  schemas:
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