#!/bin/bash

# XMFB auto-commit script (ltbl flavor)
cd ~/Developer/xmfb || exit 1

# Add all changes (edit if you want to limit scope)
git add .

# Commit only if there are changes
if ! git diff --cached --quiet; then
    git commit -m "🌕 ltbl auto-commit at $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin main
fi

