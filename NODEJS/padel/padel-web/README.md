# Padel Booking (padel-web)

React + MUI front-end for the `padel-api` project. Lets players browse
clubs, view their fields and book a court, and lets clubs manage their
profile and fields.

## Stack

- React 19 + Vite
- MUI (Material UI) for components/theme
- React Router for navigation
- Axios for the API client
- Auth via JWT stored in `localStorage`, attached to every request

## Setup

```bash
npm install
```

Copy `.env` (already included) and adjust if the API runs elsewhere:

```
VITE_API_URL=http://localhost:3001/api
```

## Running

Start the API first (in `../padel-api`):

```bash
cd ../padel-api
npm install
npm start
```

> The API needs the `cors` package enabled (already added to
> `padel-api/server.js`) so the browser can call it from a different
> origin/port during development.

Then start the web app:

```bash
npm run dev
```

Open http://localhost:5173.

## Features

- Register / login as a **jogador** (customer) or **clube**
- Public club listing and club detail page with its fields
- Field detail page with a booking form (date, time, duration)
- "As minhas marcações" — customers view/cancel their bookings
- "O meu perfil" — create/edit the customer or club profile record
- "Os meus campos" — clubs create fields, toggle active state, delete
