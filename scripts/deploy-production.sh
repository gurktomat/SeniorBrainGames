#!/usr/bin/env bash
set -euo pipefail

cd /home/gurktomat/SeniorBrainGames

npm run build
pm2 delete seniorbraingames >/dev/null 2>&1 || true
pm2 start ecosystem.config.cjs --only seniorbraingames --update-env
pm2 save
