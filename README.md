Reforme — Pilates Studio Management Platform
Reforme is a fullstack mini SaaS MVP platform designed for Pilates studios and fitness instructors.
It provides class scheduling, recurring classes, client bookings, Stripe payments, instructor profiles, and automated email workflows.

Reforme is built with:

- Django + Django REST Framework (API)
- Next.js / React (frontend)
- MySQL 8 (database)
- Redis + RQ (background jobs)
- SendGrid (email)
- Stripe (payments)
- Docker for local development

🚀 Features
- Admin Dashboard
- Create, update, delete classes and recurring classes
- Manage instructors, class size, and clients
- View bookings and attendance lists

Client
- Create account
- Browse & Book classes
- Manage passes & subscriptions
- Receive confirmation/cancellation emails

---

# 📦 Local Development Setup

## 1️⃣ Clone the repository
- git clone [https://github.com/<your-username>/reforme.git](https://github.com/ramsers/reforme-desktop.git)
- cd reforme-desktop

## 2️⃣ Install dependencies
- npm install

## 3️⃣ Configure environment variables
- cp .env.example .env
- fill in .env values

## 4️⃣ Start development server
- npm run dev


