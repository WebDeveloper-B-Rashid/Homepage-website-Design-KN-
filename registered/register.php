<?php

header('Content-Type: application/json');

// Function to sanitize and validate input
function validate_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$response = [
    'success' => false,
    'message' => 'An unknown error occurred.'
];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $name = validate_input($_POST['name'] ?? '');
    $email = validate_input($_POST['email'] ?? '');
    $password = $_POST['password'] ?? ''; // Do not sanitize password with htmlspecialchars

    // Server-side validation
    if (empty($name) || empty($email) || empty($password)) {
        $response['message'] = 'All fields are required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email format.';
    } elseif (strlen($password) < 6) {
        $response['message'] = 'Password must be at least 6 characters long.';
    } else {
        // Here you would typically connect to a database
        // and store the user data. For this example, we'll
        // save to a simple text file.

        // WARNING: This is NOT secure for a real application.
        // Passwords should always be hashed (e.g., using password_hash()).
        $data_to_store = "Name: $name, Email: $email, Password: $password" . PHP_EOL;
        
        // Open the file in append mode
        if (file_put_contents('users.txt', $data_to_store, FILE_APPEND | LOCK_EX) !== false) {
            $response['success'] = true;
            $response['message'] = 'Registration successful! Data stored.';
        } else {
            $response['message'] = 'Could not save data. Please try again.';
        }
    }
} else {
    $response['message'] = 'Invalid request method.';
}

echo json_encode($response);
?>