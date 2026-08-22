#!/usr/bin/env bash
set -e

# Install dependencies in a clean environment
npm ci

# Build the application
npm run build

# Run the test suite
npm test
