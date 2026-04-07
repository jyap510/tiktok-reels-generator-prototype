> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Create workspace

> Creates a new workspace.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json post /workspaces
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
  /workspaces:
    post:
      tags:
        - Workspace
      summary: Create workspace
      description: Creates a new workspace.
      operationId: WorkspacesController_createWorkspace
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateWorkspaceValidation'
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ShortWorkspaceDTO'
      security:
        - bearer: []
components:
  schemas:
    CreateWorkspaceValidation:
      type: object
      properties:
        name:
          type: string
          description: Name of the workspace.
          example: My Workspace
        os:
          type: string
          enum:
            - lin
            - mac
            - win
            - android
            - android-cloud
          description: >-
            Gologin will create starting profiles with creating a
            workspace.       If you want to create a workspace with a specific
            OS, you can specify it here.
          example: win
        osSpec:
          type: string
          enum:
            - M1
            - M2
            - M3
            - M4
            - M5
            - win11
            - ''
          description: >-
            Here you can specify OS specification. For example chip version for
            macos or version of windows.
          example: win11
    ShortWorkspaceDTO:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        owner:
          type: string
        planId:
          type: string
        planName:
          type: string
        paymentMethod:
          type: string
        planMembersMax:
          type: number
        isPlanUnlimited:
          type: boolean
        planExpiresAt:
          format: date-time
          type: string
        paymentIsTrial:
          type: boolean
        isUnpaid:
          type: boolean
        memberCount:
          type: number
        profilesCount:
          type: number
        planProfilesMax:
          type: number
        permissions:
          $ref: '#/components/schemas/ShortWorkspacePermissionsDTO'
      required:
        - id
        - name
        - owner
        - planId
        - planName
        - paymentMethod
        - planMembersMax
        - isPlanUnlimited
        - planExpiresAt
        - paymentIsTrial
        - isUnpaid
        - memberCount
        - profilesCount
        - planProfilesMax
        - permissions
    ShortWorkspacePermissionsDTO:
      type: object
      properties:
        canAddBilling:
          type: boolean
        canClaimProfilesWithoutFolder:
          type: boolean
      required:
        - canAddBilling
        - canClaimProfilesWithoutFolder
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).