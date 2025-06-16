<?php
// controllers/ApiEventController.php

require_once __DIR__ . '/../models/Event.php';

class ApiEventController
{
    public function getEvents(): void
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');

        $pdo = require __DIR__ . '/../config/db.php';
        Event::setPDO($pdo);

        $events = Event::getAll(10, 0, [], 'event_date ASC');

        echo json_encode($events);
    }

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
}
