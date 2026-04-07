> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get SMS messages for proxy device



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json get /proxy-devices/{deviceId}/sms
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
  /proxy-devices/{deviceId}/sms:
    get:
      tags:
        - Proxy Devices
      summary: Get SMS messages for proxy device
      operationId: ProxyDevicesController_getSmsByDevice
      parameters:
        - name: deviceId
          required: true
          in: path
          schema:
            type: string
        - name: page
          required: false
          in: query
          description: Page number (1-based)
          schema:
            minimum: 1
            default: 1
            example: 1
            type: number
        - name: limit
          required: false
          in: query
          description: Number of items per page
          schema:
            minimum: 1
            maximum: 100
            default: 10
            example: 10
            type: number
        - name: id
          required: true
          in: path
          description: Proxy device ID
          schema: {}
      responses:
        '200':
          description: List of SMS messages retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedSmsResponseDto'
      security:
        - bearer: []
components:
  schemas:
    PaginatedSmsResponseDto:
      type: object
      properties:
        sms:
          description: List of SMS messages
          type: array
          items:
            $ref: '#/components/schemas/ProxyDeviceSmsResponseDto'
        pagination:
          description: Pagination metadata
          allOf:
            - $ref: '#/components/schemas/PaginationMetaDto'
      required:
        - sms
        - pagination
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
    PaginationMetaDto:
      type: object
      properties:
        page:
          type: number
          description: Current page number
        limit:
          type: number
          description: Number of items per page
        total:
          type: number
          description: Total number of items
        totalPages:
          type: number
          description: Total number of pages
        hasNext:
          type: boolean
          description: Whether there is a next page
        hasPrev:
          type: boolean
          description: Whether there is a previous page
      required:
        - page
        - limit
        - total
        - totalPages
        - hasNext
        - hasPrev
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).