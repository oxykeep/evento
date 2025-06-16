<?php
// models/Event.php

class Event
{
    private static ?PDO $pdo = null;

    public $id;
    public $title;
    public $description;
    public $event_date;
    public $event_time;
    public $location;
    public $category_id;
    public $organizer_id;
    public $image;

    public static function setPDO(PDO $pdo)
    {
        self::$pdo = $pdo;
    }

    public static function getAll(int $limit = 10, int $offset = 0, array $filters = [], string $sort = 'event_date ASC'): array
    {
        $query = "SELECT * FROM events WHERE 1=1";
        $params = [];

        if (!empty($filters['category_id'])) {
            $query .= " AND category_id = ?";
            $params[] = $filters['category_id'];
        }

        if (!empty($filters['location'])) {
            $query .= " AND location LIKE ?";
            $params[] = '%' . $filters['location'] . '%';
        }

        if (!empty($filters['date'])) {
            $query .= " AND event_date = ?";
            $params[] = $filters['date'];
        }

        $query .= " ORDER BY $sort LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;

        $stmt = self::$pdo->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function findById(int $id): ?array
    {
        $stmt = self::$pdo->prepare("
            SELECT 
                e.*, 
                u.name AS organizer_name, 
                c.name AS category_name
            FROM events e
            JOIN users u ON e.organizer_id = u.id
            JOIN categories c ON e.category_id = c.id
            WHERE e.id = ?
        ");
        $stmt->execute([$id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ?: null;
    }

    public function save(): bool
    {
        if (!empty($this->id)) {
            $stmt = self::$pdo->prepare(
                "UPDATE events SET title = ?, description = ?, event_date = ?, event_time = ?, location = ?, category_id = ?, image = ? WHERE id = ?"
            );
            return $stmt->execute([
                $this->title,
                $this->description,
                $this->event_date,
                $this->event_time,
                $this->location,
                $this->category_id,
                $this->image,
                $this->id,
            ]);
        } else {
            $stmt = self::$pdo->prepare(
                "INSERT INTO events (title, description, event_date, event_time, location, category_id, organizer_id, image)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
            );
            $result = $stmt->execute([
                $this->title,
                $this->description,
                $this->event_date,
                $this->event_time,
                $this->location,
                $this->category_id,
                $this->organizer_id,
                $this->image,
            ]);
            if ($result) {
                $this->id = self::$pdo->lastInsertId();
            }
            return $result;
        }
    }

    public function delete(): bool
    {
        if (empty($this->id)) return false;
        $stmt = self::$pdo->prepare("DELETE FROM events WHERE id = ?");
        return $stmt->execute([$this->id]);
    }

    public static function getByUserId(int $userId): array
    {
        $stmt = self::$pdo->prepare("SELECT * FROM events WHERE organizer_id = ? ORDER BY event_date DESC");
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
