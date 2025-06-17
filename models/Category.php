<?php
/**
 * Category model handles interaction with the categories table.
 */
class Category
{
    /**
     * @var PDO|null Database connection instance
     */
    private static ?PDO $pdo = null;

    /**
     * Sets the PDO instance for database operations.
     *
     * @param PDO $pdo Database connection
     */
    public static function setPDO(PDO $pdo): void
    {
        self::$pdo = $pdo;
    }

    /**
     * Retrieves all categories ordered by name.
     *
     * @return array List of categories with id and name
     */
    public static function getAll(): array
    {
        $stmt = self::$pdo->query("SELECT id, name FROM categories ORDER BY name");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
