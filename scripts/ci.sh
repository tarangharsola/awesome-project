#!/usr/bin/env bash
set -e
# Install dependencies
npm ci
# Run the build script (defined in package.json)
npm run build
# Execute test suite
npm test