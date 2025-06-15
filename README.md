# 🚖 Uber Clone - MERN Stack Ride Hailing App

An Uber-like ride-hailing application built using the **MERN stack (MongoDB, Express, React, Node.js)** with **real-time features**, **JWT-based authentication**, and **geolocation support using Nominatim**.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (with React Router)
- **GSAP** for animations
- **Socket.IO Client** for real-time updates

### Backend
- **Node.js** with **Express**
- **MongoDB** with Mongoose
- **Socket.IO** for real-time communication
- **JWT (JSON Web Tokens)** for secure authentication
- **Nominatim API** for location search and coordinates

---

## 🔐 Features

### 👤 Authentication
- Secure login & registration using **JWT** tokens (access + refresh)
- Auth tokens are stored in **HTTP-only cookies** for protection against XSS

### 📍 Geolocation
- Search & select pickup/destination locations using **Nominatim**
- Displays nearby suggestions dynamically

### 🚗 Ride Booking System
- Select vehicle type
- See estimated distance and fare
- Confirm ride and wait for driver

### ⚡ Real-Time Updates
- Ride request notifications
- Driver search and ride status updates in **real-time** using **Socket.IO**

### 🎨 UI/UX
- Smooth UI with **GSAP** transitions
- Responsive design for both desktop and mobile

---
