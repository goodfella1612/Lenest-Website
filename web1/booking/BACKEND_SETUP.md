
# Backend Integration Setup

This document explains how to set up the PHP backend for the appointment booking system.

## Prerequisites

- PHP 7.4 or higher
- MySQL database
- Web server (Apache/Nginx) or PHP built-in server

## Setup Steps

1. **Database Configuration**
   - Update the database credentials in `../../appointment-booking/src/db.php`
   - Change the `$host`, `$db_name`, `$username`, and `$password` variables

2. **Initialize Database**
   - Run the setup script to create tables and insert sample data:
   ```bash
   php ../../appointment-booking/setup.php
   ```

3. **Start PHP Server (for development)**
   ```bash
   cd ../../
   php -S 0.0.0.0:8000
   ```

4. **Update API Configuration**
   - If running on a different port, update `config.js` with the correct API base URL

## API Endpoints

- `GET /appointment-booking/api/doctors.php` - Get all doctors
- `POST /appointment-booking/api/book_appointment.php` - Book an appointment

## Testing

1. Open the booking page in your browser
2. The doctors should load automatically from the database
3. Select a date and time, then click "BOOK APPOINTMENT"
4. You should see a success message if the booking is saved

## Troubleshooting

- Check browser console for any JavaScript errors
- Verify PHP server is running and accessible
- Check database connection in `db.php`
- Ensure CORS headers are properly set in the API files
