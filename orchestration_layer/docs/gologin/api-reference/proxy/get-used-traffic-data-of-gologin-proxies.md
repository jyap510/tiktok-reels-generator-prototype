> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get used traffic data of gologin proxies

> Gets the traffic left for the user for Gologin high quality proxies



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json get /users-proxies/geolocation/traffic
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
  /users-proxies/geolocation/traffic:
    get:
      tags:
        - Proxy
      summary: Get used traffic data of gologin proxies
      description: Gets the traffic left for the user for Gologin high quality proxies
      operationId: UsersGeolocationProxiesController_getTrafficLeft
      parameters: []
      responses:
        '200':
          description: ''

````

Built with [Mintlify](https://mintlify.com).