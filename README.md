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
   Run the following command from the root directory:
   ```bash
   docker-compose up --build
   ```

3. **Access the Services**:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **Backend Health Check**: http://localhost:8000/api/health/
   - **API Documentation (Swagger UI)**: http://localhost:8000/api/schema/swagger-ui/
   - **API Documentation (ReDoc)**: http://localhost:8000/api/schema/redoc/

## Authentication & API

AMEX SHIELD uses **JWT (JSON Web Tokens)** for stateless authentication. The client stores `access_token` and `refresh_token` in secure cookies. 

### Auth Endpoints
- `POST /api/auth/register/` - Create a new user account
- `POST /api/auth/login/` - Login and receive JWT tokens
- `POST /api/auth/logout/` - Blacklist current refresh token
- `POST /api/auth/token/refresh/` - Refresh the access token
- `GET /api/auth/me/` - Retrieve the current authenticated user's profile
- `PUT /api/auth/profile/` - Update the user's profile information
- `POST /api/auth/change-password/` - Update user password

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
### Benefit Rule Engine
The Benefit Rule Engine operates as an independent service in ackend/app/services/rule_engine.py. It evaluates purchases when they are saved using a Django post_save signal. 

**Available Rules:**
- Purchase Protection (90 days)
- Extended Warranty (1 Extra Year for electronics)
- Return Protection (90 days,  limit)

### Dashboard Analytics & Purchase APIs
- GET /api/purchases/ - List all purchases
- POST /api/purchases/ - Record a new purchase (triggers rule engine)
- GET /api/dashboard/summary/ - Aggregate metrics (Total Purchases, Expiring Soon, Protected Value)
- GET /api/dashboard/timeline/ - Sequential timeline of benefit activations and expirations
### OCR Pipeline
The OCRService (ackend/app/services/ocr/parser.py) is an independent module designed to extract structured information (Merchant, Amount, Date, etc.) from receipt images. 
- It includes a confidence scoring mechanism.
- If confidence is low (<0.8), the /api/receipts/upload/ endpoint returns the raw data with a 202 Accepted status, allowing the frontend to present a review screen for manual corrections.
- If confidence is high, it automatically provisions a Purchase record.

### AI Benefit Interpreter
The AIBenefitInterpreter (ackend/app/services/ai/interpreter.py) acts downstream of the Rule Engine. Once eligibility is determined by hard business logic, this module generates human-readable explanations summarizing coverage durations and expiration dates. This keeps AI out of authoritative decision making while improving user experience.
### Claims Management Engine
The ClaimService (ackend/app/services/claims/manager.py) allows users to automatically provision claims against eligible purchases.
- Initiating a claim creates a Draft claim.
- The AIClaimWriter analyzes the purchase and benefit to pre-populate an AI Draft Summary for the user.
- Users can attach supporting documents and submit the claim for review.

### Proactive Notification Engine
The NotificationService (ackend/app/services/notifications/engine.py) provides in-app alerts (and mocks email queues) for users.
- A Django Management Command (process_reminders.py) runs periodically to notify users of expiring benefits (30, 7, and 1 days prior to expiration).
### Enterprise Admin & Analytics
An enterprise-grade admin portal (/admin) provides visual analytics, audit logs, and user management.
- Built with Recharts for visual data representation.
- Fully protected by backend Role-Based Access Control (RBAC).

### API Documentation
API documentation is automatically generated using drf-spectacular.
- **Swagger UI:** /api/docs/
- **ReDoc:** /api/redoc/

### System Health
Health monitoring endpoints are available for infrastructure tracking:
- GET /api/health/ - DB and System status
- GET /api/metrics/ - OpenTelemetry/Prometheus placeholder
