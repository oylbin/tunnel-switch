
$(document).ready(function(){
    $.each(["ssh_tunnel_ip","ssh_tunnel_port","pac_file_url"],function(index,value){
        $('#'+value).val(TS.config[value]);
    });
    var input = document.getElementById('btn_save');
    input.addEventListener("click", save_config); 
    input = document.getElementById('btn_switch');
    input.addEventListener("click", TS.cycle_proxy); 
});
function save_config(){
    $.each(["ssh_tunnel_ip","ssh_tunnel_port","pac_file_url"],function(index,value){
        TS.config[value] = $('#'+value).val();
    });
    TS.save_config();
    $("#div_msg").html("saved!");
    $("#div_msg").show();
    window.setTimeout(hide_msg,1000);
}
function hide_msg(){
    $("#div_msg").fadeOut('fast');
}
