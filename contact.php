<?php
// File: contact.php

// Database connection
$db = new mysqli('localhost', 'root', '', 'wadi_alothmania');
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

// Process form data when submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Prepare and bind
    $stmt = $db->prepare("INSERT INTO contact_submissions (name, email, message, submission_date) VALUES (?, ?, ?, NOW())");
    if ($stmt) {
        $stmt->bind_param("sss", $name, $email, $message);
        
        if ($stmt->execute()) {
            echo "تم إرسال رسالتك بنجاح!";
        } else {
            echo "خطأ في الإرسال: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "فشل في تحضير الطلب: " . $db->error;
    }
}

$db->close();
?>
