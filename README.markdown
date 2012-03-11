### TunnelSwitch is chrome extension allows you manage and switch between multiple proxies quickly and easily

[Latest Version: 1.0.2](http://ouyang.me/projects/tunnel-switch/tunnel-switch-1.0.2.crx)

[Switchy](https://chrome.google.com/webstore/detail/caehdcpeofiiigpdhbabniblemipncjj) is pretty good, but the auto switch mode seems not work for me, so I made this [TunnelSwitch](https://github.com/oylbin/tunnel-switch).

The default setting shows that how I use TunnelSwitch with a ssh tunnel proxy listened on port 8527 at localhost. 
I have 3 modes in the default setting.

 * DIRECT, all traffic goes directly without proxy
 * PAC FILE, I use pac file to define the URL patterns those should be proxied with ssh tunnel, GFWed sites typically (facebook, twitter, youtube... ) . I provide a [example pac file](https://raw.github.com/oylbin/tunnel-switch/master/asset/example.pac) in default settings, you can download it and change it for your own sake. I usually stay in this mode. When I visit the GFWed sites, the traffic goes through ssh tunnel automatically.
 * FIXED SERVER, socks5,127.0.0.1,8527, all traffic goes through the ssh tunnel 

Though I mainly use this extension with socks5 proxy, Other proxy schemas http/https/socks4 are also supported.
