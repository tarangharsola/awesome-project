#!/usr/bin/env bash
set -euo pipefail

echo "Installing dependencies..."
npm ci

echo "Running build..."
npm run build

echo "Running tests..."
npm test -- --ci --coverage
