<?php
function chimpSubscribe(){

    // Validation
    if(!$_GET['email']){ return "No email address provided"; }

    if(!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*$/i", $_GET['email'])) {
        return "Email address is invalid";
    }

    require_once('MailChimp.php');

    $MailChimp = new MailChimp('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-usx'); // Put your API Key here
    $result = $MailChimp->call('lists/subscribe', array(
        'id'                => 'xxxxxxxxxx', // Put your list ID here
        'email'             => array('email'=>$_GET['email']),
        'merge_vars'        => array('FNAME'=>'', 'LNAME'=>''),
        'double_optin'      => false,
        'update_existing'   => false,
        'replace_interests' => false,
        'send_welcome'      => true,
    ));

    if(isset($result['error'])) {
        // An error ocurred, return error message
        return 'Error: ' . $result['error'];
    }else{
        // It worked!
        return 'Congratulations! Your subscription is a Success!';
    }

}

// If being called via ajax, autorun the function
if($_GET['ajax']){ print_r(chimpSubscribe()); }