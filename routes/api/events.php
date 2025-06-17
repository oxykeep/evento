<?php
session_start();

header("Content-Type: application/json");

require_once __DIR__ . '/../../controllers/ApiEventController.php';

$controller = new ApiEventController();

/**
 * Handle GET and POST requests for events.
 * GET: Retrieve list of events.
 * POST: Create a new event.
 * Other methods respond with 405 Method Not Allowed.
 */
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $controller->getEvents();
} elseif ($method === 'POST') {
    $controller->createEvent();
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
