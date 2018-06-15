<!-- SMTP send mail php function -->
<?php
require '../mailer/PHPMailerAutoload.php'; // source to phpMailer !!!Important , if you don't include this files, mail function will not work !!!!!

$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

// $mail->isSMTP();                                   // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';                       // Specify main and backup SMTP servers, write here your own mail server (this example is for gmail)
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'your@mail.com';                    // SMTP username
$mail->Password = '******************';               // SMTP password (your password)
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to, your server TCP port (this example is for gmail)

$mail->setFrom('your@mail.com', 'Contact form from your web page'); // write here your mail and mail title
$mail->addAddress('your@mail.com');            // Add a recipient
$mail->addReplyTo('your@mail.com');            // Add a recipient



$mail->isHTML(true);                                   // Set email format to HTML



// Get the details the user entered into the form
$name       = $_POST["your-name"];
$email_from = $_POST["your-email"];
$message    = $_POST["your-message"];
$subscribed = $_POST["check_subscribe"];



// Validate the email address entered by the user
if(!filter_var($email_from, FILTER_VALIDATE_EMAIL)) {
    // Invalid email address
    die("The email address entered is invalid.");
}



$headers = array("From: " . $email_from,
    "Reply-To: " . $email_from,
    "X-Mailer: PHP/" . PHP_VERSION
);
$headers = implode("<br>", $headers);

// Now we can construct the email body which will contain the name and message entered by the user
    $mail->Body = "<b>Name:</b> ". $name. "<br><b><b>Email:</b></b> " . $email_from. "<br><b>Message:</b>" . $message. "<br><b>Subscriber:</b>" . $subscribed;



$mail->Subject = 'NEW CLIENT';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}