> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update bookmarks for multiple profiles

> Updates the bookmarks for multiple profiles.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json patch /browser/bookmarks/many
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
  /browser/bookmarks/many:
    patch:
      tags:
        - Profile
      summary: Update bookmarks for multiple profiles
      description: Updates the bookmarks for multiple profiles.
      operationId: BrowserController_updateProfileBookmarksMany
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatchBookmarksManyValidation'
      responses:
        '204':
          description: ''
      security:
        - bearer: []
components:
  schemas:
    PatchBookmarksManyValidation:
      type: object
      properties:
        profileIds:
          description: List of profile IDs to update.
          example:
            - 6200f55e7685342e170dc531
          type: array
          items:
            type: string
        bookmarks:
          description: Bookmarks parameters that you want to update.
          allOf:
            - $ref: '#/components/schemas/Bookmarks'
      required:
        - profileIds
        - bookmarks
    Bookmarks:
      type: object
      properties:
        bookmark_bar:
          $ref: '#/components/schemas/BookmarkFolder'
        other:
          $ref: '#/components/schemas/BookmarkFolder'
        synced:
          $ref: '#/components/schemas/BookmarkFolder'
      required:
        - bookmark_bar
        - other
        - synced
    BookmarkFolder:
      type: object
      properties:
        children:
          type: array
          items:
            $ref: '#/components/schemas/SiteBookmark'
        name:
          type: string
        type:
          type: string
      required:
        - children
        - name
        - type
    SiteBookmark:
      type: object
      properties:
        name:
          type: string
          description: Bookmark name.
        type:
          type: string
          description: Type of bookmark item, usually "url".
          example: url
        url:
          type: string
          description: Bookmark URL.
          example: https://www.google.com
      required:
        - name
        - type
        - url
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).