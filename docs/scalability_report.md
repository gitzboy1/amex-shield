# Scalability Assessment Report

## Current Architecture Preparedness
AMEX SHIELD is now architected as a fully stateless, horizontally scalable application:
1. **Stateless Backend:** Django processes authentication exclusively via JWTs. No server-side sessions are stored in memory, allowing you to spin up multiple instances behind a load balancer without sticky sessions.
2. **Caching & Message Broker:** Redis has been integrated into the Docker compose stack. It currently acts as the Cache backend and is ready to function as a Celery broker when you begin offloading OCR and AI processing to asynchronous workers.
3. **Database Concurrency:** Postgres 15 is configured to handle multiple simultaneous connections. Connection pooling (e.g., PgBouncer) should be introduced if connections exceed Postgres limits.

## Performance Estimations

| Concurrent Users | Expected Performance | Potential Bottleneck | Recommended Mitigation |
| :--- | :--- | :--- | :--- |
| **100 Users** | Sub-100ms API Response. Instant Frontend rendering. | None | N/A - System handles easily. |
| **500 Users** | Sub-200ms API Response. | Synchronous OCR/AI calls blocking gunicorn workers. | Deploy Celery workers to handle heavy AI/OCR requests asynchronously. |
| **1,000 Users** | Slight UI delay during peak claim submissions. | Database locking on `Claim` / `Purchase` inserts. | Add PgBouncer for DB Connection pooling. Scale backend horizontally. |
| **5,000 Users** | System under heavy load. | Network IO and CPU limits on the single Backend container. | Kubernetes deployment (EKS/GKE) with Auto-Scaling groups for the backend. Separate read-replicas for the database. |
