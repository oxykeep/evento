<?php
$host = 'localhost';
$db_name = 'eventhub_db';
$username = 'root';
$password = '';
$charset = 'utf8mb4';

/**
 * PDO options for database connection
 */
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    /**
     * Create a new PDO instance to connect to the MySQL database
     */
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db_name;charset=$charset",
        $username,
        $password,
        $options
    );
} catch (PDOException $e) {
    /**
     * Handle connection errors by terminating the script
     */
    die('Database connection error: ' . $e->getMessage());
}

/**
 * Return the PDO instance for use in other files
 */
return $pdo;
