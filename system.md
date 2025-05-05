# OfficeHoursHub – System Design Documentation

## Real-World Problem

In many universities, students struggle to find out when and where professors hold office hours. Office hour schedules are often shared inconsistently (through emails, PDFs, hallway posters, or verbal announcements). This results in confusion, missed opportunities for help, and inefficient communication.

---

## Our Solution: OfficeHoursHub

OfficeHoursHub is a lightweight, fast, and mobile-friendly web tool that allows students to:

- View a live, centralized list of professor office hours
- Filter by professor name, course, and day
- Add new office hours through a simple floating form
- Delete entries instantly
- Use the app from any device without login or setup

The system is built entirely using Cloudflare’s developer platform for speed, edge delivery, and zero-server deployment.

---

## Functional Design

**User Roles:**  
- Students (or admins) can view, filter, add, and delete office hour entries

**Main Features:**
- Display all office hours in a clean card format
- Real-time filtering by day, professor, or course
- Add new office hours via a floating panel (sliding modal)
- Delete existing entries with a single click
- Toast notifications confirm all actions (success or error)
- Fully responsive layout for phones, tablets, and desktops

---

## Technical Design

### Frontend (Client)

- **Tech:** HTML, CSS, Vanilla JavaScript
- **Hosted on:** Cloudflare Pages
- **Responsibilities:**
  - Display and filter office hour entries
  - Send GET/POST/DELETE requests to the Worker API
  - Render new data dynamically
  - Show toast messages and handle basic form validation

### Backend (API)

- **Tech:** Cloudflare Workers (JavaScript runtime)
- **Exposed Endpoints:**
  - `GET /api/office-hours` → Returns all office hour entries
  - `POST /api/office-hours` → Inserts a new office hour
  - `DELETE /api/office-hours/:id` → Deletes an entry by ID
- **Runs at:** the edge (fast worldwide response time)

### Persistence (Database)

- **Database:** Cloudflare D1 (SQLite-based)
- **Table:** `office_hours`
- **Schema:**  
  - `id` (INT, auto-increment primary key)  
  - `professor` (TEXT)  
  - `course` (TEXT, optional)  
  - `day` (TEXT)  
  - `time` (TEXT)  
  - `location` (TEXT)  
  - `format` (TEXT – e.g. In-person/Zoom)  
  - `notes` (TEXT, optional)

### Example Query

```sql
SELECT * FROM office_hours WHERE day = 'Monday';
```

⸻

Deployment & Hosting
	•	Frontend: Deployed using Cloudflare Pages from GitHub
	•	API: Deployed using Cloudflare Workers via Wrangler CLI
	•	Database: Cloudflare D1 connected through wrangler.toml

All services are serverless and deploy instantly at the edge with zero configuration.


Summary

OfficeHoursHub provides a modern, fast, and clean solution to an outdated communication problem in academia. It showcases practical use of web networking, client-server interaction, REST API design, and edge computing with real-world tools.

This project is scalable, secure, and easy to maintain — and demonstrates full-stack application development using Cloudflare’s edge platform.