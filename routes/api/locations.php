<?php

require_once __DIR__ . '/../../models/Event.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$pdo = require __DIR__ . '/../../config/db.php';
Event::setPDO($pdo);

/**
 * Retrieve all distinct event locations from the database.
 */
$locations = Event::getAllLocations();
echo json_encode($locations);
