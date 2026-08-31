#!/usr/bin/env bash
set -e

# Install dependencies
npm ci

# Run build
npm run build

# Run tests
npm test
