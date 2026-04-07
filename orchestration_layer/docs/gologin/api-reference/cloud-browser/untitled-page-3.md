> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Using Proxies with Cloud Browser

Gologin Cloud Browser supports flexible proxy configuration for routing your browser session traffic. You can use Gologin's built-in residential proxies or bring your own.

## How proxies work in Gologin

Unlike session-based proxy configuration, **proxies in Gologin are attached to profiles** — not to individual connections.

When you connect to a Cloud Browser session with a profile ID, the proxy configured on that profile is applied automatically:

```text  theme={null}
https://cloudbrowser.gologin.com/connect?token=${token}&profile=${profileId}
```

This means you configure the proxy once (via the REST API or dashboard) and every session using that profile will route through it consistently — no need to pass proxy credentials on each connection.

> If the profile's proxy is unreachable at session start, the connection will fail with a proxy timeout error. Verify your proxy is working before running automation.

## Proxy options

### Gologin built-in proxies

Gologin provides its own residential proxy network with geolocation control. Built-in proxies are the simplest option — no external proxy provider needed.

To attach a Gologin proxy to a profile, use the [Proxies API](https://gologin.com/docs/api-reference/proxy/) to create a proxy and assign it to the profile.

Built-in proxies support geolocation targeting by country and region. When creating a proxy, set `autoProxyRegion` to the desired country code:

```json  theme={null}
{
  "mode": "geolocation",
  "autoProxyRegion": "us"
}
```

Common region codes: `us`, `gb`, `de`, `fr`, `nl`, `jp`, `au`, `ca`, `br`, `in`

### Your own proxy

You can attach any third-party proxy to a profile. Gologin supports `http`, `https`, and `socks5` proxies.

Configure via the [Proxies API](https://gologin.com/docs/api-reference/proxy/):

```json  theme={null}
{
  "mode": "http",
  "host": "your.proxy.host",
  "port": 10000,
  "username": "user",
  "password": "pass"
}
```

The proxy is validated when the session starts. If the proxy is unreachable, the session will not start.

### No proxy

To run a session without any proxy, set the profile's proxy mode to `none`:

```json  theme={null}
{
  "mode": "none"
}
```

This is useful for testing or for workflows where the automation server's own IP is sufficient.

## Managing proxies via API

Full proxy management (create, update, delete, list, check traffic) is available through the REST API:

* [Proxies API reference](https://gologin.com/docs/api-reference/proxy/)

## Checking proxy status before connecting

Since a broken proxy prevents the session from starting, it's good practice to validate the proxy before running automation — especially in production workflows:

```javascript  theme={null}
const profileRes = await fetch(`https://api.gologin.com/browser/${profileId}`, {
  headers: { Authorization: `Bearer ${token}` },
});
const profile = await profileRes.json();

if (profile.proxy?.mode !== 'none') {
  // optionally verify proxy reachability here before connecting
}
```


Built with [Mintlify](https://mintlify.com).