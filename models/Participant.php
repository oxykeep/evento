<?php
// models/Participant.php

class Participant
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Add a user as participant to an event
    public function addParticipant(int $userId, int $eventId): bool
    {
        $stmt = $this->pdo->prepare("INSERT IGNORE INTO participants (user_id, event_id) VALUES (?, ?)");
        return $stmt->execute([$userId, $eventId]);
    }

    // Remove participant from an event
    public function removeParticipant(int $userId, int $eventId): bool
    {
        $stmt = $this->pdo->prepare("DELETE FROM participants WHERE user_id = ? AND event_id = ?");
        return $stmt->execute([$userId, $eventId]);
    }

    // Check if a user is a participant of an event
    public function isParticipant(int $userId, int $eventId): bool
    {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM participants WHERE user_id = ? AND event_id = ?");
        $stmt->execute([$userId, $eventId]);
        return $stmt->fetchColumn() > 0;
    }

    // Get all participants of a specific event
    public function getParticipantsByEvent(int $eventId): array
    {
        $stmt = $this->pdo->prepare(
            "SELECT u.id, u.name, u.email
             FROM participants p
             JOIN users u ON p.user_id = u.id
             WHERE p.event_id = ?"
        );
        $stmt->execute([$eventId]);
        return $stmt->fetchAll();
    }
}
