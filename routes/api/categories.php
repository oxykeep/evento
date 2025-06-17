<?php
require_once __DIR__ . '/../../models/Category.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$pdo = require __DIR__ . '/../../config/db.php';

Category::setPDO($pdo);

/**
 * Retrieve all categories from the database.
 *
 * @return array List of categories.
 */
$categories = Category::getAll();

echo json_encode($categories);
