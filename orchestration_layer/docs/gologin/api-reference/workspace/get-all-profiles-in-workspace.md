> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get all profiles in workspace

> Gets all profiles in a workspace.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json get /workspaces/{wid}/profiles
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
  /workspaces/{wid}/profiles:
    get:
      tags:
        - Workspace
      summary: Get all profiles in workspace
      description: Gets all profiles in a workspace.
      operationId: WorkspacesController_getProfiles
      parameters:
        - name: cf-ipcountry
          required: true
          in: header
          schema:
            type: string
        - name: wid
          required: true
          in: path
          description: Workspace ID
          schema:
            type: string
        - name: search
          required: false
          in: query
          description: Will return all profiles which names match the search query.
          schema:
            type: string
        - name: folder
          required: false
          in: query
          description: Will return all profiles in particular folder.
          schema:
            type: string
        - name: folderId
          required: false
          in: query
          description: Will return all profiles in particular folder.
          schema:
            type: string
        - name: page
          required: false
          in: query
          description: >-
            Maximum number of profiles per page is 30. So if you want to get
            more profiles, you need to increment this value.
          schema:
            default: 1
            type: number
        - name: sortField
          required: false
          in: query
          description: Will sort the result by the selected field.
          schema:
            default: createdAt
            enum:
              - lastActivity
              - proxyType
              - updatedAt
              - createdAt
              - sharedEmails
              - name
              - os
              - order
            type: string
        - name: sortOrder
          required: false
          in: query
          description: Will sort the result by the selected order.
          schema:
            default: descend
            enum:
              - ascend
              - descend
            type: string
        - name: tag
          required: false
          in: query
          description: Will return all profiles with the selected tag.
          schema:
            type: string
        - name: offset
          required: false
          in: query
          description: >-
            Maximum number of profiles per page is 30. So if you want to get
            more profiles, you need to increment this value.
          schema:
            default: 1
            type: number
        - name: isAndroidCloud
          required: false
          in: query
          description: To get Android cloud profiles.
          schema:
            type: string
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProfileListDTO'
      security:
        - bearer: []
components:
  schemas:
    ProfileListDTO:
      type: object
      properties:
        profiles:
          type: array
          items:
            $ref: '#/components/schemas/ProfileDTO'
        total:
          type: number
        isFolderDeleted:
          type: boolean
        currentOrbitaMajorV:
          type: string
        currentBrowserV:
          type: string
        currentTestBrowserV:
          type: string
        currentTestOrbitaMajorV:
          type: string
        isMoreProfilesAvailable:
          type: boolean
        groupsMetadata:
          type: array
          items:
            type: string
      required:
        - profiles
        - total
    ProfileDTO:
      type: object
      properties:
        name:
          type: string
        id:
          type: string
        role:
          type: string
        notes:
          type: string
        browserType:
          type: string
        lockEnabled:
          type: boolean
        timezone:
          type: object
        navigator:
          type: object
        geolocation:
          type: object
        debugMode:
          type: boolean
        canBeRunning:
          type: boolean
        isRunDisabled:
          type: boolean
        runDisabledReason:
          type: string
          enum:
            - unpaid-share
        isWeb:
          type: boolean
        os:
          type: string
        osSpec:
          type: string
        isM1:
          type: boolean
        proxy:
          type: object
        archivedProxy:
          $ref: '#/components/schemas/BrowserArchivedProxyDTO'
        proxyType:
          type: string
        proxyRegion:
          type: string
        status:
          type: object
        folders:
          type: array
          items:
            type: string
        folderIds:
          type: array
          items:
            type: string
        sharedEmails:
          type: array
          items:
            type: string
        isPinned:
          type: boolean
        updateUALastChosenBrowserV:
          type: string
        createdAt:
          type: string
          description: Date string
        updatedAt:
          type: string
          description: Date string
        lastActivity:
          type: string
          description: Date string
        permissions:
          $ref: '#/components/schemas/ProfilePermissionsDTO'
        tags:
          type: array
          items:
            type: string
        shareId:
          type: string
        isShared:
          type: boolean
        sharesCount:
          type: number
        proxyEnabled:
          type: boolean
        isDisabled:
          type: boolean
        isAutoGenerated:
          type: boolean
        isBookmarksSynced:
          type: boolean
        defaultProps:
          $ref: '#/components/schemas/IDefaultProfilePropsDTO'
        autoLang:
          type: boolean
        remoteOrbitaUrl:
          type: string
        bookmarks:
          type: object
        chromeExtensions:
          type: array
          items:
            type: string
        userChromeExtensions:
          type: array
          items:
            type: string
        facebookAccountData:
          $ref: '#/components/schemas/ParsedFacebookDataDTO'
        order:
          type: number
      required:
        - name
        - id
        - role
        - notes
        - browserType
        - lockEnabled
        - timezone
        - navigator
        - geolocation
        - canBeRunning
        - os
        - proxy
        - archivedProxy
        - proxyType
        - proxyRegion
        - sharedEmails
        - createdAt
        - updatedAt
        - lastActivity
        - permissions
    BrowserArchivedProxyDTO:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        country:
          type: string
      required:
        - id
    ProfilePermissionsDTO:
      type: object
      properties:
        transferProfile:
          type: boolean
        transferToMyWorkspace:
          type: boolean
        shareProfile:
          type: boolean
        manageFolders:
          type: boolean
        editProfile:
          type: boolean
        deleteProfile:
          type: boolean
        cloneProfile:
          type: boolean
        exportProfile:
          type: boolean
        updateUA:
          type: boolean
        addVpnUfoProxy:
          type: boolean
        runProfile:
          type: boolean
        runProfileWeb:
          type: boolean
        viewProfile:
          type: boolean
        addProfileTag:
          type: boolean
        removeProfileTag:
          type: boolean
        viewShareLinks:
          type: boolean
        createShareLinks:
          type: boolean
        updateShareLinks:
          type: boolean
        deleteShareLinks:
          type: boolean
        viewCustomExtensions:
          type: boolean
      required:
        - transferProfile
        - transferToMyWorkspace
        - shareProfile
        - manageFolders
        - editProfile
        - deleteProfile
        - cloneProfile
        - exportProfile
        - updateUA
        - addVpnUfoProxy
        - runProfile
        - runProfileWeb
        - viewProfile
        - addProfileTag
        - removeProfileTag
        - viewShareLinks
        - createShareLinks
        - updateShareLinks
        - deleteShareLinks
        - viewCustomExtensions
    IDefaultProfilePropsDTO:
      type: object
      properties:
        profileNameIsDefault:
          type: boolean
        profileNotesIsDefault:
          type: boolean
      required:
        - profileNameIsDefault
        - profileNotesIsDefault
    ParsedFacebookDataDTO:
      type: object
      properties:
        date:
          type: string
        token:
          type: string
        fbIdAccount:
          type: string
        email:
          type: string
        password:
          type: string
        googleDriveUrl:
          type: string
        fb2faToolUrl:
          type: string
        fbUrl:
          type: string
        uaVersion:
          type: string
        cookies:
          type: string
        notParsedData:
          type: array
          items:
            type: string
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).