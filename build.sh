#!/bin/sh
set -e

(
  cd tools || exit
  npm run build
)
npm run build
