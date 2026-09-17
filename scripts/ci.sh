#!/usr/bin/env bash
set -e

# Install dependencies
npm ci

# Build the application
npm run build

# Run tests
npm test
