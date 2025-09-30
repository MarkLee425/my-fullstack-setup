#!/bin/bash
# First-time setup script for My Fullstack Setup Project
# This script handles the initial setup including dependencies, env decryption, and project initialization

set -e  # Exit on any error

echo "🚀 Starting first-time setup for My Fullstack Setup Project..."

# Step 1: Install dependencies
echo "📦 Installing dependencies with pnpm..."
pnpm install

# Step 2: Decrypt all environment files
echo "🔓 Decrypting environment files..."
pnpm decrypt:all

# Step 3: Remove .env.keys file from root
echo "🗑️  Removing .env.keys from root..."
if [ -f ".env.keys" ]; then
    rm .env.keys
    echo "✅ Removed .env.keys"
else
    echo "ℹ️  .env.keys not found, skipping..."
fi

# Step 4: Clean up .env* files (remove first 7 lines)
echo "🧹 Cleaning up .env* files (removing first 7 lines)..."

# Find all .env* files recursively in the project, excluding .env.keys
find . -name ".env*" -type f ! -name ".env.keys" | while read -r env_file; do
    echo "  Processing $env_file..."
    # Create a temporary file with content from line 8 onwards
    tail -n +8 "$env_file" > "${env_file}.tmp"
    mv "${env_file}.tmp" "$env_file"
    echo "  ✅ Cleaned $env_file"
done

# Step 5: Encrypt all environment files
echo "🔒 Encrypting all environment files..."
pnpm encrypt -f apps/web/.env \
pnpm encrypt -f apps/server/.env \
pnpm encrypt -f apps/server/.env.docker \
pnpm encrypt -f apps/native/.env

# Step 6: Decrypt all environment files
echo "🔓 Decrypting all environment files..."
pnpm decrypt:all

# Step 7: Update .gitignore (Add .env.keys in .gitignore)
echo "📝 Updating .gitignore..."
sed -i '' '53i\
.env.keys
' .gitignore
echo "  ✅ Updated .gitignore"

# Step 8: Run project setup
echo "⚙️  Running project setup..."
pnpm setup:all

# Step 9: Remove this init script
echo "🗑️  Removing init script..."
rm scripts/init.sh

# Finish
echo "🎉 First-time setup completed successfully!"
