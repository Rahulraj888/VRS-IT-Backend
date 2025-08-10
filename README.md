# VRS IT Backend

Node.js + Express + MongoDB backend for an IT rentals / e‑commerce API.  
Provides authentication, products, and orders endpoints with JWT protection.

## Features
- User auth: register & login (bcrypt + JWT)
- Products: list products (name, brand, processor, price, image)
- Orders: create & list orders for the logged‑in user
- MongoDB models with Mongoose
- Middleware for JWT verification
- CORS + dotenv config

## Tech Stack
- Node.js, Express
- MongoDB, Mongoose
- JWT, bcrypt
- nodemon (dev), cors, dotenv

## Quick Start
```bash
git clone <repo-url>
cd VRS-IT-Backend
npm install
cp .env.example .env   # or create .env using the keys below
npm start              # or: npx nodemon index.js
```
Server runs on **http://localhost:5000** (configurable via `.env`).

## Environment (.env)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/vrsit
JWT_SECRET=change_me_to_a_long_random_string
```
> Make sure MongoDB is running locally or update `MONGO_URI` to your cloud instance.

## Scripts
- `npm start` – start the server (nodemon if configured, otherwise node)
- `npm run dev` – (optional) dev alias if present

## API
Base URL: `http://localhost:5000/api`

### Auth (`/api/auth`)
- `POST /register` – `{ email, password }` → create user
- `POST /login` – `{ email, password }` → `{ token }`

### Products (`/api/products`)
- `GET /` – list all products

### Orders (`/api/orders`) *(JWT required)*
Headers: `Authorization: Bearer <token>`
- `POST /` – create order
  ```json
  {
    "items": [
      { "product": "<productId>", "price": 999.99, "quantity": 1 }
    ],
    "totalPrice": 999.99
  }
  ```
- `GET /` – list current user’s orders (latest first)

## Notes
- Passwords are hashed with bcrypt (via Mongoose hook).
- `authMiddleware` validates JWT and sets `req.user`.
- Extend product routes with CRUD as needed (GET by id / POST / PUT / DELETE).

## License
MIT
