<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	</head>
	<body>
		<div id="conversacion">
			<ul>

			</ul>
		</div>
		<div style="display:none" id="writing">Writing...</div>
		<form action="#" id="myForm">
			<div class="form-group">
				<input type="text" name="chat" id="chat" onkeyup="checkChat()"/>
				<input class="btn btn-success btn-submit" type="button" value="Send!" id="submit" disabled/>
			</div>

		</form>


		<script>
		var accessToken = "";
		var expiration = "";
		var chatbotApiUrl = "";
		var expires_in = "";
		var sessionTolen = "";
		var apiKey = 'nyUl7wzXoKtgoHnd2fB0uRrAv0dDyLC+b4Y6xngpJDY=';
		var secret = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0IjoieW9kYV9jaGF0Ym90X2VuIn0.anf_eerFhoNq6J8b36_qbD4VqngX79-yyBKWih_eA1-HyaMe2skiJXkRNpyWxpjmpySYWzPGncwvlwz5ZRE7eg';


		function checkChat(){
			if($.trim($("#chat").val()) !== ""){
				$("#submit").prop("disabled",false);
			}
			else{
				$("#submit").prop("disabled",true);
			}
		}

		/*$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});

		$(function() {
			$("#submit").click(function(){
				$("#conversacion ul").append("<b>Me:</b> "+$("#chat").val());
				$("#writing").show();
				$.ajax({
					 type:'POST',
					 url:'/ajaxRequest',
					 data:{text:$("#chat").val()},
					 success:function(data){
						 $("#writing").hide();
					 }
				});
				$("#chat").val("");
				$("#submit").prop("disabled",true);
			});
		});*/

		$(function() {
			$("#submit").click(function(){
				$("#conversacion ul").append("<li><b>Me:</b> "+$("#chat").val()+"</li>");
				$("#writing").show();
				if(accessToken === ""){
					Authorization();
				}
				else if(sessionToken === ""){
					iniConversation();
				}
				else{
					sendMessage();
				}


				$("#submit").prop("disabled",true);
			});

			function Authorization(){
				$.ajax({
					 type:'POST',
					 url: 'https://api.inbenta.io/v1/auth',
					 headers: {
						 'x-inbenta-key': apiKey,
					 },
					 data:{
						 "secret" : secret
					 },
					 dataType: 'json',
					 contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					 success:function(data){
						 accessToken = data.accessToken;
						 expiration = data.expiration;
						 chatbotApiUrl = data.apis.chatbot;
						 expires_in = data.expires_in;
						 iniConversation();

					 },
					 error:function(xhr,status,error){
							 console.log(error);
					}
				});
			}

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
			}

			function iniConversation(){
				$.ajax({
					 type:'POST',
					 url: chatbotApiUrl + '/v1/conversation',
					 headers: {
						 'x-inbenta-key': apiKey,
						 'Authorization' : 'Bearer ' + accessToken
					 },
					 dataType: 'json',
					 contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					 success:function(data){
						 sessionToken = data.sessionToken;
						 sendMessage();

					 },
					 error:function(xhr,status,error){
							 console.log(error);
					}
				});
			}

			function sendMessage(){

				$.ajax({
					 type:'POST',
					 url: chatbotApiUrl + '/v1/conversation/message',
					 headers: {
						 'x-inbenta-key': apiKey,
						 'Authorization' : 'Bearer ' + accessToken,
						 'x-inbenta-session': 'Bearer ' + sessionToken
					 },
					 data:{
						 message : $("#chat").val(),

					 },
					 dataType: 'json',
					 contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					 success:function(data){
						 $("#conversacion ul").append("<li><b>Yoda:</b> "+data.answers[0].messageList[0]+"</li>");
						 $("#writing").hide();
						 $("#chat").val("");
						 console.log(data);
						 //data.answers[0].flags[0]="no-results";
					 },
					 error:function(xhr,status,error){
								console.log(status);
							 console.log(error);
					}
				});
			}

		});
		</script>
	</body>
</html>
