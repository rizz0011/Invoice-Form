How to run:
1. Clone project to your system (git clone)
2. Install dependencies (npm i)
3. Run project in local (npm start)

Features & Functionality

1️. Login Page
User enters credentials and logs in.
After successful login, the user is redirected to the Dashboard page.
Protected Routes: Users cannot access the Dashboard without logging in. If they try, they are redirected to the Login Page.

2️. Dashboard Page
PDF Upload Section

Upload a PDF file.
Show the uploaded file name.
Store the file in localStorage for persistence.
Form Input Section

Users fill in required fields.
All entered data persists in localStorage, even after a page refresh.
If users change any value in the form, the changes are immediately updated and reflected in Display Data.

3️. Display Data Button
Clicking "Display Data":
Shows dummy data stored in localStorage.
Displays the latest form input data (reflects changes in real-time).
Shows the PDF preview using react-pdf.

4️. Logout Button
Clicking "Logout":
Clears localStorage (removes user session, form data, and PDF).
Redirects the user back to the Login Page.

5️. Data Persistence & Real-Time Updates
Form input data remains in text fields after refresh.
If users modify any input, the updated value appears in Display Data immediately.









