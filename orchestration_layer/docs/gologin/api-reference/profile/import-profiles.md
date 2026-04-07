> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Import profiles

> Imports profiles from CSV file.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json post /browser/browser-import
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
  /browser/browser-import:
    post:
      tags:
        - Profile
      summary: Import profiles
      description: Imports profiles from CSV file.
      operationId: BrowserController_browserImport
      parameters:
        - name: currentWorkspace
          required: false
          in: query
          schema:
            type: string
        - name: folderName
          required: false
          in: query
          description: Folder name to import profiles to.
          schema:
            type: string
      requestBody:
        required: true
        description: CSV file content as a string.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ImportProfilesBodyValidation'
      responses:
        '201':
          description: ''
      security:
        - bearer: []
components:
  schemas:
    ImportProfilesBodyValidation:
      type: object
      properties:
        dataProfiles:
          type: string
          description: CSV file content.
      required:
        - dataProfiles
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).