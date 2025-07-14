<?php

class Doctor {
    private $id;
    private $name;
    private $specialty;
    private $experience;
    private $qualification;
    private $languages;
    private $availability;

    public function __construct($id, $name, $specialty, $experience, $qualification, $languages, $availability) {
        $this->id = $id;
        $this->name = $name;
        $this->specialty = $specialty;
        $this->experience = $experience;
        $this->qualification = $qualification;
        $this->languages = $languages;
        $this->availability = $availability;
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getSpecialty() {
        return $this->specialty;
    }

    public function getExperience() {
        return $this->experience;
    }

    public function getQualification() {
        return $this->qualification;
    }

    public function getLanguages() {
        return $this->languages;
    }

    public function getAvailability() {
        return $this->availability;
    }

    public static function getAllDoctors($db) {
        $stmt = $db->prepare("SELECT * FROM doctors");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getDoctorById($db, $id) {
        $stmt = $db->prepare("SELECT * FROM doctors WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetchObject('Doctor');
    }
}

?>