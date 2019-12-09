<div >
  <ul id="conversacion">
    <?php
      session_start();
      if(isset($_SESSION['conversation']))
      {
        $conversation = $_SESSION['conversation'];
        foreach($conversation as $message){
          if($message['user'] == 1){
            echo "<li><b>Me:</b> ".$message["text"]."</li>";
          }
          else {
            echo "<li><b>Yoda:</b> ".$message["text"]."</li>";
          }
        }
      }
     ?>
  </ul>
</div>
<div style="display:none" id="writing">Writing...</div>
<form action="#" id="myForm">
  <div class="form-group">
    <input type="text" name="chat" id="chat" onkeyup="checkChat()"/>
    <input class="btn btn-success btn-submit" type="button" value="Send!" id="submit" disabled/>
  </div>
</form>
