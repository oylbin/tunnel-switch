chrome.browserAction.onClicked.addListener(TS.cycle_proxy);
TS.load_config();
TS.change_proxy(TS.config.current_proxy_index);
