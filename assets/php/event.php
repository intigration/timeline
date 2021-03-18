<?php
if ((isset($_POST['email'])) && (strlen(trim($_POST['email'])) > 0)) {
	$email = stripslashes(strip_tags($_POST['email']));
} else {$email = 'No email entered';}
ob_start();
?>
<html>
<head>
<style type="text/css">
</style>
</head>
<body>
<table width="550" border="1" cellspacing="2" cellpadding="2">
  <tr bgcolor="#eeeeff">
    <td>Email</td>
    <td><?php echo $email;?></td>
  </tr>
</table>
</body>
</html>
<?php
$body = ob_get_contents();

$to = 'you@domain.com';
$toname = 'Your Name';
//$anotheraddress = 'email@example.com';
//$anothername = 'Another Name';

require("phpmailer.php");

$mail = new PHPMailer();

$mail->From     = $email;
$mail->FromName = $email;
$mail->AddAddress($to ,$toname); // Put your email
//$mail->AddAddress($anotheraddress,$anothername); // addresses here

$mail->WordWrap = 50;
$mail->IsHTML(true);

$mail->Subject  =  "Demo Form:  Subscribe form submitted";
$mail->Body     =  $body;
$mail->AltBody  =  $message;

if(!$mail->Send()) {
	$recipient = $to;
	$subject = 'Subscribe form failed';
	$content = $body;	
  mail($recipient, $subject, $content, "From: $email\r\nReply-To: $email\r\nX-Mailer: DT_formmail");
  exit;
}
?>
