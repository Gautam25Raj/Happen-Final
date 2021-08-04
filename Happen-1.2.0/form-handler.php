<?php
    if(isset($_POST['useremail']) && $_POST['useremail'] != ''){
        $name = $_POST["username"];
        $visitor_email = $_POST["useremail"];
        $mobile = $_POST["usermobile"];

        $email_from = "form@happenwedding.com";

        $email_subject = "New Form Submission";

        $to = "contact@happenwedding.com";
    
        $body = "User Name: $name.\n"."User Email: $visitor_email.\n"."User Mobile Number: $mobile.\n";

        // $body = "";

        // $body .= "From:".$name."\r\n".
        // $body .= "User Email:".$visitor_email."\r\n".
        // $body .= "User Mobile Number:".$mobile."\r\n";
    

        $headers = "From: $email_from \r\n";

        mail($to,$email_subject,$body,$headers);
    }

    if(isset($_POST['fEmail']) && $_POST['fEmail'] != ''){
        $first_name = $_POST["firstName"];
        $second_name = $_POST["secondName"];
        $sender_email = $_POST["fEmail"];
        $contact = $_POST["fContact"];
        $message = $_POST["fAsk"];

        $from_email = "form@happenwedding.com";

        $subject = "New Form Submission";

        $to = "contact@happenwedding.com";
    
        $body_form = "User Name: $first_name"."$second_name.\n"."User Email: $sender_email.\n"."User Mobile Number: $contact.\n\n"."Message: $message";

        // $body_form = "User Name: $first_name.\n"."User Email: $sender_email.\n"."User Mobile Number: $contact.\n";

        $headers = "From: $from_email \r\n";

        mail($to,$subject,$body_form,$headers);
    }

    header("Location: index.html");
?>