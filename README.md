# VBCard API

The **VBCard API** repository is the backend API for the [VBCard](https://github.com/chawkitariq/vbcard-app) mobile application. It provides API endpoints for managing business cards.

## Setup

### Environment Variables

- Copy the `.env.example` file to `.env` to configure your environment variables.

### MinIO (S3 Storage)

**IMPORTANT**: MinIO setup require the app to be run in [development mode](#development).

To set up MinIO as a local S3-compatible object storage service:

1. Visit [http://localhost:8900](http://localhost:8900).
2. Log in using the following credentials:
   - Username: `minio`
   - Password: `password`
3. Create new access keys:
   - Navigate to [http://localhost:8900/access-keys/new-account](http://localhost:8900/access-keys/new-account).
   - Copy the `Access Key` and set it in the `.env` file under `AWS_S3_ACCESS_KEY_ID`.
   - Copy the `Secret Key` and set it in the `.env` file under `AWS_S3_SECRET_ACCESS_KEY`.
4. Create a new bucket:
   - Visit [http://localhost:8900/buckets/add-bucket](http://localhost:8900/buckets/add-bucket).
   - Create a bucket named as you want and set it in the `.env` file under `AWS_S3_BUCKET`.

## Development

```bash
# Start app
docker compose -f docker-compose.dev.yml up

# Stop app
docker compose -f docker-compose.dev.yml down
```

## Production

```bash
# Start app
docker compose up

# Stop app
docker compose down
```

## Test

```bash
# Run all tests
docker compose -f docker-compose.test.yml run api yarn test

# Run all tests and watch change
docker compose -f docker-compose.test.yml run api yarn test:watch
```
