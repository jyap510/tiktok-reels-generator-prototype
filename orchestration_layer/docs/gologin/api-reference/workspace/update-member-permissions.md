> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update member permissions

> Updates a member's permissions in a workspace.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json patch /workspaces/{wid}/members/{id}
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
  /workspaces/{wid}/members/{id}:
    patch:
      tags:
        - Workspace
      summary: Update member permissions
      description: Updates a member's permissions in a workspace.
      operationId: WorkspacesMembersController_patchMember
      parameters:
        - name: wid
          required: true
          in: path
          description: Workspace ID
          schema:
            type: string
        - name: id
          required: true
          in: path
          description: Member ID
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchWorkspaceMemberValidation'
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MemberDTO'
      security:
        - bearer: []
components:
  schemas:
    PatchWorkspaceMemberValidation:
      type: object
      properties:
        limitedAccess:
          type: boolean
          description: If true, the member will have access only to a particular folder.
          example: false
        role:
          type: string
          enum:
            - owner
            - admin
            - editor
            - guest
          description: Role of the member.
        folders:
          description: >-
            Folders that the member will have access to. Need to specify only if
            limitedAccess is true.
          type: array
          items:
            $ref: '#/components/schemas/WorkspaceFolderRoleValidation'
      required:
        - limitedAccess
        - role
    MemberDTO:
      type: object
      properties:
        id:
          type: string
        email:
          type: string
        user:
          type: string
        role:
          type: object
        limitedAccess:
          type: boolean
        folders:
          type: array
          items:
            $ref: '#/components/schemas/MemberFolderDTO'
        joined:
          type: boolean
        invitedByEmail:
          type: string
        lastActiveAt:
          format: date-time
          type: string
        createdAt:
          format: date-time
          type: string
        permissions:
          $ref: '#/components/schemas/ForMemberPermissionsDTO'
        workspaceVisited:
          type: boolean
      required:
        - id
        - email
        - role
        - limitedAccess
        - createdAt
        - permissions
    WorkspaceFolderRoleValidation:
      type: object
      properties:
        name:
          type: string
        role:
          type: object
      required:
        - name
        - role
    MemberFolderDTO:
      type: object
      properties:
        name:
          type: string
        role:
          type: object
        permissions:
          $ref: '#/components/schemas/MemberFolderPermissionsDTO'
      required:
        - name
        - role
        - permissions
    ForMemberPermissionsDTO:
      type: object
      properties:
        kickMember:
          type: boolean
        manageWorkspaceWideAccess:
          type: boolean
        manageWorkspaceWideAdminAccess:
          type: boolean
        viewMember:
          type: boolean
      required:
        - kickMember
        - manageWorkspaceWideAccess
        - manageWorkspaceWideAdminAccess
        - viewMember
    MemberFolderPermissionsDTO:
      type: object
      properties:
        manageAccess:
          type: boolean
        manageAdminAccess:
          type: boolean
      required:
        - manageAccess
        - manageAdminAccess
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).