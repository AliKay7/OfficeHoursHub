CREATE TABLE office_hours (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  professor TEXT NOT NULL,
  course TEXT,
  day TEXT,
  time TEXT,
  location TEXT,
  format TEXT,
  notes TEXT
);