
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
