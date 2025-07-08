
document.addEventListener('DOMContentLoaded', function() {
    // Date button functionality
    const dateButtons = document.querySelectorAll('.date-btn');
    const timeButtons = document.querySelectorAll('.time-btn');
    const callButtons = document.querySelectorAll('.call-btn');
    const bookButtons = document.querySelectorAll('.book-appointment-btn');

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
            alert('Call functionality will be implemented with backend');
        });
    });

    // Handle book appointment button clicks
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentCard = this.closest('.doctor-card');
            const doctorName = parentCard.querySelector('.doctor-name').textContent;
            const selectedDate = parentCard.querySelector('.date-btn.active');
            const selectedTime = parentCard.querySelector('.time-btn.active');
            
            if (selectedDate && selectedTime) {
                const dateValue = selectedDate.dataset.date;
                const timeValue = selectedTime.textContent;
                
                alert(`Appointment booking will be implemented with backend.\n\nDetails:\nDoctor: ${doctorName}\nDate: ${dateValue}\nTime: ${timeValue}`);
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

    // Update dates to show current week (optional enhancement)
    updateDatesToCurrentWeek();
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
