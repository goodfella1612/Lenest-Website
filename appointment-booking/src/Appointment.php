<?php

class Appointment {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function createAppointment($userId, $doctorId, $date, $time) {
        $query = "INSERT INTO appointments (user_id, doctor_id, appointment_date, appointment_time) VALUES (:user_id, :doctor_id, :appointment_date, :appointment_time)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':doctor_id', $doctorId);
        $stmt->bindParam(':appointment_date', $date);
        $stmt->bindParam(':appointment_time', $time);
        return $stmt->execute();
    }

    public function getAppointmentsByUser($userId) {
        $query = "SELECT * FROM appointments WHERE user_id = :user_id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteAppointment($appointmentId) {
        $query = "DELETE FROM appointments WHERE id = :appointment_id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':appointment_id', $appointmentId);
        return $stmt->execute();
    }
}