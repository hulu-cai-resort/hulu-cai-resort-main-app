# 📄 Hulu Cai Resort – Project Specs

## 🧾 Overview

**Hulu Cai Resort** is a nature-inspired resort aiming to provide visitors with a relaxing and memorable experience.  
This project is a company profile website designed to introduce the resort to potential guests and simplify the room booking process.

## 🎯 Objectives

- Showcase Hulu Cai Resort’s facilities and services.
- Deliver a responsive and modern user experience.
- Simplify the booking process through a streamlined form and CMS integration.
- Provide flexible and scalable content management.
- Ensure maintainability with a modern tech stack and clear project structure.

## 🔧 Tech Stack

- **Next.js 15.3** – Frontend framework using App Router and server actions.
- **Payload CMS** – Headless CMS to manage content and bookings.
- **PostgreSQL** – Relational database used with Payload.
- **Tailwind CSS 3.4.3** – Utility-first CSS framework.
- **Shadcn UI** – UI component library based on Radix and Tailwind CSS.

## 🧱 Project Structure

This project was initialized using [`create-payload-app`](https://github.com/payloadcms/payload/tree/main/packages/create-payload-app), following a monorepo architecture:

```
apps/
└── web/                  # Next.js frontend application

cms/
├── payload.config.ts     # Payload CMS configuration
├── collections/          # Payload collections (e.g., Rooms, Bookings)
└── globals/              # Global site data (e.g., Hero, Footer, Site metadata)
```

## 📦 Features

### 🏞 Resort Showcase

- Hero section with CTA
- Image gallery for rooms, environment, and activities
- Testimonials and user reviews
- Embedded map for location

### 📅 Booking System

- List and detail view for rooms
- Booking form connected to Payload CMS
- Store booking entries in Postgres via CMS
- Future support for booking confirmation or email notifications

### 📝 CMS-Driven Pages

- Rooms and packages
- About us, contact, FAQs
- Blog or news (optional)
- SEO metadata per page and global

### 🎨 UI/UX

- Mobile-first responsive layout
- Tailwind-based styling
- Shadcn UI for modern and accessible components (buttons, inputs, modals, etc.)

## ✅ Development Milestones

| Phase   | Description                                   |
| ------- | --------------------------------------------- |
| Phase 1 | Set up Payload CMS and define collections     |
| Phase 2 | Build frontend layout and route structure     |
| Phase 3 | Integrate booking form with CMS               |
| Phase 4 | Add SEO, testing, and optimize for production |

## 🔐 Security Notes

- CMS admin protected using environment credentials.
- User inputs validated and sanitized before storing.
- Booking form will support spam protection and basic rate limiting.

## 🌍 Deployment Strategy

- **Frontend (Next.js)**: Deployed via Vercel.
- **Backend (Payload CMS + Postgres)**: Deployed via Railway, Render, or VPS.

## 🧠 References

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Payload GitHub](https://github.com/payloadcms/payload)
- [Shadcn UI](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
