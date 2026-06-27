# 🧾 Smart Invoice

A modern **full-stack invoice management system** built using **React, Node.js, Express.js, and MongoDB**. The application enables users to create, manage, search, and view invoices with an intuitive interface. It also includes **QR code generation**, allowing invoices to be quickly accessed by scanning the generated QR code.

---

## ✨ Features

*  Create professional invoices
*  Add sender and recipient details
*  Dynamically add multiple invoice items
*  Automatic subtotal and grand total calculation
*  Save invoices to MongoDB
*  View all saved invoices
*  Search invoices by Invoice Number
*  Delete invoices
*  Generate QR code for every invoice
*  Scan QR code to instantly open the invoice details page
*  Dark / Light Mode
*  Responsive user interface

---

## 📸 Project Screenshots

> Add your screenshots below.

### Create Invoice

<img width="1328" height="881" alt="Screenshot 2026-06-27 184819" src="https://github.com/user-attachments/assets/63863073-aa92-453e-8a65-ba0a0e2d8b02" />

### Saved Invoices

<img width="995" height="881" alt="Screenshot 2026-06-27 184842" src="https://github.com/user-attachments/assets/0d100458-4962-4fec-8dd5-876a7cde035f" />


### QR Code Invoice View

<img width="1453" height="870" alt="Screenshot 2026-06-27 184903" src="https://github.com/user-attachments/assets/cf92501b-ee12-4086-8f2c-65ecba6b9f95" />


## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* QRCode React

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

---

## 📂 Project Structure

```
smart_invoice/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Srushti-K-03/smart-invoice.git
```

### 2️⃣ Install frontend dependencies

```bash
cd client
npm install
```

### 3️⃣ Install backend dependencies

```bash
cd ../server
npm install
```

### 4️⃣ Configure MongoDB

Create a `.env` file inside the **server** folder.

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## ▶️ Run the Project

### Start Backend

```bash
cd server
npm start
```

### Start Frontend

```bash
cd client
npm start
```

The application will be available at:

```
Frontend : http://localhost:3000
Backend  : http://localhost:5000
```

---

## 💡 Future Enhancements

* PDF Invoice Download
* Email Invoice
* Invoice Status (Paid / Pending)
* User Authentication
* Analytics Dashboard
* GST & Tax Calculation

---

## 👩‍💻 Author

**Srushti K**

Computer Science Engineering Student

GitHub: https://github.com/Srushti-K-03
