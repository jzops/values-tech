#!/bin/bash
# Local populate run for reciepts.tech.
#
# This runs on the local machine rather than a cloud routine because the cloud
# sandbox's egress policy allows only GitHub and package registries — every
# source domain (sec.gov, nlrb.gov, reuters, AP, TechCrunch) is rejected by the
# proxy, so a cloud run cannot verify that a source URL resolves and correctly
# refuses to publish anything. Sourcing needs real network access.
#
# Scheduled by ~/Library/LaunchAgents/tech.reciepts.populate.plist
# Disable with:  launchctl unload ~/Library/LaunchAgents/tech.reciepts.populate.plist

set -uo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

REPO="/Users/josephzaghloul/Documents/GitHub/Joe Repo/values-tech"
LOG_DIR="$HOME/Library/Logs/reciepts"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/populate-$(date +%Y-%m-%d).log"

{
  echo "==================== $(date '+%Y-%m-%d %H:%M:%S %Z') ===================="
  cd "$REPO" || { echo "FATAL: repo not found at $REPO"; exit 1; }

  # Other runs (and the daily content job) may have pushed since last time.
  git pull --ff-only origin main 2>&1 || echo "WARN: pull failed, continuing on local state"

  # Identity is repo-local, but assert it so a fresh clone can't commit as anyone else.
  git config user.name "Robin"
  git config user.email "robin@reciepts.tech"

  claude -p "/populate-values" --dangerously-skip-permissions 2>&1

  echo "---- post-run integrity ----"
  npm run check:data 2>&1 || echo "WARN: check:data reported a problem"
  echo "---- worklist ----"
  node scripts/worklist.mjs --limit 0 2>&1 | head -4
  echo "==================== done $(date '+%H:%M:%S') ===================="
} >> "$LOG" 2>&1
