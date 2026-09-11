# Hotel Booking (hotel-web)

React + MUI front-end for the `hotel-api` project. Lets guests browse
hotels, view their rooms and book a stay, and lets hotels manage their
profile and rooms.

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
VITE_API_URL=http://localhost:3002/api
```

## Running

Start the API first (in `../hotel-api`):

```bash
cd ../hotel-api
npm install
npm start
```

> The API needs the `cors` package enabled (already added to
> `hotel-api/server.js`) so the browser can call it from a different
> origin/port during development.

Then start the web app:

```bash
npm run dev
```

Open http://localhost:5173.

## Features

- Register / login as a **hóspede** (guest) or **hotel**
- Public hotel listing and hotel detail page with its rooms
- Room detail page with a reservation form (check-in / check-out dates)
- "As minhas reservas" — guests view/cancel their reservations
- "O meu perfil" — create/edit the guest or hotel profile record
- "Os meus quartos" — hotels create rooms, toggle active state, delete
