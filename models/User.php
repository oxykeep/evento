<?php
// models/User.php

class User
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Find user by ID
    public function findById(int $id): array|false
    {
        $stmt = $this->pdo->prepare("SELECT id, email, name, city, password FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    // Find user by email (used for login)
    public function findByEmail(string $email): array|false
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch();
    }

    // Register a new user
    public function create(string $email, string $name, string $city, string $passwordHash): bool
    {
        $stmt = $this->pdo->prepare("INSERT INTO users (email, name, city, password) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$email, $name, $city, $passwordHash]);
    }

    // Update user info (excluding password)
    public function update(int $id, string $email, string $name, string $city): bool
    {
        $stmt = $this->pdo->prepare("UPDATE users SET email = ?, name = ?, city = ? WHERE id = ?");
        return $stmt->execute([$email, $name, $city, $id]);
    }

    // Change user's password
    public function updatePassword(int $id, string $passwordHash): bool
    {
        $stmt = $this->pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
        return $stmt->execute([$passwordHash, $id]);
    }
}
