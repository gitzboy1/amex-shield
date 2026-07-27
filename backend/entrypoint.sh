#!/bin/bash
set -e

# Wait for PostgreSQL to be ready
echo "Waiting for postgres..."
while ! pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER"
do
  sleep 1
done
echo "PostgreSQL started"

# Apply database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

exec "$@"
