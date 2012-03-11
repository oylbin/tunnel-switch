function FindProxyForURL(url, host)
{
    url = url.toLowerCase();
    host = host.toLowerCase();
    
    // whole site
    var site_list = [
        ,'blogger.com'
        ,'blogspot.com'
        ,'bit.ly'

        ,'feedburner.com'
        ,'flickr.com'
        ,'friendfeed.com'
        ,'facebook.com'
        ,'facebook.net'
        ,'fbcdn.net'

        ,'ggpht.com'
        ,'goo.gl'
        ,'google.com'
        ,'google.com.hk'
        ,'google.com.tw'
        ,'googleusercontent.com'

        ,'t.co'
        ,'twitgoo.com'
        ,'twitter.com'
        ,'twitpic.com'
        ,'twimg.com'
        ,'tweetphoto.com'

        ,'wordpress.com'

        ,'youtube.com'
        ,'ytimg.com'
    ];
    
    var exp_list = [ ];

    for(var index = 0;index<site_list.length;index++){
         if(host==site_list[index] ||
             shExpMatch(host, "*." + site_list[index])){
            return "SOCKS5 127.0.0.1:8527";
         }
    }
    for(var index = 0;index<exp_list.length;index++){
        var re = new RegExp(exp_list[index]);
        if(url.match(re)){
            return "SOCKS5 127.0.0.1:8527";
        }
    }
    return "DIRECT";
}
