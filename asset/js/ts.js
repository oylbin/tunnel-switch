TS = {
    config:{
        proxy_mode:'direct'
        ,ssh_tunnel_ip:''
        ,ssh_tunnel_port:''
        ,pac_file_url:''
    }
    ,change_proxy : function(mode){
        if(mode=='pac'){
            if(TS.config.pac_file_url){
                var config = {
                    mode: "pac_script",
                    pacScript: {
                        url:TS.config.pac_file_url+"?"+(new Date).getTime(),
                        mandatory:true
                    }
                };
            }else{
                return false;
            }
        }else if(mode=='tunnel'){
            if(TS.config.ssh_tunnel_ip && TS.config.ssh_tunnel_port){
                var config = {
                    mode: "fixed_servers",
                    rules: {
                        singleProxy: {
                                         scheme: "socks5",
                                         host: TS.config.ssh_tunnel_ip,
                                         port: parseInt(TS.config.ssh_tunnel_port)
                                     },
                        bypassList: ["foobar.com"]
                    }
                };
            }else{
                return false;
            }
        }else{
            mode='direct';
            var config = {
                mode: "direct"
            };
        }
        chrome.proxy.settings.set({value: config, scope: 'regular'},function() {});
        chrome.browserAction.setIcon({path:"../image/"+mode+".png"});
        TS.config.proxy_mode = mode;
        return true;
    }
    ,cycle_proxy : function(e){
        TS.load_config();
        if( !(TS.config.ssh_tunnel_ip && TS.config.ssh_tunnel_port) && ! TS.config.pac_file_url ){
            // jump to options page when config is not set
            chrome.tabs.create({url: chrome.extension.getURL("asset/html/options.html?first")}, function(tab){});
            return;
        }
        if(TS.config.proxy_mode=='pac'){
            TS.change_proxy('tunnel') || TS.change_proxy('direct');
        }else if(TS.config.proxy_mode=='tunnel'){
            TS.change_proxy('direct');
        }else if(TS.config.proxy_mode=='direct'){
            TS.change_proxy('pac') || TS.change_proxy('tunnel');
        }
    }
    ,load_config : function(){
        // WHY I can NOT use $ here?!!!
        if(typeof $ !='undefined'){
            $.each(["proxy_mode","ssh_tunnel_ip","ssh_tunnel_port","pac_file_url"],function(index,value){
                if(localStorage[value]){
                    TS.config[value] = localStorage[value];
                }
            });
        }else{
            if(localStorage['ssh_tunnel_ip']){
                TS.config['ssh_tunnel_ip'] = localStorage['ssh_tunnel_ip'];
            }else{
                TS.config['ssh_tunnel_ip'] = '';
            }
            if(localStorage['ssh_tunnel_port']){
                TS.config['ssh_tunnel_port'] = localStorage['ssh_tunnel_port'];
            }else{
                TS.config['ssh_tunnel_port'] = '';
            }
            if(localStorage['pac_file_url']){
                TS.config['pac_file_url'] = localStorage['pac_file_url'];
            }else{
                TS.config['pac_file_url'] = '';
            }
        }
    }
    ,save_config : function(){
        $.each(["proxy_mode","ssh_tunnel_ip","ssh_tunnel_port","pac_file_url"],function(index,value){
            localStorage[value] = TS.config[value];
        });
    }
}
TS.load_config();
