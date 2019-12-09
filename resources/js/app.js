var accessToken = "";
var expiration = "";
var chatbotApiUrl = "";
var expires_in = "";
var sessionTolen = "";
var apiKey = 'nyUl7wzXoKtgoHnd2fB0uRrAv0dDyLC+b4Y6xngpJDY=';
var secret = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0IjoieW9kYV9jaGF0Ym90X2VuIn0.anf_eerFhoNq6J8b36_qbD4VqngX79-yyBKWih_eA1-HyaMe2skiJXkRNpyWxpjmpySYWzPGncwvlwz5ZRE7eg';
var countNoResult = 0;

function checkChat(){
  if($.trim($("#chat").val()) !== ""){
    $("#submit").prop("disabled",false);
  }
  else{
    $("#submit").prop("disabled",true);
  }
}

function saveSession(user, text){
  ajax(
    'POST',
    './controllers/saveSession.php',
    "",
    {
      "user" : user,
      "text" : text
    },
    ''
  );
}

$(function() {
  $("#submit").click(function(){
    $("#conversacion").append("<li><b>Me:</b> "+$("#chat").val()+"</li>");
    $("#writing").show();
    saveSession(1,$("#chat").val());

    if($("#chat").val().indexOf('force') >= 0)
    {
      starWarsFilms();
    }
    else{
      if(accessToken === ""){
        Authorization();
      }
      else if(sessionToken === ""){
        iniConversation();
      }
      else{
        sendMessage();
      }
    }

    $("#submit").prop("disabled",true);
  });

});
