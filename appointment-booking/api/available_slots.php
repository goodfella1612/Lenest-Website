
<?php
require_once '../src/db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$doctor_id = $_GET['doctor_id'] ?? null;
$date = $_GET['date'] ?? null;

if (!$doctor_id || !$date) {
    echo json_encode(['success' => false, 'message' => 'Doctor ID and date are required']);
    exit;
}

$database = new Database();
$db = $database->getConnection();

try {
    $stmt = $db->prepare("
        SELECT time_slot 
        FROM time_slots 
        WHERE doctor_id = ? AND date = ? AND is_available = TRUE 
        ORDER BY time_slot ASC
    ");
    $stmt->execute([$doctor_id, $date]);
    $slots = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    // Format time slots for display
    $formattedSlots = array_map(function($slot) {
        return date('g:i A', strtotime($slot));
    }, $slots);
    
    echo json_encode(['success' => true, 'slots' => $formattedSlots, 'raw_slots' => $slots]);
    
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
