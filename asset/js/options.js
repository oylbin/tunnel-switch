function load_config(){
    var ssh_tunnel_ip = localStorage["ssh_tunnel_ip"];
    var ssh_tunnel_port = localStorage["ssh_tunnel_port"];
    var pac_file_url = localStorage["pac_file_url"];
    $('#ssh_tunnel_ip').val(ssh_tunnel_ip);
    $('#ssh_tunnel_port').val(ssh_tunnel_port);
    $('#pac_file_url').val(pac_file_url);
}

function save_config(){
    localStorage["ssh_tunnel_ip"] = $('#ssh_tunnel_ip').val();
    localStorage["ssh_tunnel_port"]=$('#ssh_tunnel_port').val();
    localStorage["pac_file_url"]=$('#pac_file_url').val();
    $("#div_msg").html("saved!");
    $("#div_msg").show();
    window.setTimeout(hide_msg,1000);
}

function hide_msg(){
    $("#div_msg").fadeOut('fast');
}

$(document).ready(function(){
    load_config();
    var input = document.getElementById('btn_save');
    input.addEventListener("click", save_config); 
});

