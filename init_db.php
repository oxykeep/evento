<?php
// Script for initializing the database using schema.sql

// Connection settings - adapt if needed
$host = 'localhost';
$dbname = 'eventhub_db';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Database connection established.\n";
} catch (PDOException $e) {
    die("Database connection error: " . $e->getMessage());
}

// Tabele do wyczyszczenia (w kolejności zależnej od FK)
$tables = ['comments', 'participants', 'events', 'users', 'categories'];

// Wyłączamy FK checks aby można było czyścić tabele
$pdo->exec("SET FOREIGN_KEY_CHECKS = 0");

foreach ($tables as $table) {
    // Truncate usuwa wszystkie dane i resetuje AUTO_INCREMENT
    $pdo->exec("TRUNCATE TABLE `$table`");
    echo "Table $table truncated and auto_increment reset.\n";
}

// Włączamy FK checks z powrotem
$pdo->exec("SET FOREIGN_KEY_CHECKS = 1");

// Teraz ładujemy i wykonujemy schema.sql, który stworzy tabele i wstawi dane
$sqlFile = __DIR__ . '/database/schema.sql';
if (!file_exists($sqlFile)) {
    die("schema.sql file not found in /database folder.");
}

$sql = file_get_contents($sqlFile);

try {
    $pdo->exec($sql);
    echo "Database initialized successfully with schema.sql.\n";
} catch (PDOException $e) {
    die("Error executing SQL: " . $e->getMessage());
}
