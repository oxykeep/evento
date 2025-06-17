<?php
/**
 * Event model handles interaction with the events table.
 */
class Event
{
    /**
     * @var PDO|null Database connection instance
     */
    private static ?PDO $pdo = null;

    public $id;
    public $title;
    public $description;
    public $event_date;
    public $event_time;
    public $location;
    public $category_id;
    public $organizer_id;
    public $image;  // Path to the event image

    /**
     * Sets the PDO instance for database operations.
     *
     * @param PDO $pdo Database connection
     */
    public static function setPDO(PDO $pdo)
    {
        self::$pdo = $pdo;
    }

    /**
     * Saves the current event instance to the database.
     *
     * @return bool True on success, false otherwise
     */
    public function save(): bool
    {
        $stmt = self::$pdo->prepare("
            INSERT INTO events (title, description, event_date, event_time, location, category_id, organizer_id, image)
            VALUES (:title, :description, :event_date, :event_time, :location, :category_id, :organizer_id, :image)
        ");

        return $stmt->execute([
            ':title' => $this->title,
            ':description' => $this->description,
            ':event_date' => $this->event_date,
            ':event_time' => $this->event_time,
            ':location' => $this->location,
            ':category_id' => $this->category_id,
            ':organizer_id' => $this->organizer_id,
            ':image' => $this->image,  // Path to the image file
        ]);
    }

    /**
     * Retrieves all events with optional filtering, sorting, and pagination.
     *
     * @param int $limit Number of records to fetch
     * @param int $offset Offset for pagination
     * @param array $filters Associative array of filters (category_id, location, date_from, date_to)
     * @param string $sort Sorting order, e.g. 'event_date ASC'
     * @return array List of events matching criteria
     */
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

        if (!empty($filters['date_from'])) {
            $query .= " AND event_date >= ?";
            $params[] = $filters['date_from'];
        }

        if (!empty($filters['date_to'])) {
            $query .= " AND event_date <= ?";
            $params[] = $filters['date_to'];
        }

        $query .= " ORDER BY $sort LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;

        $stmt = self::$pdo->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Finds a single event by its ID, including organizer and category names.
     *
     * @param int $id Event ID
     * @return array|null Event data or null if not found
     */
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

    /**
     * Deletes the event with the current instance's ID.
     *
     * @return bool True on success, false otherwise
     */
    public function delete(): bool
    {
        if (empty($this->id)) return false;
        $stmt = self::$pdo->prepare("DELETE FROM events WHERE id = ?");
        return $stmt->execute([$this->id]);
    }

    /**
     * Retrieves all events organized by a specific user.
     *
     * @param int $userId Organizer user ID
     * @return array List of events organized by the user
     */
    public static function getByUserId(int $userId): array
    {
        $stmt = self::$pdo->prepare("SELECT * FROM events WHERE organizer_id = ? ORDER BY event_date DESC");
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Retrieves all distinct event locations.
     *
     * @return array List of unique event locations
     */
    public static function getAllLocations(): array
    {
        $stmt = self::$pdo->query("SELECT DISTINCT location FROM events ORDER BY location ASC");
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
}
