#!/usr/bin/env bash
set -e
# Install dependencies
npm ci
# Run the existing build script
node scripts/build.js
