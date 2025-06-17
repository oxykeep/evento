<?php
// Establish a connection to the database and initialize it with schema.sql

$host = 'localhost';
$dbname = 'eventhub_db';
$user = 'root';
$pass = '';

try {
    // Create PDO instance with error mode set to exception
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Database connection established.\n";
} catch (PDOException $e) {
    // Terminate script if connection fails
    die("Database connection error: " . $e->getMessage());
}

$tables = ['comments', 'participants', 'events', 'users', 'categories'];

// Disable foreign key checks to allow truncating tables with dependencies
$pdo->exec("SET FOREIGN_KEY_CHECKS = 0");

foreach ($tables as $table) {
    // Truncate each table to remove all data and reset auto-increment
    $pdo->exec("TRUNCATE TABLE `$table`");
    echo "Table $table truncated and auto_increment reset.\n";
}

// Re-enable foreign key checks after truncation
$pdo->exec("SET FOREIGN_KEY_CHECKS = 1");

$sqlFile = __DIR__ . '/database/schema.sql';

// Verify schema.sql file existence
if (!file_exists($sqlFile)) {
    die("schema.sql file not found in /database folder.");
}

// Read the SQL schema file content
$sql = file_get_contents($sqlFile);

try {
    // Execute SQL statements to initialize database schema and data
    $pdo->exec($sql);
    echo "Database initialized successfully with schema.sql.\n";
} catch (PDOException $e) {
    // Terminate script if SQL execution fails
    die("Error executing SQL: " . $e->getMessage());
}
