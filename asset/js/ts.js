TS = {
    default_config:  
    {
        'click_action':'cycle'
        ,'use_default_proxy':0
        ,'current_proxy_index':0
        ,'proxy_list':[
            { mode:'direct', enable:1 }
            ,{ mode:'pac_script',enable:0, color:"009933", pac_script_url:'https://raw.github.com/oylbin/tunnel-switch/master/asset/example.pac'}
            ,{ mode:'fixed_servers',enable:0, color:"CC0000", fixed_servers_schema:'socks5', fixed_servers_name:'127.0.0.1', fixed_servers_port:'8527' }
        ]
    }
    ,change_proxy : function(index){
        //chrome.browserAction.setBadgeText({text:'b'});
        if( index<0 || index >= TS.config.proxy_list.length){
            index = 0;
        }
        if(TS.config.proxy_list.length==0){
            var proxy = { mode:"direct" };
        }else{
            var proxy = TS.config.proxy_list[index];
        }
        console.log(index);
        if(proxy.mode=='pac_script'){
            var config = {
                mode: "pac_script",
                pacScript: {
                    url:proxy.pac_script_url+"?"+(new Date).getTime(),
                    mandatory:true
                }
            };
            chrome.browserAction.setIcon({path:"../image/pac.png"});
            var title = "PAC: "+proxy.pac_script_url;
            //chrome.browserAction.setBadgeText({text:"PAC"});
            chrome.browserAction.setBadgeText({text:" "});
        }else if(proxy.mode=='fixed_servers'){
            var config = {
                mode: "fixed_servers",
                rules: {
                    singleProxy: {
                                     scheme: proxy.fixed_servers_schema,
                                     host: proxy.fixed_servers_name,
                                     port: parseInt(proxy.fixed_servers_port)
                                 },
                    bypassList: ["127.0.0.1","localhost"]
                }
            };
            chrome.browserAction.setIcon({path:"../image/pac.png"});
            var title = proxy.fixed_servers_schema+", "+proxy.fixed_servers_name+":"+proxy.fixed_servers_port;
            chrome.browserAction.setBadgeText({text:" "});
        }else{
            var config = {
                mode: "direct"
            };
            var title = "direct, no proxy";
            chrome.browserAction.setIcon({path:"../image/direct.png"});
            chrome.browserAction.setBadgeText({text:""});
        }
        chrome.proxy.settings.set({value: config, scope: 'regular'},function() {});
        if(proxy.color){
            var r = parseInt(proxy.color.substr(0,2),16);
            var g = parseInt(proxy.color.substr(2,2),16);
            var b = parseInt(proxy.color.substr(4,2),16);
            chrome.browserAction.setBadgeBackgroundColor({color:[r,g,b,255]});
        }
        chrome.browserAction.setTitle({title:title});
        return true;
    }
    ,cycle_proxy : function(e){
        TS.load_config();

        var next_index = -1;
        for(var i=1;i<TS.config.proxy_list.length;++i){
            var j = (TS.config.current_proxy_index + i)%TS.config.proxy_list.length;
            if(TS.config.proxy_list[j].enable){
                next_index = j;
                break;
            }
        }

        if( next_index == -1 ){
            // jump to options page when config is not set, or no enabled proxy
            chrome.tabs.create({url: chrome.extension.getURL("asset/html/options.html?first=1")}, function(tab){});
            return;
        }

        TS.change_proxy(next_index);
        TS.config.current_proxy_index = next_index;
        TS.save_config();
    }
    ,load_config : function(){
        try{
            var config = JSON.parse(localStorage['switch_config']);
            var keys = ['click_action','use_default_proxy','current_proxy_index'];
            for(var i=0;i<keys.length;++i){
                if(config[keys[i]]==undefined){
                    config[keys[i]]=TS.default_config[keys[i]];
                }
            }
        }catch(err){
            config = TS.default_config;
        }

        TS.config = config;
        console.dir(config);
        return config;
    }
    ,save_config : function(){
        localStorage['switch_config'] = JSON.stringify(TS.config);
        console.dir(TS.config);
    }
}
