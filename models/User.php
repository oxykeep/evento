<?php
/**
 * User model handles user-related database operations.
 */
class User
{
    /**
     * @var PDO Database connection instance
     */
    private PDO $pdo;

    /**
     * Constructor to initialize PDO instance.
     *
     * @param PDO $pdo Database connection
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Finds a user by their ID.
     *
     * @param int $id User ID
     * @return array|false User data array or false if not found
     */
    public function findById(int $id): array|false
    {
        $stmt = $this->pdo->prepare("SELECT id, email, name, city, password FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    /**
     * Finds a user by their email.
     * Used mainly for login authentication.
     *
     * @param string $email User email
     * @return array|false User data array or false if not found
     */
    public function findByEmail(string $email): array|false
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch();
    }

    /**
     * Registers a new user with the provided data.
     *
     * @param string $email User email
     * @param string $name User name
     * @param string $city User city
     * @param string $passwordHash Hashed user password
     * @return bool True on successful insertion, false otherwise
     */
    public function create(string $email, string $name, string $city, string $passwordHash): bool
    {
        $stmt = $this->pdo->prepare("INSERT INTO users (email, name, city, password) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$email, $name, $city, $passwordHash]);
    }

    /**
     * Updates user information excluding password.
     *
     * @param int $id User ID
     * @param string $email User email
     * @param string $name User name
     * @param string $city User city
     * @return bool True on successful update, false otherwise
     */
    public function update(int $id, string $email, string $name, string $city): bool
    {
        $stmt = $this->pdo->prepare("UPDATE users SET email = ?, name = ?, city = ? WHERE id = ?");
        return $stmt->execute([$email, $name, $city, $id]);
    }

    /**
     * Changes the user's password.
     *
     * @param int $id User ID
     * @param string $passwordHash New hashed password
     * @return bool True on successful update, false otherwise
     */
    public function updatePassword(int $id, string $passwordHash): bool
    {
        $stmt = $this->pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
        return $stmt->execute([$passwordHash, $id]);
    }
}
