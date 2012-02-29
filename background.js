var currentProxyType = 'pac';

function changeProxy(type){
    currentProxyType = type;
    if(type=='pac'){
        var config = {
          mode: "pac_script",
          pacScript: {
              url:"file:///Users/oylbin/oylbin/proxy.pac?"+(new Date).getTime(),
              mandatory:true
          }
        };
    }else if(type=='tunnel'){
        var config = {
            mode: "fixed_servers",
            rules: {
                singleProxy: {
                                  scheme: "socks5",
                                  host: "127.0.0.1",
                                  port: 8527
                              },
                bypassList: ["foobar.com"]
            }
        };
    }else{
        type='direct';
        var config = {
            mode: "direct"
        };
    }
    chrome.proxy.settings.set({value: config, scope: 'regular'},function() {});
    chrome.browserAction.setIcon({path:type+".png"});
}

function onIconClicked() {
    if(currentProxyType=='pac'){
        changeProxy('tunnel');
    }else if(currentProxyType=='tunnel'){
        changeProxy('direct');
    }else if(currentProxyType=='direct'){
        changeProxy('pac');
    }
}
chrome.browserAction.onClicked.addListener(onIconClicked);
changeProxy('pac');
