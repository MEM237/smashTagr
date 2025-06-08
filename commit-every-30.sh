#!/bin/bash

cd ~/developer/para/xmfb

# Stage all changed files
git add .

# Commit with timestamp
git commit -m "🕒 Auto-commit $(date '+%Y-%m-%d %H:%M:%S')" --allow-empty

# Push to GitHub
git push origin main

