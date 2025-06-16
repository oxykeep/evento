<?php
// models/Comment.php

class Comment
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Get all comments for a specific event
    public function getByEventId(int $eventId): array
    {
        $stmt = $this->pdo->prepare(
            "SELECT c.id, c.comment, c.created_at, u.name AS author_name
             FROM comments c
             JOIN users u ON c.user_id = u.id
             WHERE c.event_id = ?
             ORDER BY c.created_at ASC"
        );
        $stmt->execute([$eventId]);
        return $stmt->fetchAll();
    }

    // Create a new comment
    public function create(int $userId, int $eventId, string $comment): bool
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO comments (user_id, event_id, comment, created_at) VALUES (?, ?, ?, NOW())"
        );
        return $stmt->execute([$userId, $eventId, $comment]);
    }

    // Delete a comment
    public function delete(int $id): bool
    {
        $stmt = $this->pdo->prepare("DELETE FROM comments WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
