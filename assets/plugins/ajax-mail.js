"use strict";
// Content Contact Form
$(function () {
    $('#af-form .error').hide();
    $('#af-form .text-input').css({backgroundColor:"#FFFFFF"});
    $('#af-form .text-input').focus(function () {
        $(this).css({backgroundColor:"#FCFCFC"});
    });
    $('#af-form .text-input').blur(function () {
        $(this).css({backgroundColor:"#FFFFFF"});
    });

    $("#af-form .form-button").click(function () {
        // validate and process form
        // first hide any error messages
        $('#af-form .error').hide();

        var name = $("#af-form input#name").val();
        if (name == "" || name == "Name *") {
            $("#af-form label#name_error").show();
            $("#af-form input#name").focus();
            return false;
        }
        var email = $("#af-form input#email").val();
        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;

        if (!filter.test(email)) {
            $("#af-form label#email_error").show();
            $("#af-form input#email").focus();
            return false;
        }
        var message = $("#af-form #input-message").val();
        if (message == "" || message == "Message *"){
            $("#af-form label#message_error").show();
            $("#af-form #input-message").focus();
            return false;
        }

        var dataString = 'name=' + name + '&email=' + email + '&message=' + message;
        //alert (dataString);return false;

        $.ajax({
            type:"POST",
            url:"assets/php/contact-form.php",
            data:dataString,
            success:function () {
                $('#af-form').prepend("<div class=\"alert alert-success fade in\"><button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button><strong>Contact Form Submitted!</strong> We will be in touch soon.</div>");
                $('#af-form')[0].reset();
            }
        });
        return false;
    });
});

// Registration Form
$(function () {
    $('#af-form-rf .error').hide();
    $('#af-form-rf .text-input').css({backgroundColor:"#FFFFFF"});
    $('#af-form-rf .text-input').focus(function () {
        $(this).css({backgroundColor:"#FCFCFC"});
    });
    $('#af-form-rf .text-input').blur(function () {
        $(this).css({backgroundColor:"#FFFFFF"});
    });

    $("#submit_btn_rf").click(function () {
        // validate and process form
        // first hide any error messages
        $('#af-form-rf .error').hide();

        var name = $("#af-form-rf input#name-rf").val();
        if (name == "" || name == "Name *") {
            $("#af-form-rf label#name_error_rf").show();
            $("#af-form-rf input#name-rf").focus();
            return false;
        }
        var email = $("#af-form-rf input#email-rf").val();
        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;

        if (!filter.test(email)) {
            $("#af-form-rf label#email_error_rf").show();
            $("#af-form-rf input#email-rf").focus();
            return false;
        }
        var phone = $("#af-form-rf input#phone-rf").val();
        if (phone == "" || phone == "Phone") {
            $("#af-form-rf label#phone_error_rf").show();
            $("#af-form-rf input#phone-rf").focus();
            return false;
        }
        var message = $("#af-form-rf #input-message-rf").val();
        if (message == "") {
            $("#af-form-rf label#message_error_rf").show();
            $("#af-form-rf #input-message-rf").focus();
            return false;
        }

        var dataString = 'name=' + name + '&email=' + email + '&phone=' + phone + '&message=' + message;
        //alert (dataString);return false;

        $.ajax({
            type:"POST",
            url:"assets/php/registration.php",
            data:dataString,
            success:function () {
                $('#af-form-rf').prepend("<div class=\"col-sm-12 \"><div class=\"alert alert-success fade in\"><button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button><strong>Your request send!</strong> We will be in touch soon.</div></div>");
                $('#af-form-rf')[0].reset();
            }
        });
        return false;
    });
});
/*
// Event
$(function () {
    $('#subscribe .error').hide();
    $('#subscribe .form-control').css({backgroundColor:"#FFFFFF"});
    $('#subscribe .form-control').focus(function () {
        $(this).css({backgroundColor:"#FCFCFC"});
    });
    $('#subscribe .form-control').blur(function () {
        $(this).css({backgroundColor:"#FFFFFF"});
    });

    $("#subscribe .btn-subscribe").click(function () {
        // validate and process form
        // first hide any error messages
        $('#subscribe .error').hide();

        var email = $("#subscribe input#exampleInputEmail1").val();
        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;

        if (!filter.test(email)) {
            $("#subscribe label#email1_error").show();
            $("#subscribe input#exampleInputEmail1").focus();
            return false;
        }

        var dataString = '&email=' + email;
        //alert (dataString);return false;

        $.ajax({
            type:"POST",
            url:"assets/php/event.php",
            data:dataString,
            success:function () {
                $('#subscribe').append("<div class=\"\"><div class=\"alert alert-success fade in\"><button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button><strong>Your request send!</strong> We will be in touch soon.</div></div>");
                $('#subscribe')[0].reset();
            }
        });
        return false;
    });
});
*/