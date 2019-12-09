/**
  Make the autorization for the conversation.
*/
function Authorization(){
  ajax(
    'POST',
    'https://api.inbenta.io/v1/auth',
    {
      'x-inbenta-key': apiKey,
    },
    {
      "secret" : secret
    },
    'json'
  ).then(data => {
    accessToken = data.accessToken;
    expiration = data.expiration;
    chatbotApiUrl = data.apis.chatbot;
    expires_in = data.expires_in;
    setTimeout("accessToken = '';", expires_in*1000);
    iniConversation();
  }).catch(error => {
    console.log(error)
  });

}

/*
  We don't use this function

function getApiUrl(){
  $.ajax({
     type:'GET',
     url: 'https://api.inbenta.io/v1/apis',
     headers: {
       'x-inbenta-key': apiKey,
       'Authorization' : 'Bearer ' + accessToken
     },
     data:{
       "secret" : secret
     },
     dataType: 'json',
     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
     success:function(data){
       console.log(data);

     },
     error:function(xhr,status,error){
         console.log(error);
    }
  });
}*/


/**
  Init the conversation
*/
function iniConversation(){
  ajax(
    'POST',
    chatbotApiUrl + '/v1/conversation',
    {
      'x-inbenta-key': apiKey,
      'Authorization' : 'Bearer ' + accessToken
    },
    "",
    'json'
  ).then(data => {
    sessionToken = data.sessionToken;
    sendMessage();
  }).catch(error => {
    console.log(error)
  });
}

/**
  Send the message a Inbenta Chat Bot and show the response
*/
function sendMessage(){
  ajax(
    'POST',
    chatbotApiUrl + '/v1/conversation/message',
    {
      'x-inbenta-key': apiKey,
      'Authorization' : 'Bearer ' + accessToken,
      'x-inbenta-session': 'Bearer ' + sessionToken
    },
    {
      message : $("#chat").val(),
    },
    'json'
  ).then(data => {
    (data.answers[0].flags[0]=="no-results"?countNoResult++:countNoResult=0);
    if(countNoResult>=2){
      starWarsCharacters();
    }
    else{
      var message = "";
      $.each(data.answers[0].messageList, function(key, value){
        message += (message==""?value:"<br>"+value);
      });
      saveSession(0,message);
      $("#conversacion").append("<li><b>Yoda:</b> "+message+"</li>");
      $("#writing").hide();
      $("#chat").val("");
    }
  }).catch(error => {
    console.log(error);
    $("#writing").hide();
    $("#chat").val("");
  });
}
