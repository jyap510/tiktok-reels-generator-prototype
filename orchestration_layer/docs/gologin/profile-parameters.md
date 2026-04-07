> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Profile parameters

Profile settings define how your browser profile behaves and how websites see it.

In Gologin, each profile simulates a real device — including IP, fingerprint, location, and behavior.

## Overview

This is where you create and configure your profile.

**What you set here:**

* profile name and folder
* operating system
* fingerprint (via **New Fingerprint**)

This is the foundation of your digital identity.

<Frame>
    <img src="https://mintcdn.com/gologin/ExX3Yr4fdlqjY5m3/images/Screenshot_4.png?fit=max&auto=format&n=ExX3Yr4fdlqjY5m3&q=85&s=03bb10f349df97df73014da7eb927f6d" alt="Screenshot 4" width="1918" height="1089" data-path="images/Screenshot_4.png" />
</Frame>

## Proxy

Defines your IP address and connection type.

### Options

* **Gologin proxy** - built-in
* **Your proxy** - external provider
* **Without proxy** - not recommended

### Proxy settings

* **Country** — location of your IP
* **Type**:
  * Residential
  * Mobile
  * Datacenter

### Check proxy

Allows you to verify if the proxy is working correctly.

<Frame>
    <img src="https://mintcdn.com/gologin/EG08AqSeA-T2hDNj/images/Screenshot_7-1.png?fit=max&auto=format&n=EG08AqSeA-T2hDNj&q=85&s=36fec6d45c1b5d7e8849238a9967d371" alt="Screenshot 7" width="1918" height="1079" data-path="images/Screenshot_7-1.png" />
</Frame>

**Best practice**

* Always use a proxy
* Match proxy country with your profile settings

## Timezone

Controls your system time inside the profile.

Automatically sets your timezone based on your proxy IP.

You can manually choose a timezone from the list.

<Frame>
    <img src="https://mintcdn.com/gologin/EG08AqSeA-T2hDNj/images/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B02026-03-25161904.png?fit=max&auto=format&n=EG08AqSeA-T2hDNj&q=85&s=abbc34012fb9a438741160821abe0277" alt="Снимок Экрана 2026 03 25 161904" width="1915" height="1079" data-path="images/Снимокэкрана2026-03-25161904.png" />
</Frame>

## Extensions

Add browser extensions to your profile.

**Use cases**

* crypto wallets
* automation tools
* ad tools

<Frame>
    <img src="https://mintcdn.com/gologin/EG08AqSeA-T2hDNj/images/0319(20).gif?s=781d77c3d5cd98270c33a246b3c1d446" alt="0319(20)" width="1138" height="640" data-path="images/0319(20).gif" />
</Frame>

## Bookmarks

Preload websites for faster access.

**Useful for:**

* Facebook Ads
* Business Manager
* frequently used dashboards

<Frame>
    <img src="https://mintcdn.com/gologin/EG08AqSeA-T2hDNj/images/Screenshot_9.png?fit=max&auto=format&n=EG08AqSeA-T2hDNj&q=85&s=490ea71641377cebc0e6b31cfa937cee" alt="Screenshot 9" width="1918" height="1077" data-path="images/Screenshot_9.png" />
</Frame>

## Geolocation

Controls location access inside the browser.

**Modes:**

* **Prompt (recommended)** — Ask every time. Best balance between control and consistency.
* **Allow** — Always share location. Use when platforms require it.
* **Block** — Never share location. Use if location is not needed.

<Frame>
    <img src="https://mintcdn.com/gologin/EG08AqSeA-T2hDNj/images/Screenshot_10-1.png?fit=max&auto=format&n=EG08AqSeA-T2hDNj&q=85&s=be9ccfa8819f7d1242c83e011b0156ad" alt="Screenshot 10" width="1918" height="1083" data-path="images/Screenshot_10-1.png" />
</Frame>

## Advanced

Advanced settings control your browser fingerprint and environment.\
In most cases, you don’t need to change them.

### Navigator

Defines how your browser identifies itself to websites.

* **User-Agent** — browser and OS identity
* **Orbita version** — browser version used in the profile
* **Screen resolution** — screen size reported to websites
* **Languages** — browser language (can match proxy IP)
* **Platform** — OS type (Windows, Mac, etc.)
* **CPU threads / RAM** — device performance parameters
* **Do Not Track** — sends a “do not track” request

<Tip>
  Keep these consistent with your proxy and use case.
