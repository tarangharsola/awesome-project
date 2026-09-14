#!/usr/bin/env bash
set -e

echo "Starting build process..."
# Install dependencies (if not already installed)
if [ ! -d "node_modules" ]; then
  npm ci
fi
# Run the build script defined in package.json
npm run build
