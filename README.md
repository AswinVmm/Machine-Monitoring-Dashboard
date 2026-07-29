# IIoT Machine Monitoring Dashboard

A simplified factory-floor monitoring dashboard for a plant supervisor to view
machine health at a glance and acknowledge faults. Backend is Node.js +
Express (in-memory data store). Frontend is React + Redux Toolkit.

## Project structure
iiot-project/
backend/ Node.js + Express API
frontend/ React + Redux Toolkit app

## Prerequisites
- Node.js 18+ and npm installed

## Setup & Run

### 1. Backend
```bash
cd backend
npm install
npm start/run dev
```
API runs at `http://localhost:5000`.

Quick check:
```bash
curl http://localhost:5000/api/machines
```

### 2. Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173`.

The frontend reads the API base URL from `frontend/.env`:VITE_API_URL=http://localhost:5000

Update this if the backend runs on a different host/port.

> Note: run both servers at once, in separate terminals. Test API endpoints
  directly on port 5000 (e.g. in Postman).

## API Reference
| Method | Route | Description |
|---|---|---|
| GET | /api/machines | Return all machines |
| GET | /api/machines/:id | Return one machine, 404 if not found |
| PATCH | /api/machines/:id/status | Update status (body: `{ "status": "idle" }`), updates `lastUpdated` |

## What I'd improve with more time
1. Replace the in-memory array with a real database (MongoDB or MySQL) so machine data and status updates persist across server restarts.
2. Add live updates (WebSockets or short-interval polling) so the dashboard reflects new sensor readings automatically instead of requiring a manual refresh.
3. Add automated tests (Jest for the API endpoints, React Testing Library for components) and basic authentication/authorization on the PATCH endpoint before allowing status changes.
4. Add extra UI for manually adding,updating and deleting features in the dashboard syncornized with the database.
5. Deploy this Dashboard using vercel and render for live access.
