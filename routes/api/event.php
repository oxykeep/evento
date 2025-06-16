<?php
// routes/api/event.php
session_start();

header("Content-Type: application/json");

require_once __DIR__ . '/../../controllers/ApiEventController.php';

$controller = new ApiEventController();

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing event id']);
    exit;
}

$id = (int)$_GET['id'];
$controller->getEventById($id);
