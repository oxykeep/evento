<?php
// routes/api/events.php
session_start();

header("Content-Type: application/json");

require_once __DIR__ . '/../../controllers/ApiEventController.php';

$controller = new ApiEventController();
$controller->getEvents();
