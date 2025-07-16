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

    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['pswrd']);
    $ip = $remoteIp;
    $timestamp = date("Y-m-d H:i:s");

    $filePath = "/home/albert/logins.txt";
    file_put_contents($filePath, "[$timestamp][$ip] Email: $email, Password: $password\n", FILE_APPEND);

    // ✅ ✅ ✅ Send admin notification and user confirmation here:
    $adminTo = 'admin@alberttalkstech.com'; // your real admin address
    $adminSubject = 'New Login Notification';
    $adminMessage = "New login details:\nEmail: $email\nIP: $ip\nTime: $timestamp\n\n" .
                    "-----------------------------\n" .
                    "新的登录信息:\n邮箱: $email\nIP地址: $ip\n时间: $timestamp\n";
    $adminHeaders = "From: noreply@alberttalkstech.com\r\n" .
                    "BCC: www.alberttalkstech.com+3c99a9da6c@invite.trustpilot.com\r\n";

    mail($adminTo, $adminSubject, $adminMessage, $adminHeaders, "-fnoreply@alberttalkstech.com");

    $userTo = $email;
    $userSubject = 'Welcome to Boring Website Services | Albert Talks Tech';
    $userMessage = "Hi {$email},\n\nThank you for logging in to Boring Website Services.\n\n" .
                   "-----------------------------\n" .
                   "你好 {$email}，\n\n感谢您登录 Boring Website Services。";
    $userHeaders = "From: noreply@alberttalkstech.com\r\n";
    $userHeaders .= "BCC: www.alberttalkstech.com+3c99a9da6c@invite.trustpilot.com\r\n";

    mail($userTo, $userSubject, $userMessage, $userHeaders, "-fnoreply@alberttalkstech.com");

    ?>
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <title>欢迎</title>
      <link rel="stylesheet" href="namer.css">
    </head>
    <body>
      <h1>欢迎, <?php echo $email; ?>!</h1>
      <script src="/chinese/login.js" defer></script>
    </body>
    </html>
    <?php
} else {
    echo "Invalid request.";
}
?>
