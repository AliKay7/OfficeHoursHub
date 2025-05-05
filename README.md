# OfficeHoursHub

OfficeHoursHub is a full-stack web application that helps students discover, add, and manage professor office hours. It solves the real-world problem of students not knowing when and where professors are available. The project demonstrates practical web networking, API design, and client-server interaction.

Built using Cloudflare Pages (frontend), Cloudflare Workers (API), and Cloudflare D1 (SQLite) for persistence.

---

## 🚀 Features

- View a list of professor office hours
- Filter by professor name, course, and day of the week
- Add new office hours using a floating sliding panel
- Delete office hours instantly
- Toast notifications for success and errors
- Fully responsive and mobile-friendly design

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla), Cloudflare Pages
- **Backend/API:** Cloudflare Workers
- **Database:** Cloudflare D1 (SQLite)
- **Deployment:** GitHub + Cloudflare

---

## 📁 Project Structure

OfficeHoursHub/
├── site/
│   ├── index.html        → Main frontend layout
│   ├── style.css         → CSS styling
│   └── main.js           → JavaScript logic for fetch/UI
├── worker/
│   ├── index.js          → Cloudflare Worker API (GET, POST, DELETE)
│   └── wrangler.toml     → Worker config with D1 binding
├── schema.sql            → SQL schema for D1
└── README.md             → Project documentation

---

## 🌐 Live Demo

- Frontend: https://officehourshub.pages.dev  
- API: https://officehourshub-api.alielhadi7.workers.dev/api/office-hours

---

## 🧾 Database Schema (D1)

```sql
CREATE TABLE IF NOT EXISTS office_hours (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  professor TEXT NOT NULL,
  course TEXT,
  day TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  format TEXT NOT NULL,
  notes TEXT
);
```


📦 How to Run Locally

1. Clone the Repo

`git clone https://github.com/AliKay7/officehourshub.git
cd officehourshub`

2. Run the API (Cloudflare Worker)

`cd worker
wrangler dev`

3. Open the Frontend

You can open site/index.html in your browser or use a local server like:

`npx serve site`



⚙️ Deployment

**Worker (API)**

`cd worker
wrangler deploy`

**Frontend** (Cloudflare Pages)

Push to your GitHub repository. Cloudflare Pages will automatically redeploy.


🧠 System Design
	•	The frontend is deployed at the edge using Cloudflare Pages
	•	The API (Worker) handles GET, POST, DELETE requests to manage data
	•	Office hour data is stored in a SQLite-backed D1 database
	•	The frontend dynamically fetches and renders content from the API
	•	Toasts, filters, and a floating panel provide a modern user experience


👨‍💻 Author

Ali Kawtharani
GitHub


📄 License

MIT License
