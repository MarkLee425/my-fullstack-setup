#!/bin/bash
# First-time setup script for My Fullstack Setup Project
# This script handles the initial setup including dependencies, env decryption, and project initialization

set -e  # Exit on any error

echo "🚀 Starting first-time setup for My Fullstack Setup Project..."

# Step 1: Install dependencies
echo "📦 Installing dependencies with pnpm..."
pnpm install

# Step 2: Update the AUTH_SECRET in apps/server/.env & apps/server/.env.docker
echo "🔑 Updating AUTH_SECRET in environment files..."
# Update AUTH_SECRET in apps/server/.env
sed -i '' "s/^AUTH_SECRET=.*/AUTH_SECRET=$(openssl rand -hex 16)/" apps/server/.env
echo "  ✅ Updated AUTH_SECRET in apps/server/.env"
# Update AUTH_SECRET in apps/server/.env.docker
sed -i '' "s/^AUTH_SECRET=.*/AUTH_SECRET=$(openssl rand -hex 16)/" apps/server/.env.docker
echo "  ✅ Updated AUTH_SECRET in apps/server/.env.docker"

# Step 3: Encrypt all environment files
echo "🔒 Encrypting all environment files..."
pnpm encrypt -f apps/web/.env \
pnpm encrypt -f apps/server/.env \
pnpm encrypt -f apps/server/.env.docker \
pnpm encrypt -f apps/native/.env

# Step 4: Decrypt all environment files
echo "🔓 Decrypting all environment files..."
pnpm decrypt:all

# Step 5: Uncomment pre-commit in .husky/pre-commit
echo "✍️  Uncommenting pre-commit hook in .husky/pre-commit..."
sed -i '' '23s/^#//' .husky/pre-commit
echo "  ✅ Uncommented pnpm encrypt:all in .husky/pre-commit"

# Step 6: Run project setup
echo "⚙️  Running project setup..."
pnpm setup:all

# Step 7: Remove this init script
echo "🗑️  Removing init script..."
rm scripts/init.sh

# Finish
echo "🎉 First-time setup completed successfully!"
