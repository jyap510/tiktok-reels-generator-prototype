> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get workspace info

> Gets all information about a workspace by ID.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json get /workspaces/{wid}
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
  /workspaces/{wid}:
    get:
      tags:
        - Workspace
      summary: Get workspace info
      description: Gets all information about a workspace by ID.
      operationId: WorkspacesController_getWorkspace
      parameters:
        - name: wid
          required: true
          in: path
          description: Workspace ID
          schema:
            type: string
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FullWorkspaceDTO'
      security:
        - bearer: []
components:
  schemas:
    FullWorkspaceDTO:
      type: object
      properties:
        id:
          type: string
        owner:
          type: string
        name:
          type: string
        folders:
          type: array
          items:
            $ref: '#/components/schemas/WorkspaceFolderDTO'
        allProfilesFolderId:
          type: string
        members:
          type: array
          items:
            $ref: '#/components/schemas/MemberDTO'
        planId:
          type: string
        planName:
          type: string
        planMembersMax:
          type: number
        profilesCount:
          type: number
        planProfilesMax:
          type: number
        planSharesMax:
          type: number
        planExpiresAt:
          format: date-time
          type: string
        paymentMethod:
          type: string
        paymentDiscount:
          type: string
        paymentIsTrial:
          type: boolean
        permissions:
          $ref: '#/components/schemas/GlobalPermissionsDTO'
        activeSharesCount:
          type: number
        isUnpaid:
          type: boolean
        isPlanUnlimited:
          type: boolean
        limits:
          $ref: '#/components/schemas/LimitsDto'
      required:
        - id
        - owner
        - name
        - folders
        - members
        - planId
        - planName
        - planMembersMax
        - profilesCount
        - planProfilesMax
        - planSharesMax
        - planExpiresAt
        - paymentMethod
        - paymentDiscount
        - paymentIsTrial
        - permissions
        - activeSharesCount
        - isUnpaid
        - isPlanUnlimited
        - limits
    WorkspaceFolderDTO:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        permissions:
          $ref: '#/components/schemas/FolderPermissionsDTO'
        order:
          type: number
        associatedProfiles:
          type: array
          items:
            type: string
        isAllProfiles:
          type: boolean
      required:
        - id
        - name
        - permissions
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
    GlobalPermissionsDTO:
      type: object
      properties:
        editWorkspace:
          type: boolean
        downgradeWorkspacePlan:
          type: boolean
        canClaimProfilesWithoutFolder:
          type: boolean
        updateUAToAllProfiles:
          type: boolean
        viewWorkspaceHistory:
          type: boolean
        createFolder:
          type: boolean
        renameFolder:
          type: boolean
        deleteFolder:
          type: boolean
        inviteMembers:
          type: boolean
        globallyManageMembers:
          type: boolean
        globallyManageAdminMembers:
          type: boolean
        viewDeletedProfiles:
          type: boolean
        restoreProfile:
          type: boolean
        importProfile:
          type: boolean
        multipleCreateProfiles:
          type: boolean
        dropProfiles:
          type: boolean
        viewAllMembers:
          type: boolean
        pinProfileWithoutFolders:
          type: boolean
        manageGeolocationProxies:
          type: boolean
        manageUserProxies:
          type: boolean
        addTags:
          type: boolean
        removeTags:
          type: boolean
        editTags:
          type: boolean
      required:
        - editWorkspace
        - downgradeWorkspacePlan
        - canClaimProfilesWithoutFolder
        - updateUAToAllProfiles
        - viewWorkspaceHistory
        - createFolder
        - renameFolder
        - deleteFolder
        - inviteMembers
        - globallyManageMembers
        - globallyManageAdminMembers
        - viewDeletedProfiles
        - restoreProfile
        - importProfile
        - multipleCreateProfiles
        - dropProfiles
        - viewAllMembers
        - pinProfileWithoutFolders
        - manageGeolocationProxies
        - manageUserProxies
        - addTags
        - removeTags
        - editTags
    LimitsDto:
      type: object
      properties:
        maxMembers:
          type: number
        maxProfiles:
          type: number
        maxProfileShares:
          type: number
        maxParallelCloudLaunches:
          type: number
      required:
        - maxMembers
        - maxProfiles
        - maxProfileShares
        - maxParallelCloudLaunches
    FolderPermissionsDTO:
      type: object
      properties:
        manageMember:
          type: boolean
        manageAdminMember:
          type: boolean
        share:
          type: boolean
        canClaimProfiles:
          type: boolean
        addProfile:
          type: boolean
        importProfile:
          type: boolean
        multipleCreateProfiles:
          type: boolean
        dropProfiles:
          type: boolean
        removeProfile:
          type: boolean
        pinProfile:
          type: boolean
        reorderProfiles:
          type: boolean
        viewFolder:
          type: boolean
      required:
        - manageMember
        - manageAdminMember
        - share
        - canClaimProfiles
        - addProfile
        - importProfile
        - multipleCreateProfiles
        - dropProfiles
        - removeProfile
        - pinProfile
        - reorderProfiles
        - viewFolder
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