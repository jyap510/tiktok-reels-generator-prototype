> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Adding and managing proxies

There are several ways to connect your proxies in the Gologin browser. We will cover all of them in this article, from the most obvious to more sophisticated.

Third-party proxy providers usually give **IP, port, username and a password** as an endpoint for your connection. You can paste those credentials almost anywhere throughout various proxy settings and a new proxy will get added to your proxy list.

We support the following proxy pasting formats:

```text  theme={null}
192.168.0.1:8000:myproxy:pass
​﻿http://192.168.0.1:8000:myproxy:pass:name1 
﻿socks5://login:password@192.168.0.1:8000:name2 
﻿socks5://login:password@192.168.0.1:8000[https://change-my-ip.com]:name3 
​﻿http://192.168.0.1:8000:myproxy 
​﻿http://192.168.0.1:8000:myproxy:pass[https://change-my-ip.com] 
​﻿http://192.168.0.1:8000:myproxy:pass[https://change-my-ip.com]:name4
```

## The easiest way

1. At the **All profiles** page, find the **Location** column and click the **+** button at the profile, which you want to add a proxy to.
2. In the opened window, choose the **computer icon** and input your **IP, port, username** and **password**. The HTTP or SOCKS protocol will get selected automatically based on availability, you can change it later.
3. Click **Connect**, the proxy is now added to your profile!
4. Gologin will check your proxy right away. You will see the green indicator if the proxy works properly, or the red one if it is not.

<img src="https://mintcdn.com/gologin/icD2z3poOwslds91/images/GoLogin_Beta_90BPI3LRpu.gif?s=fcc5086777beb2b5639554b5bc286140" alt="GoLogin_Beta_90BPI3LRpu.gif" width="1178" height="661" data-path="images/GoLogin_Beta_90BPI3LRpu.gif" />

You can paste proxies one by one or in bulk at the same page. Copy a few proxies and paste them all at once into the Location column. Use your system **hot keys** or the **Paste proxies** button. You will be able to rearrange your new proxies between the profiles later.

<img src="https://mintcdn.com/gologin/icD2z3poOwslds91/images/GoLogin_Beta_xpgHBq0jDD.gif?s=7dac186fc16a3058d1d6ca24bc9473ad" alt="GoLogin_Beta_xpgHBq0jDD.gif" width="1178" height="661" data-path="images/GoLogin_Beta_xpgHBq0jDD.gif" />

## Other ways of adding a single or multiple proxies

### On the Proxies page

Via the **main menu at the top-right > Proxies > Import proxies**

<img src="https://mintcdn.com/gologin/icD2z3poOwslds91/images/GoLogin_Beta_LlgoDDEYGv.gif?s=fc79c90c1bd89ae195910b4c01287843" alt="GoLogin_Beta_LlgoDDEYGv.gif" width="1178" height="680" data-path="images/GoLogin_Beta_LlgoDDEYGv.gif" />

### Using mass profile selection

**Select a few browser profiles**> click **Proxy** on top > **input proxies** in a new window > click **Update proxy**

<img src="https://mintcdn.com/gologin/icD2z3poOwslds91/images/GoLogin_Beta_EjlyhmhFe3.gif?s=4298837d3a3e3742a510c536cf7e62b9" alt="GoLogin_Beta_EjlyhmhFe3.gif" width="1178" height="680" data-path="images/GoLogin_Beta_EjlyhmhFe3.gif" />

### In the profile settings

Click **3 dots** on the profile **> Settings > Proxy > Your proxy**

<img src="https://mintcdn.com/gologin/icD2z3poOwslds91/images/GoLogin_Beta_EYY6KpepAW.gif?s=fb61eca2bdb7104494db257ad1c3a89d" alt="GoLogin_Beta_EYY6KpepAW.gif" width="1178" height="680" data-path="images/GoLogin_Beta_EYY6KpepAW.gif" />


Built with [Mintlify](https://mintlify.com).