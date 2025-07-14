<?php
require_once '../src/db.php';
require_once '../src/Appointment.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['user_id'], $data['doctor_id'], $data['date'], $data['time'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$database = new Database();
$db = $database->getConnection();
$appointment = new Appointment($db);

$success = $appointment->createAppointment(
    $data['user_id'],
    $data['doctor_id'],
    $data['date'],
    $data['time']
);

if ($success) {
    // Mark the time slot as unavailable
    try {
        $stmt = $db->prepare("
            UPDATE time_slots 
            SET is_available = FALSE 
            WHERE doctor_id = ? AND date = ? AND time_slot = ?
        ");
        $stmt->execute([$data['doctor_id'], $data['date'], $data['time']]);
        
        echo json_encode(['success' => true, 'message' => 'Appointment booked successfully!']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Booking confirmed but slot update failed']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to book appointment.']);
}
