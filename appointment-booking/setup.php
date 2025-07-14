
<?php
require_once 'src/db.php';

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    die("Database connection failed!");
}

// Create doctors table if it doesn't exist
$createDoctorsTable = "
CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty TEXT,
    experience VARCHAR(100),
    qualification VARCHAR(255),
    languages VARCHAR(255),
    availability VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

// Create time_slots table if it doesn't exist
$createTimeSlotsTable = "
CREATE TABLE IF NOT EXISTS time_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT NOT NULL,
    date DATE NOT NULL,
    time_slot TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
)";

// Create appointments table if it doesn't exist
$createAppointmentsTable = "
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
)";

// Create users table if it doesn't exist
$createUsersTable = "
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

try {
    $db->exec($createDoctorsTable);
    $db->exec($createTimeSlotsTable);
    $db->exec($createAppointmentsTable);
    $db->exec($createUsersTable);
    
    // Insert sample doctors if table is empty
    $checkDoctors = $db->query("SELECT COUNT(*) FROM doctors")->fetchColumn();
    
    if ($checkDoctors == 0) {
        $insertDoctors = "
        INSERT INTO doctors (name, specialty, experience, qualification, languages, availability) VALUES
        ('Dr Mukesh Gupta', 'Obstetrics, Gynecology & Reproductive Medicine', '15+ Years experience', 'MBBS, MD', 'English • Hindi', '10:00 - 15:00 • Mon - Fri'),
        ('Dr Amina', 'Pediatric Care & Child Development', '12+ Years experience', 'MBBS, MD (Pediatrics)', 'English • Hindi • Urdu', '09:00 - 14:00 • Mon - Sat')
        ";
        $db->exec($insertDoctors);
    }
    
    // Insert sample time slots if table is empty
    $checkSlots = $db->query("SELECT COUNT(*) FROM time_slots")->fetchColumn();
    
    if ($checkSlots == 0) {
        // Generate time slots for next 7 days for both doctors
        $today = new DateTime();
        for ($day = 0; $day < 7; $day++) {
            $currentDate = clone $today;
            $currentDate->add(new DateInterval("P{$day}D"));
            $dateStr = $currentDate->format('Y-m-d');
            
            // Dr. Mukesh Gupta (doctor_id = 1) - 10:00 to 15:00
            $startTime = new DateTime('10:00');
            $endTime = new DateTime('15:00');
            while ($startTime < $endTime) {
                $timeStr = $startTime->format('H:i:s');
                $insertSlot = "INSERT INTO time_slots (doctor_id, date, time_slot, is_available) VALUES (1, '$dateStr', '$timeStr', TRUE)";
                $db->exec($insertSlot);
                $startTime->add(new DateInterval('PT30M')); // Add 30 minutes
            }
            
            // Dr. Amina (doctor_id = 2) - 09:00 to 14:00
            $startTime = new DateTime('09:00');
            $endTime = new DateTime('14:00');
            while ($startTime < $endTime) {
                $timeStr = $startTime->format('H:i:s');
                $insertSlot = "INSERT INTO time_slots (doctor_id, date, time_slot, is_available) VALUES (2, '$dateStr', '$timeStr', TRUE)";
                $db->exec($insertSlot);
                $startTime->add(new DateInterval('PT30M')); // Add 30 minutes
            }
        }
    }

    // Insert a sample user if table is empty
    $checkUsers = $db->query("SELECT COUNT(*) FROM users")->fetchColumn();
    
    if ($checkUsers == 0) {
        $hashedPassword = password_hash('password123', PASSWORD_DEFAULT);
        $insertUser = "
        INSERT INTO users (username, email, password) VALUES
        ('guest_user', 'guest@lenest.com', '$hashedPassword')
        ";
        $db->exec($insertUser);
    }
    
    echo "Database setup completed successfully!";
    
} catch (PDOException $e) {
    echo "Error setting up database: " . $e->getMessage();
}
?>
