# JWT Auth Assignment

A MERN stack project demonstrating JWT-based authentication with role-based access control. Built for a college assignment.

## Roles
- **user** — basic access, can view user dashboard only
- **manager** — can view user and manager dashboards
- **admin** — can view all three dashboards

---

## How to Run Locally

### 1. Clone / download the project

### 2. Set up the backend

```bash
cd backend
cp .env.example .env
# edit .env and fill in your MONGO_URI and JWT_SECRET
npm install
npm run dev
```

The backend runs on **http://localhost:5000**

### 3. Set up the frontend

```bash
cd frontend
cp .env.example .env
# VITE_API_URL=http://localhost:5000  (already set in .env.example)
npm install
npm run dev
```

The frontend runs on **http://localhost:5173**

---

## Environment Variables

### Backend (`backend/.env`)

| Variable       | Description                             | Example                      |
|----------------|-----------------------------------------|------------------------------|
| `MONGO_URI`    | MongoDB Atlas connection string         | `mongodb+srv://...`          |
| `JWT_SECRET`   | Secret key for signing JWTs             | `mysecret123`                |
| `JWT_EXPIRE`   | Token expiry duration                   | `7d`                         |
| `FRONTEND_URL` | Allowed CORS origin                     | `http://localhost:5173`      |
| `PORT`         | Server port (optional, defaults to 5000)| `5000`                       |

### Frontend (`frontend/.env`)

| Variable        | Description                 | Example                                    |
|-----------------|-----------------------------|--------------------------------------------|
| `VITE_API_URL`  | Backend API base URL        | `http://localhost:5000`                    |

---

## API Routes

| Method | Route                     | Auth Required | Roles Allowed        |
|--------|---------------------------|---------------|----------------------|
| GET    | `/`                       | No            | Public (health check)|
| POST   | `/api/auth/register`      | No            | Public               |
| POST   | `/api/auth/login`         | No            | Public               |
| GET    | `/api/auth/me`            | Yes           | Any logged-in user   |
| GET    | `/api/dashboard/user`     | Yes           | user, manager, admin |
| GET    | `/api/dashboard/manager`  | Yes           | manager, admin       |
| GET    | `/api/dashboard/admin`    | Yes           | admin                |

---

## JWT Authentication Flow

1. **Register** — POST to `/api/auth/register` with `{ name, email, password, role }`. The server hashes the password with bcrypt, creates the user, signs a JWT, and returns `{ token, user }`.

2. **Login** — POST to `/api/auth/login` with `{ email, password }`. The server finds the user, compares the password hash, and returns `{ token, user }`.

3. **Token stored in localStorage** — the React app stores the JWT in `localStorage` under the key `'token'`.

4. **Axios interceptor** — every outgoing request automatically gets an `Authorization: Bearer <token>` header added by the request interceptor in `src/api/axios.js`.

5. **protect middleware** — on the backend, the `protect` middleware reads the Bearer token from the `Authorization` header, verifies it with `jwt.verify`, and attaches the user object to `req.user`.

6. **authorize middleware** — the `authorize(...roles)` middleware checks that `req.user.role` is in the allowed list. If not, it returns `403 Forbidden`.

7. **Session restore on reload** — when the app loads, if a token exists in localStorage, the frontend calls `GET /api/auth/me` to restore the session. If the token is invalid/expired, it's removed.

8. **Logout** — clears the token from localStorage, removes the Axios default header, and resets the React auth state. The user is redirected to `/login`.

9. **401 auto-logout** — if any API call returns a 401, the response interceptor automatically logs the user out and redirects to `/login`.

---

## Deployment

### Backend → Render

1. Push the `backend/` folder to a GitHub repository.
2. Create a new **Web Service** on [Render](https://render.com).
3. Connect your GitHub repo. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. Set the following environment variables on Render:

| Key            | Value                                      |
|----------------|--------------------------------------------|
| `MONGO_URI`    | Your MongoDB Atlas connection string       |
| `JWT_SECRET`   | A strong secret key                        |
| `JWT_EXPIRE`   | `7d`                                       |
| `FRONTEND_URL` | Your Vercel app URL (e.g. `https://jwt-auth-assignment.vercel.app`) |
| `PORT`         | `5000`                                     |

5. Deploy. Copy the Render URL for the next step.

---

### Frontend → Vercel

1. Push the `frontend/` folder to a GitHub repository (can be a separate repo or subfolder).
2. Import the project on [Vercel](https://vercel.com).
3. Set:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Set the following environment variable:

| Key             | Value                                              |
|-----------------|----------------------------------------------------|
| `VITE_API_URL`  | Your Render backend URL (e.g. `https://your-app.onrender.com`) |

5. The `vercel.json` already handles SPA routing — all routes will serve `index.html`.
6. Deploy. Done!
