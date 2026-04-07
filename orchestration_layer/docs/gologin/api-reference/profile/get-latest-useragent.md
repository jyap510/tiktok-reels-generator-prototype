> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get latest useragent

> Get latest useragent. You can use this information to create a new profile.



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json get /browser/latest-useragent
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
  /browser/latest-useragent:
    get:
      tags:
        - Profile
      summary: Get latest useragent
      description: >-
        Get latest useragent. You can use this information to create a new
        profile.
      operationId: BrowserController_getLatestUseragent
      parameters:
        - name: os
          required: true
          in: query
          description: Operating system for which to get the latest user agent
          schema:
            example: win
            enum:
              - lin
              - mac
              - win
              - android
              - android-cloud
            type: string
      responses:
        '200':
          description: ''
      security:
        - bearer: []
components:
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).