<?php
// Get the username from the query string
$username = htmlspecialchars($_GET['username'] ?? 'Friend');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome!</title>
  <link rel="stylesheet" href="namer.css">
</head>
<body id="page">
  <h1>Welcome <?php echo $username; ?> 🎉</h1>
</body>
</html>
