#!/usr/bin/env bash
set -e

echo "Running TypeScript type check..."
npx tsc --noEmit
