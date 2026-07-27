# AMEX SHIELD

**AMEX SHIELD** is a proactive benefit experience platform that automatically notifies, educates, and assists American Express card members with their eligible protections using AI and OCR.

## Project Structure

This repository is a monorepo containing:
- `frontend/`: Next.js 16 (App Router), TypeScript, Tailwind CSS
- `backend/`: Django 6.0, Django REST Framework, Simple JWT, DRF Spectacular
- `db/`: PostgreSQL database (managed via Docker)

## Development Setup

The easiest way to run the entire stack locally is by using Docker Compose.

### Prerequisites
- Docker & Docker Compose
- Node.js (for local frontend development)
- Python 3.11+ (for local backend development)

### Running with Docker Compose

1. **Setup Environment Variables**:
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. **Start the Services**:
   Run the following command from the root directory (`amex-shield/`):
   ```bash
   docker-compose up --build
   ```

3. **Access the Services**:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **Backend Health Check**: http://localhost:8000/api/health/
   - **API Documentation (Swagger UI)**: http://localhost:8000/api/schema/swagger-ui/
   - **API Documentation (ReDoc)**: http://localhost:8000/api/schema/redoc/

## Development Guidelines

### Backend Formatting
The backend enforces PEP 8 styling using `black` and `isort`.
```bash
cd backend
black .
isort .
```

### Frontend Formatting
The frontend uses ESLint and Prettier.
```bash
cd frontend
npm run lint
```
