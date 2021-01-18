// Privacidade de Dados
$(document).ready(function(){
    $("#dataPrivacy").modal('show');
});

function openHTP(){
    $('#howToPlay').modal('toggle')
}
function openGO(){
    $('#gameOver').modal('toggle')
}
function playNext() {
    onLoad().then(() => console.log("Novo jogo iniciado"));
}