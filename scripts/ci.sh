#!/usr/bin/env bash
set -e

# Install dependencies
npm ci

# Build the project
npm run build

# Run tests
npm test
