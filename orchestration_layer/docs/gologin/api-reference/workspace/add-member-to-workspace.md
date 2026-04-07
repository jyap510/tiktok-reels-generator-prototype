> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Add member to workspace

> This endpoint allows you to invite a member to a workspace by email. Recipient will receive an email with a link to join the workspace.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json post /workspaces/{wid}/members
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
  /workspaces/{wid}/members:
    post:
      tags:
        - Workspace
      summary: Add member to workspace
      description: >-
        This endpoint allows you to invite a member to a workspace by email.
        Recipient will receive an email with a link to join the workspace.
      operationId: WorkspacesMembersController_inviteMember
      parameters:
        - name: wid
          required: true
          in: path
          description: Workspace ID
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateWorkspaceMemberValidation'
      responses:
        '201':
          description: ''
      security:
        - bearer: []
components:
  schemas:
    CreateWorkspaceMemberValidation:
      type: object
      properties:
        emails:
          type: array
          items:
            type: string
        limitedAccess:
          type: boolean
        role:
          type: string
          enum:
            - owner
            - admin
            - editor
            - guest
        folders:
          type: array
          items:
            $ref: '#/components/schemas/WorkspaceFolderRoleValidation'
        workspaceName:
          type: string
      required:
        - emails
        - limitedAccess
        - role
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
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).