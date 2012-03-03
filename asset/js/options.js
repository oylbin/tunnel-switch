function add_proxy_row(index,proxy){
    if (proxy.mode=='direct'){
        mode="DIRECT";
        detail = "no proxy";
    }else if(proxy.mode=='pac_script'){
        mode="PAC FILE";
        detail = "<a href='{url}'>{url}</a>".format({url:proxy.pac_script_url});
    }else if(proxy.mode=='fixed_servers'){
        mode="FIXED SERVER";
        detail = proxy.fixed_servers_schema +', '+proxy.fixed_servers_name+', '+proxy.fixed_servers_port;
    }
    var html = ("<tr><td class='hidden'><input name='is_default' type='radio'></td>"+
            "<td><span id='color'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td><td>{mode}</td><td>{detail}</td>"+
                "<td><input name='delete' type='image' src='../image/delete-icon.png' width='24'></td></tr>").format(
                    {mode:mode,detail:detail});
    var row = $(html);
    $('#table_proxy_list').append(row);
    $(row).find("input[name='delete']").click(function(e){
        var table = $(this).closest('table');
        var row = $(this).closest('tr');
        var index = table.find('tr').index(row) -1;
        TS.config.proxy_list.remove(index);
        TS.save_config();
        row.remove();
        // todo 如果删掉的是一个正在使用的proxy，那么要做相应的调整
        e.stopPropagation();
    });
    if(proxy.color){
        $(row).find('#color').css("background-color","#"+proxy.color);
    }
}
$(document).ready(function(){
    var config = TS.load_config();

    $.each(config.proxy_list,add_proxy_row);
    $("#btn_cycle").click(function(e){
        TS.cycle_proxy();
    });
    $("#btn_clear").click(function(e){
        localStorage['tunnel_switch_config'] = '';
    });

    $("#proxy_setting #btn_add_proxy").click(function(e){
        var proxy = {is_default:0}
        proxy['mode'] = $("#proxy_setting #select_mode option:selected").val();
        proxy['color'] = $("#proxy_setting #color").val();
        if(proxy['mode']=='direct'){
        }else if(proxy['mode']=='pac_script'){
            proxy['pac_script_url'] = $("#proxy_setting #pac_script_url").val();
        }else if(proxy['mode']=='fixed_servers'){
            proxy['fixed_servers_schema'] = $("#proxy_setting input[name=fixed_servers_schema]:checked ").val();
            proxy['fixed_servers_name'] = $("#proxy_setting #fixed_servers_name").val();
            proxy['fixed_servers_port'] = $("#proxy_setting #fixed_servers_port").val();
        }
        console.dir(proxy);
        TS.config.proxy_list.push(proxy);
        TS.save_config();
        add_proxy_row(TS.config.proxy_list.length,proxy);
        e.stopPropagation();
    });
    $("#proxy_setting #select_mode").change(function(e){
        var mode=$("#select_mode option:selected").val();
        if(mode=='direct'){
            $("#proxy_setting #fixed_servers_setting").hide();
            $("#proxy_setting #pac_script_setting").hide();
        }else if(mode=='pac_script'){
            $("#proxy_setting #fixed_servers_setting").hide();
            $("#proxy_setting #pac_script_setting").show();
        }else if(mode='fixed_servers'){
            $("#proxy_setting #pac_script_setting").hide();
            $("#proxy_setting #fixed_servers_setting").show();
        }
    });
    if(config.use_default_proxy){
        $('input:radio[name=use_default_proxy][value=yes]').attr('checked', true);
        $('input:radio[name=use_default_proxy][value=no]').attr('checked', false);
    }else{
        $('input:radio[name=use_default_proxy][value=yes]').attr('checked', false);
        $('input:radio[name=use_default_proxy][value=no]').attr('checked', true);
    }
    if(config.click_action=='cycle'){
        $('input:radio[name=click_action][value=cycle]').attr('checked', true);
        $('input:radio[name=click_action][value=list]').attr('checked', false);
    }else{
        $('input:radio[name=click_action][value=cycle]').attr('checked', false);
        $('input:radio[name=click_action][value=list]').attr('checked', true);
    }
});
