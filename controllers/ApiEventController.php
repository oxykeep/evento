<?php
require_once __DIR__ . '/../models/Event.php';

class ApiEventController
{
    /**
     * Retrieve and return a list of events with optional filters.
     * Outputs JSON response with events data.
     */
    public function getEvents(): void
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');

        $pdo = require __DIR__ . '/../config/db.php';
        Event::setPDO($pdo);

        $filters = [];

        if (!empty($_GET['location'])) {
            $filters['location'] = $_GET['location'];
        }

        if (!empty($_GET['date_from'])) {
            $filters['date_from'] = $_GET['date_from'];
        }

        if (!empty($_GET['date_to'])) {
            $filters['date_to'] = $_GET['date_to'];
        }

        if (!empty($_GET['category_id'])) {
            $filters['category_id'] = (int)$_GET['category_id'];
        }

        $events = Event::getAll(20, 0, $filters, 'event_date ASC');

        echo json_encode($events);
    }

    /**
     * Retrieve and return a single event by its ID.
     * Outputs JSON response with event data or error if not found.
     * 
     * @param int $id Event ID
     */
    public function getEventById(int $id): void
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');

        $pdo = require __DIR__ . '/../config/db.php';
        Event::setPDO($pdo);

        $event = Event::findById($id);

        if (!$event) {
            http_response_code(404);
            echo json_encode(['error' => 'Event not found']);
            return;
        }

        echo json_encode($event);
    }

    /**
     * Create a new event based on POST data.
     * Handles file upload for event image and validates required fields.
     * Outputs JSON response with success or error message.
     */
    public function createEvent(): void
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');

        $pdo = require __DIR__ . '/../config/db.php';
        Event::setPDO($pdo);

        $title = $_POST['title'] ?? null;
        $description = $_POST['description'] ?? null;
        $event_date = $_POST['date'] ?? null;
        $event_time = $_POST['time'] ?? null;
        $location = $_POST['location'] ?? null;
        $category_id = $_POST['category_id'] ?? null;

        $organizer_id = 1; // TODO: Replace with real user ID from session

        $required = compact('title', 'description', 'event_date', 'event_time', 'location', 'category_id');
        foreach ($required as $key => $value) {
            if (empty($value)) {
                http_response_code(422);
                echo json_encode(['error' => "Field $key is required"]);
                return;
            }
        }

        $imagePath = null;

        if (isset($_FILES['image'])) {
            $fileError = $_FILES['image']['error'];

            if ($fileError !== UPLOAD_ERR_OK) {
                http_response_code(400);
                echo json_encode(['error' => 'File upload error: code ' . $fileError]);
                return;
            }

            $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            $fileType = mime_content_type($_FILES['image']['tmp_name']);

            if (!in_array($fileType, $allowedTypes)) {
                http_response_code(415);
                echo json_encode(['error' => 'Unsupported file format']);
                return;
            }

            if (!is_uploaded_file($_FILES['image']['tmp_name'])) {
                http_response_code(400);
                echo json_encode(['error' => 'File was not uploaded correctly']);
                return;
            }

            $uploadDir = __DIR__ . '/../uploads/';

            if (!is_dir($uploadDir)) {
                if (!mkdir($uploadDir, 0755, true)) {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to create uploads directory']);
                    return;
                }
            }

            $filename = uniqid() . "_" . basename($_FILES['image']['name']);
            $target = $uploadDir . $filename;

            if (!move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to save uploaded file']);
                return;
            }

            $imagePath = $filename;
        }

        $event = new Event();
        $event->title = $title;
        $event->description = $description;
        $event->event_date = $event_date;
        $event->event_time = $event_time;
        $event->location = $location;
        $event->category_id = (int)$category_id;
        $event->organizer_id = $organizer_id;
        $event->image = $imagePath;

        if ($event->save()) {
            $event->id = $pdo->lastInsertId();

            http_response_code(201);
            echo json_encode(['message' => 'Event created', 'event_id' => $event->id]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to save event']);
        }
    }
}
