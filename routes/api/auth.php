<?php
// routes/api/auth.php

session_start();
header('Content-Type: application/json');

require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../models/User.php';

$userModel = new User($pdo);

function jsonResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    switch ($action) {
        case 'login':
            $email = trim($input['email'] ?? '');
            $password = $input['password'] ?? '';

            if (!$email || !$password) {
                jsonResponse(['status' => 'error', 'message' => 'Brak danych'], 400);
            }

            $user = $userModel->findByEmail($email);
            if ($user && password_verify($password, $user['password'])) {
                // Bezpieczne przypisanie danych do sesji
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];

                jsonResponse([
                    'status' => 'success',
                    'user' => [
                        'id' => $user['id'],
                        'name' => $user['name'],
                        'email' => $user['email'],
                        'city' => $user['city'] ?? '',
                    ]
                ]);
            }

            jsonResponse(['status' => 'error', 'message' => 'Nieprawidłowy email lub hasło'], 401);
            break;

        case 'register':
            $name = trim($input['name'] ?? '');
            $email = trim($input['email'] ?? '');
            $city = trim($input['city'] ?? '');
            $password = $input['password'] ?? '';
            $password_confirm = $input['password_confirm'] ?? '';
            $errors = [];

            if (!$name) $errors[] = "Imię jest wymagane.";
            if (!$city) $errors[] = "Miasto jest wymagane.";
            if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Nieprawidłowy e-mail.";
            if (!$password) $errors[] = "Hasło jest wymagane.";
            if ($password !== $password_confirm) $errors[] = "Hasła nie są zgodne.";

            if (!empty($errors)) {
                jsonResponse(['status' => 'error', 'errors' => $errors], 400);
            }

            if ($userModel->findByEmail($email)) {
                jsonResponse(['status' => 'error', 'message' => 'Ten e-mail jest już zarejestrowany.'], 409);
            }

            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            if ($userModel->create($email, $name, $city, $passwordHash)) {
                $newUser = $userModel->findByEmail($email);
                $_SESSION['user_id'] = $newUser['id'];
                $_SESSION['user_name'] = $newUser['name'];

                jsonResponse([
                    'status' => 'success',
                    'message' => 'Konto utworzone pomyślnie.',
                    'user' => [
                        'id' => $newUser['id'],
                        'name' => $newUser['name'],
                        'email' => $newUser['email'],
                        'city' => $newUser['city'],
                    ]
                ], 201);
            }

            jsonResponse(['status' => 'error', 'message' => 'Błąd podczas tworzenia konta.'], 500);
            break;

        default:
            jsonResponse(['status' => 'error', 'message' => 'Nieznana akcja'], 400);
    }

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    switch ($action) {
        case 'me':
            if (isset($_SESSION['user_id'])) {
                $user = $userModel->findById($_SESSION['user_id']);
                if (!$user) {
                    // Sesja jest ustawiona, ale użytkownik nie istnieje (np. usunięty)
                    $_SESSION = [];
                    session_destroy();
                    jsonResponse(['status' => 'error', 'message' => 'Sesja nieważna'], 401);
                }
                jsonResponse([
                    'status' => 'success',
                    'user' => [
                        'id' => $user['id'],
                        'name' => $user['name'],
                        'email' => $user['email'],
                        'city' => $user['city'] ?? '',
                    ],
                ]);
            } else {
                jsonResponse(['status' => 'error', 'message' => 'Nie zalogowano'], 401);
            }
            break;

        case 'logout':
            // Usuń sesję i ciasteczko sesji
            $_SESSION = [];

            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                // Dodatkowo ustaw domain i path z configu, jeśli masz (dopasuj do swojej domeny i ścieżki)
                setcookie(session_name(), '', time() - 42000,
                    $params["path"], $params["domain"],
                    $params["secure"], $params["httponly"]
                );
            }

            session_destroy();

            jsonResponse(['status' => 'success', 'message' => 'Wylogowano pomyślnie.']);
            break;

        default:
            jsonResponse(['status' => 'error', 'message' => 'Nieznana akcja'], 400);
    }
} else {
    jsonResponse(['status' => 'error', 'message' => 'Nieobsługiwana metoda'], 405);
}
