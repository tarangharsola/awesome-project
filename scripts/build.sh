#!/usr/bin/env bash
set -e

echo "Running lint..."
npm run lint || true

echo "Running tests..."
npm test

echo "Building TypeScript..."
npm run build

echo "Build completed successfully."
