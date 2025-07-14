
// Configuration for the booking system
const BookingConfig = {
    // API endpoints
    API_BASE_URL: window.location.protocol + '//' + window.location.host + '/appointment-booking/api',
    
    // Default settings
    DEFAULT_USER_ID: 1, // In a real app, this would come from authentication
    
    // Phone numbers
    HOSPITAL_PHONE: '+91 7045340141',
    HOSPITAL_PHONE_ALT: '+91 8104516661'
};

// Make config globally available
window.BookingConfig = BookingConfig;
