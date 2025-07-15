<?php
<<<<<<< HEAD
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['pswrd']);

    // ✅ Use full absolute path — no ~
    $filePath = "/home/albert/logins.txt";

    if ($file = fopen($filePath, "a")) {
        fwrite($file, "Username: $username, Password: $password\n");
        fclose($file);
    }

    // ✅ Output simple welcome page
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Welcome!</title>
        <link rel="stylesheet" href="namer.css"> <!-- Optional if you want CSS -->
    </head>
    <body>
        <h1>Welcome, <?php echo $username; ?>! 🎉</h1>
    </body>
    </html>
    <?php
} else {
    echo "Invalid request.";
}
=======
echo "<pre>";
print_r($_POST);
echo "</pre>";
>>>>>>> 23d82b9500218a78537866e08b3eacdcfdf6264e
?>
