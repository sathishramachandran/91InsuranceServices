# 91 Insurance Services

Vehicle insurance management app with a Next.js frontend and FastAPI backend.

## RTO insurance status API

There is no confirmed free public government JSON API for live VAHAN/RTO insurance status. The official public routes are VAHAN/mParivahan, and commercial providers normally require an account, API key, or paid/free-tier plan.

This project runs in demo mode by default:

- `RTO_PROVIDER=demo` returns realistic local sample insurance status.
- `RTO_PROVIDER=rapidapi` calls the RapidAPI RTO Vehicle Details endpoint.
- `RTO_PROVIDER=generic` calls a compliant third-party API you configure.

RapidAPI setup:

Create `backend/.env`:

```env
DATABASE_URL=sqlite:///./insurance.db
RTO_PROVIDER=rapidapi
RTO_RAPIDAPI_KEY=your_rapidapi_key_here
RTO_RAPIDAPI_URL=https://rto-vehicle-details.p.rapidapi.com/api
RTO_RAPIDAPI_HOST=rto-vehicle-details.p.rapidapi.com
```

Do not commit your real RapidAPI key. If a key is shared publicly, rotate it in RapidAPI.

Supported live provider environment variables:

```env
RTO_PROVIDER=generic
RTO_API_URL=https://provider.example.com/vehicle-rc
RTO_API_KEY=your_api_key
RTO_API_REGISTRATION_FIELD=registration_no
RTO_API_AUTH_HEADER=Authorization
RTO_API_AUTH_PREFIX=Bearer
```

## Run backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run.py
```

Backend URL: `http://127.0.0.1:8000`

If `DATABASE_URL` is not set, the backend uses local SQLite at `backend/insurance.db`.

## Run frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:3000`

After login, open the dashboard and use the "RTO insurance status" checker with a registration number such as `TN01AB1234`.
