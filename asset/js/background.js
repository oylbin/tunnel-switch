var currentProxyType = 'pac';

function changeProxy(type){

    var ssh_tunnel_ip = localStorage["ssh_tunnel_ip"];
    var ssh_tunnel_port = localStorage["ssh_tunnel_port"];
    if(typeof ssh_tunnel_port=="string"){
        ssh_tunnel_port = parseInt(ssh_tunnel_port);
    }
    var pac_file_url = localStorage["pac_file_url"];
    if(type=='pac'){
        if(pac_file_url){
            var config = {
                mode: "pac_script",
                pacScript: {
                    url:pac_file_url+"?"+(new Date).getTime(),
                    mandatory:true
                }
            };
        }else{
            return false;
        }
    }else if(type=='tunnel'){
        if(ssh_tunnel_ip && ssh_tunnel_port){
            var config = {
                mode: "fixed_servers",
                rules: {
                    singleProxy: {
                                     scheme: "socks5",
                                     host: ssh_tunnel_ip,
                                     port: ssh_tunnel_port
                                 },
                    bypassList: ["foobar.com"]
                }
            };
        }else{
            return false;
        }
    }else{
        type='direct';
        var config = {
            mode: "direct"
        };
    }
    //alert("type:"+type+", url:"+pac_file_url+", ip:"+ssh_tunnel_ip+", port:"+ssh_tunnel_port);
    chrome.proxy.settings.set({value: config, scope: 'regular'},function() {});
    chrome.browserAction.setIcon({path:"../image/"+type+".png"});
    currentProxyType = type;
    return true;
}

function onIconClicked() {
    if(currentProxyType=='pac'){
        changeProxy('tunnel') || changeProxy('direct');
    }else if(currentProxyType=='tunnel'){
        changeProxy('direct');
    }else if(currentProxyType=='direct'){
        changeProxy('pac') || changeProxy('tunnel');
    }
}
chrome.browserAction.onClicked.addListener(onIconClicked);
changeProxy('pac') || changeProxy('direct');
