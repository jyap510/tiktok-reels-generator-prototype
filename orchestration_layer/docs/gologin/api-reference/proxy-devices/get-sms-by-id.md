> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get SMS by ID



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json get /proxy-devices/sms/{smsId}
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
  /proxy-devices/sms/{smsId}:
    get:
      tags:
        - Proxy Devices
      summary: Get SMS by ID
      operationId: ProxyDevicesController_getSmsById
      parameters:
        - name: smsId
          required: true
          in: path
          description: SMS ID
          schema:
            type: string
      responses:
        '200':
          description: SMS retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProxyDeviceSmsResponseDto'
      security:
        - bearer: []
components:
  schemas:
    ProxyDeviceSmsResponseDto:
      type: object
      properties:
        id:
          type: string
          description: Unique identifier of the SMS
        message:
          type: string
          description: SMS message content
        deviceId:
          type: string
          description: Proxy device ID
        phoneNumber:
          type: string
          description: Phone number that received the SMS
        receiveDate:
          format: date-time
          type: string
          description: Date when the SMS was received
        deliveredAt:
          format: date-time
          type: string
          description: Date when SMS was delivered
        createdAt:
          format: date-time
          type: string
          description: Date when the SMS was created
        updatedAt:
          format: date-time
          type: string
          description: Date when the SMS was last updated
      required:
        - id
        - message
        - deviceId
        - createdAt
        - updatedAt
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).