<?php
// config/db.php
// Database connection configuration
$host = 'localhost';
$db_name = 'eventhub_db';
$username = 'root';
$password = '';
$charset = 'utf8mb4';

// PDO options
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,        // Throw exceptions on SQL errors
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,   // Fetch associative arrays by default
    PDO::ATTR_EMULATE_PREPARES => false,                // Use native prepared statements
];

try {
    // Create new PDO instance for MySQL connection
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db_name;charset=$charset",
        $username,
        $password,
        $options
    );
} catch (PDOException $e) {
    die('Database connection error: ' . $e->getMessage());
}

// Return the PDO instance for use in other files
return $pdo;