</Tip>

<Frame>
    <img src="https://mintcdn.com/gologin/EG08AqSeA-T2hDNj/images/Screenshot_11-2.png?fit=max&auto=format&n=EG08AqSeA-T2hDNj&q=85&s=60ea48df892c1d7e226ee47f77961192" alt="Screenshot 11" width="1918" height="1079" data-path="images/Screenshot_11-2.png" />
</Frame>

### Fonts & Media Devices

Controls system-level fingerprint signals.

* **Enable fonts list masking** — hides real fonts
* **Browser profile fonts list** — predefined font set
* **Mask media devices** — replaces real devices
* **Video / Audio inputs & outputs** — number of devices

👉 Keep masking enabled to avoid hardware leaks.

<Frame>
    <img src="https://mintcdn.com/gologin/EG08AqSeA-T2hDNj/images/image-4.png?fit=max&auto=format&n=EG08AqSeA-T2hDNj&q=85&s=de9e00cf22a7b661e4f9de57b2255671" alt="Image" width="1903" height="1082" data-path="images/image-4.png" />
</Frame>

### Hardware fingerprint

Controls how your browser is identified based on rendering behavior.

These parameters affect how websites detect your device:

* **Canvas** — image rendering
* **Client Rects** — element rendering
* **Audio Context** — audio processing
* **WebGL Image / WebGL Metadata** — GPU behavior
* **WebGL Vendor / WebGL Renderer** — graphics identity

**Modes:**

* **Noise** — adds consistent variation to reduce tracking (recommended)
* **Off** — no masking
* **Block / Mask** — hides real values

Use Noise or Mask for better privacy and stability.

<Frame>
    <img src="https://mintcdn.com/gologin/EG08AqSeA-T2hDNj/images/image-7.png?fit=max&auto=format&n=EG08AqSeA-T2hDNj&q=85&s=a4c6b1baccfde69544aa77307ea7de64" alt="Image" width="1903" height="1077" data-path="images/image-7.png" />
</Frame>

### Storage, plugins & other

Controls what data is stored in the profile and how the browser behaves during use.

* **Enable Local Storage** — allows websites to store data (sessions, preferences).\
  Recommended to keep enabled to avoid losing data between sessions or devices.
* **Enable Extension storage** — allows extensions to store their data and settings.\
  Enable if you use browser extensions.
* **Enable potentially vulnerable plugins** — enables built-in plugins (AdobePDF, Widevine, Native Client). Disabled by default for safety. Enable only if required.
* **Active session lock** — prevents launching the same profile on multiple devices at the same time.
* **Enable Google services** — allows the browser to use Google services.\
  Helps mimic normal browser behavior.
* **Enable browser bookmark saving** — saves bookmarks inside the profile.
* **Enable browser history saving** — saves browsing history.\
  May increase profile size.
* **Enable password saving** — stores and autofills login credentials.\
  Data is securely encrypted.
* **Enable session saving** — saves session state (open tabs, logins).
* **Enable System Extensions** — installs OS-level extensions into the profile.\
  May trigger extension prompts on launch.
* **WebRTC** — controls IP exposure. Based on IP (recommended) matches proxy IP; Off disables WebRTC and may look unusual.

<Frame>
    <img src="https://mintcdn.com/gologin/EG08AqSeA-T2hDNj/images/image-9.png?fit=max&auto=format&n=EG08AqSeA-T2hDNj&q=85&s=ec04d63c127404ce05b7a8035b85ac28" alt="Image" width="1902" height="1081" data-path="images/image-9.png" />
</Frame>

<Warning>
  Avoid changing these after using the profile — it may break consistency and trust.
</Warning>

## Cookies

Import session data into your profile.

**Why use it:**

* log into accounts without password
* transfer sessions

<Frame>
    <img src="https://mintcdn.com/gologin/EG08AqSeA-T2hDNj/images/image-10.png?fit=max&auto=format&n=EG08AqSeA-T2hDNj&q=85&s=bf44cee1d946906b244e8a70487ed33f" alt="Image" width="1913" height="1079" data-path="images/image-10.png" />
</Frame>

## Best practices

* Do not change fingerprint after first use
* Always use a proxy
* Keep all settings consistent (IP, timezone, language)
* One profile = one identity

## Key takeaway

Your profile is your identity.

The more consistent it is — the more stable your accounts will be.


Built with [Mintlify](https://mintlify.com).