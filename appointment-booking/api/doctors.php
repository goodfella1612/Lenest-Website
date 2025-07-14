<?php
require_once '../src/db.php';
require_once '../src/Doctor.php';

header('Content-Type: application/json');
// Allow CORS for development (adjust origin as needed)
header('Access-Control-Allow-Origin: *');

$database = new Database();
$db = $database->getConnection();
$doctors = Doctor::getAllDoctors($db);

// Convert objects to arrays if needed
if (is_array($doctors) && count($doctors) > 0 && is_object($doctors[0])) {
    $doctors = array_map(function($doc) {
        return [
            'id' => $doc->id ?? null,
            'name' => $doc->name ?? '',
            'specialty' => $doc->specialty ?? '',
            'experience' => $doc->experience ?? '',
            'qualification' => $doc->qualification ?? '',
            'languages' => $doc->languages ?? '',
            'availability' => $doc->availability ?? '',
            // Add more fields as needed
        ];
    }, $doctors);
}

echo json_encode($doctors);
