#!/usr/bin/env bash
set -euo pipefail

# Install dependencies
npm ci

# Run build
npm run build

# Run tests
npm test
