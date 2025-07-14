
document.addEventListener('DOMContentLoaded', function() {
    // Date button functionality
    const dateButtons = document.querySelectorAll('.date-btn');
    const timeButtons = document.querySelectorAll('.time-btn');
    const callButtons = document.querySelectorAll('.call-btn');
    const bookButtons = document.querySelectorAll('.book-appointment-btn');

    // Backend API base URL from config
    const API_BASE_URL = window.BookingConfig ? window.BookingConfig.API_BASE_URL : '/appointment-booking/api';

    // Load doctors from backend
    loadDoctorsFromAPI();

    // Handle date selection
    dateButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from siblings within the same card
            const parentCard = this.closest('.doctor-card');
            const siblingDates = parentCard.querySelectorAll('.date-btn');
            siblingDates.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });

    // Handle time selection
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from siblings within the same card
            const parentCard = this.closest('.doctor-card');
            const siblingTimes = parentCard.querySelectorAll('.time-btn');
            siblingTimes.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });

    // Handle call button clicks
    callButtons.forEach(button => {
        button.addEventListener('click', function() {
            // You can add phone call functionality here
            const phoneNumber = window.BookingConfig ? window.BookingConfig.HOSPITAL_PHONE : '+91 7045340141';
            alert(`Calling Le Nest Hospital: ${phoneNumber}`);
        });
    });

    // Handle book appointment button clicks
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentCard = this.closest('.doctor-card');
            const doctorName = parentCard.querySelector('.doctor-name').textContent;
            const doctorId = parentCard.dataset.doctorId;
            const selectedDate = parentCard.querySelector('.date-btn.active');
            const selectedTime = parentCard.querySelector('.time-btn.active');
            
            if (selectedDate && selectedTime) {
                const dateValue = selectedDate.dataset.date;
                const timeValue = selectedTime.textContent;
                
                // Book appointment via API
                bookAppointment(doctorId, doctorName, dateValue, timeValue);
            } else {
                alert('Please select both date and time before booking.');
            }
        });
    });

    // Hamburger menu functionality (reuse from main site)
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }

    // Update dates to show current week
    updateDatesToCurrentWeek();

    // Load doctors from backend API
    async function loadDoctorsFromAPI() {
        try {
            const response = await fetch(`${API_BASE_URL}/doctors.php`);
            const doctors = await response.json();
            
            if (doctors && doctors.length > 0) {
                // Update doctor cards with real data
                updateDoctorCards(doctors);
            }
        } catch (error) {
            console.error('Error loading doctors:', error);
            // Keep static doctor data as fallback
        }
    }

    // Update doctor cards with API data
    function updateDoctorCards(doctors) {
        const doctorCards = document.querySelectorAll('.doctor-card');
        
        doctors.forEach((doctor, index) => {
            if (doctorCards[index]) {
                const card = doctorCards[index];
                
                // Set doctor ID for booking
                card.dataset.doctorId = doctor.id;
                
                // Update doctor information
                const nameElement = card.querySelector('.doctor-name');
                const specialtyElement = card.querySelector('.doctor-specialty');
                const experienceElement = card.querySelector('.doctor-experience');
                const qualificationElement = card.querySelector('.doctor-qualification');
                const languagesElement = card.querySelector('.info-item span:contains("English")');
                const availabilityElement = card.querySelector('.info-item span:contains("10:00")');
                
                if (nameElement) nameElement.textContent = doctor.name;
                if (specialtyElement) specialtyElement.textContent = doctor.specialty;
                if (experienceElement) experienceElement.textContent = doctor.experience;
                if (qualificationElement) qualificationElement.textContent = doctor.qualification;
                if (languagesElement) languagesElement.textContent = doctor.languages || 'English • Hindi';
                if (availabilityElement) availabilityElement.textContent = doctor.availability || '10:00 - 15:00 • Mon - Fri';
            }
        });
    }

    // Book appointment via API
    async function bookAppointment(doctorId, doctorName, date, time) {
        try {
            // Get user ID from config or default
            const userId = window.BookingConfig ? window.BookingConfig.DEFAULT_USER_ID : 1;
            
            const response = await fetch(`${API_BASE_URL}/book_appointment.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    doctor_id: doctorId,
                    date: date,
                    time: time
                })
            });

            const result = await response.json();

            if (result.success) {
                alert(`Appointment booked successfully!\n\nDetails:\nDoctor: ${doctorName}\nDate: ${date}\nTime: ${time}\n\nYou will receive a confirmation shortly.`);
                
                // Optional: Reset the form or redirect
                // window.location.href = '../index.html';
            } else {
                alert(`Failed to book appointment: ${result.message}\n\nPlease try again or contact us at +91 7045340141`);
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('There was an error booking your appointment. Please try again or contact us directly at +91 7045340141');
        }
    }
});

function updateDatesToCurrentWeek() {
    const today = new Date();
    const dateButtons = document.querySelectorAll('.date-btn');
    
    dateButtons.forEach((button, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() + index);
        
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNumber = date.getDate();
        const fullDate = date.toISOString().split('T')[0];
        
        button.dataset.date = fullDate;
        button.querySelector('.day').textContent = dayName;
        button.querySelector('.date').textContent = dayNumber;
    });
}
