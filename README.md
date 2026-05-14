# Encrypted Time Series

> Node.js 18+ · npm 10+ · React 18 · MongoDB

A lightweight Node.js project that emits encrypted time series data from an emitter service, receives and decrypts it in a listener service, stores it in MongoDB, and displays the stream in a React frontend.

## Requirements

- Node.js 18+ (recommended)
- npm 10+ or yarn
- MongoDB instance for `listener_service`
- OpenSSL for generating TLS credentials

## Repository Structure

- `emitter_service/` — sends encrypted data to the listener
- `listener_service/` — decrypts, stores, and exposes the data
- `frontend_client/` — React app displaying the saved time series

## Setup

1. Clone the repository
2. Install dependencies in each service folder

```bash
cd listener_service
npm install

cd ../emitter_service
npm install

cd ../frontend_client
npm install
```

## Listener Service

### Generate TLS credentials

```bash
cd listener_service
npm run gen-cred
```

### Required `.env`

Create `listener_service/.env` with:

```env
NODE_ENV=dev
MONGO_URI=<your_mongo_uri>
PORT=3001
HASH_ALGO=sha256
PASSPHRASE=<your_passphrase>
```

### Start listener

```bash
npm start
```

Use `npm run dev` for local development with `nodemon`.

## Emitter Service

Create `emitter_service/.env` with:

```env
SERVER_URL=https://127.0.0.1:3001/er
HASH_ALGO=sha256
PASSPHRASE=<your_passphrase>
MIN=49
MAX=499
TIME_IN_SEC=10
```

Start the emitter:

```bash
cd emitter_service
npm start
```

## Frontend Client

```bash
cd frontend_client
npm start
```

Open the browser at `http://localhost:3000`.

## Notes

- `listener_service` must be running before `emitter_service`
- Ensure matching `PASSPHRASE` and `HASH_ALGO` values across services
- Use TLS credentials from `listener_service` for secure socket communication
