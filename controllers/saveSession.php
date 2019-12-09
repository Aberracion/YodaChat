<?php
  session_start();
  $message['user']=$_REQUEST['user'];
  $message['text']=$_REQUEST['text'];
  $_SESSION['conversation'][]=$message;
?>
