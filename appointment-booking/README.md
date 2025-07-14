# Appointment Booking Backend API

This project is a PHP & MySQL backend API for appointment booking. It is designed to be used with a separate frontend (HTML/CSS/JS), which can be in another repository or directory.

## Project Structure

```
appointment-booking
├── api
│   ├── doctors.php           # API endpoint: returns all doctors as JSON
│   └── book_appointment.php  # API endpoint: books an appointment via POST
├── src
│   ├── db.php                # Database connection and query execution
│   ├── Appointment.php       # Class for managing appointment data
│   ├── Doctor.php            # Class for managing doctor data
│   └── User.php              # Class for managing user data (optional)
├── config
│   └── config.php            # Configuration settings for the application
├── sql
│   └── schema.sql            # SQL statements for creating database tables
├── public
│   └── .htaccess             # (Optional) Apache config for API routing/security
└── README.md                 # Project documentation
```

## Installation & Local Setup

1. **Clone this repository:**
   ```sh
   git clone <this-repo-url>
   cd appointment-booking
   ```

2. **Set up the database:**
   - Create a MySQL database (e.g., `appointment_db`).
   - Import the schema:
     ```sh
     mysql -u root -p appointment_db < sql/schema.sql
     ```

3. **Configure the backend:**
   - Edit `config/config.php` and/or `src/db.php` to match your MySQL credentials.

4. **Start Apache:**
   - Ensure Apache is running and the document root includes this repo (or at least the `api/` endpoints are accessible).

5. **Test the API:**
   - Visit `http://localhost/appointment-booking/api/doctors.php` in your browser. You should see a JSON array of doctors (empty if none in DB).
   - Use a tool like Postman or `curl` to POST to `api/book_appointment.php`.

## Connecting to Your Frontend

1. **Frontend Location:**
   - Your frontend can be in a separate repo or directory (e.g., `../frontend-app`).
   - You can run the frontend with a local server (e.g., `live-server`, `http-server`, or similar).

2. **How to Connect:**
   - In your frontend JavaScript, use `fetch` to call the backend API endpoints:
     - `GET http://localhost/appointment-booking/api/doctors.php` to get doctor data.
     - `POST http://localhost/appointment-booking/api/book_appointment.php` to book an appointment.
   - Example fetch for doctors:
     ```js
     fetch('http://localhost/appointment-booking/api/doctors.php')
       .then(res => res.json())
       .then(doctors => {/* render cards */});
     ```
   - Example fetch for booking:
     ```js
     fetch('http://localhost/appointment-booking/api/book_appointment.php', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         user_id: 1, // or from your auth system
         doctor_id: 2,
         date: '2025-07-10',
         time: '10:00'
       })
     })
     .then(res => res.json())
     .then(result => {/* show success/failure */});
     ```

3. **CORS:**
   - The backend API already sends `Access-Control-Allow-Origin: *` headers for local development. If you deploy, restrict this as needed.

4. **Running Both Locally:**
   - Start your backend (Apache/PHP) and frontend (e.g., with `live-server` or `npm run dev`) on your machine.
   - Make sure the API URLs in your frontend match the backend's local address.

## Next Steps

- Add doctors to your database for testing.
- Connect your frontend to the API as described above.
- Remove any unused files from `public/` (e.g., old HTML, CSS, JS) to keep this repo backend-only.

## License

This project is licensed under the MIT License. See the LICENSE file for details.