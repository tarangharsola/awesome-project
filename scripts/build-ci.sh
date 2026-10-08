#!/usr/bin/env bash
set -e

# Install dependencies
npm ci

# Run the production build
npm run build
