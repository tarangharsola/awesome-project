#!/usr/bin/env bash
set -e

# Install exact dependencies as defined in package-lock.json
npm ci

# Run the production build
npm run build
