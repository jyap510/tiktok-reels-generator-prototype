> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Update cookies for profile

> Browser will import it next time you run it



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json post /browser/{id}/cookies
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
  /browser/{id}/cookies:
    post:
      tags:
        - Profile
      summary: Update cookies for profile
      description: Browser will import it next time you run it
      operationId: BrowserController_postBrowserCookies
      parameters:
        - name: id
          required: true
          in: path
          description: Id of the profile.
          schema:
            type: string
        - name: fromUser
          required: false
          in: query
          description: >-
            Should be true if you want browser to import it when you run it next
            time.
          schema:
            type: boolean
        - name: cleanCookies
          required: false
          in: query
          description: >-
            Should be true if you want browser to erase all cookies before
            importing new ones.
          schema:
            type: boolean
      requestBody:
        required: true
        description: List of cookies to add to profile.
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/PostCookiesDTO'
      responses:
        '204':
          description: ''
      security:
        - bearer: []
components:
  schemas:
    PostCookiesDTO:
      type: object
      properties:
        url:
          type: string
        name:
          type: string
        value:
          type: object
        domain:
          type: string
        path:
          type: string
          default: false
        session:
          type: boolean
          default: false
        hostOnly:
          type: boolean
          default: false
        secure:
          type: boolean
          default: false
        httpOnly:
          type: boolean
          default: false
        sameSite:
          type: string
          enum:
            - no_restriction
            - lax
            - strict
            - unspecified
        expirationDate:
          type: number
        creationDate:
          type: number
      required:
        - url
        - name
  securitySchemes:
    bearer:
      scheme: bearer
      bearerFormat: JWT
      type: http

````

Built with [Mintlify](https://mintlify.com).