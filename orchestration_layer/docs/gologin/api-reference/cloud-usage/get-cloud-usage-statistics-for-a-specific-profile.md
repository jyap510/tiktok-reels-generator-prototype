> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get cloud usage statistics for a specific profile



## OpenAPI

````yaml https://docs-download.gologin.com/openapi.json get /cloud-usage/profile/{browserId}/stats
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
  /cloud-usage/profile/{browserId}/stats:
    get:
      tags:
        - cloud-usage
      summary: Get cloud usage statistics for a specific profile
      operationId: CloudUsageController_getProfileStats
      parameters:
        - name: browserId
          required: true
          in: path
          schema:
            type: string
      responses:
        '200':
          description: Returns total usage in minutes and hours

````

Built with [Mintlify](https://mintlify.com).