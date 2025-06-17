<?php
session_start();

header("Content-Type: application/json");

require_once __DIR__ . '/../../controllers/ApiEventController.php';

$controller = new ApiEventController();

/**
 * Check for event ID in query parameters.
 * Return 400 error if missing.
 */
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing event id']);
    exit;
}

/**
 * Retrieve event by ID and output JSON response.
 */
$id = (int)$_GET['id'];
$controller->getEventById($id);
