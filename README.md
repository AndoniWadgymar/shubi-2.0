# SHUBI 2.0

Shubi 2.0 is a full-stack web application for managing classes, coaches, and locations. Built using Django REST Framework (DRF) as the backend API and React (Vite) as the frontend, it enables uploading class data from Excel, visualizing class performance, managing coaches, and analyzing location trends via interactive charts.

## 🛠️ Tech Stack

- **Backend**: Django + Django REST Framework
- **Frontend**: React + Vite
- **Database**: SQLite (for development)
- **Charting**: Recharts (React)

---

## 📁 Project Structure

```
SHUBI-2.0/
├── backend/
│   ├── backend/              # Django settings and root urls
│   ├── classes/              # App for handling class data
│   ├── coaches/              # App for managing coaches
│   ├── locations/            # App for storing locations
│   ├── uploads/              # File upload and parsing
│   ├── db.sqlite3            # SQLite database
│   └── manage.py
├── frontend/
│   ├── public/
│   ├── src/                  # React code (pages, components)
│   ├── index.html
│   └── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/shubi-2.0.git
cd shubi-2.0
```

---

## 🐍 Backend Setup (Django)

### 2. Create and activate virtual environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install requirements

```bash
pip install -r requirements.txt
```

### 4. Run migrations and start server

```bash
python manage.py migrate
python manage.py runserver
```

API will be running at: `http://localhost:8000`

---

## ⚛️ Frontend Setup (React + Vite)

### 5. Install dependencies

```bash
cd frontend
npm install
```

### 6. Start development server

```bash
npm run dev
```

App will be running at: `http://localhost:5173`

---

## 🧾 Features

- ✅ Upload Excel class reports
- ✅ View and manage class, coach, and location data
- ✅ Visual charts showing:
  - Monthly sales per location
  - Locations with most clients
- ✅ Add/edit/delete coaches
- ✅ Fully responsive design with soft pink palette

---

## 📊 Sample Charts (on Dashboard)

- **Bar Chart**: Total sales by month grouped by location
- **Pie/Bar Chart**: Locations with the highest number of clients

---

## 🔐 Environment Variables

Create a `.env` file inside `backend/` (if needed):

```env
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
```

You can also store frontend environment variables in `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

---

## 🧪 Testing

You can test API endpoints using tools like Postman or via the Django admin/API browser (`http://localhost:8000/api/`).

---

## 📦 Future Improvements

- Add authentication for admin access
- Export reports as Excel or PDF
- Add pagination and filtering
- Replace SQLite with PostgreSQL in production

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to change.

---

## 📝 License

[MIT](LICENSE)
