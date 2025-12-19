# Dependency Manager

A comprehensive script to safely manage and update project dependencies, with special handling for React 19 peer dependency warnings.

## Features

- 🔍 **Dependency Analysis** - Check for outdated packages and security vulnerabilities
- 🔧 **React 19 Fix** - Automatically resolve React 19 peer dependency warnings
- ⬆️ **Smart Updates** - Safely update Next.js ecosystem and other dependencies
- 🧹 **Clean Install** - Remove and reinstall all dependencies
- 🔒 **Security Fixes** - Automatically fix security vulnerabilities
- 💾 **Backup & Restore** - Automatic backup of package.json before changes
- 📊 **Detailed Reports** - Before and after dependency reports

## Quick Start

```bash
# Fix React 19 peer dependency warnings
npm run deps:fix-react

# Update all dependencies and fix common issues
npm run deps:update

# Clean install with React fixes
npm run deps:clean

# Generate dependency report only
npm run deps:report
```

## Advanced Usage

```bash
# Fix React 19 warnings only
node scripts/manage-dependencies.js --fix-react

# Update Next.js ecosystem
node scripts/manage-dependencies.js --update-next

# Update specific packages
node scripts/manage-dependencies.js --update tailwindcss @types/node

# Full maintenance (recommended)
node scripts/manage-dependencies.js --update-next --fix-react --fix-vulns

# Clean install everything
node scripts/manage-dependencies.js --clean --fix-react
```

## What It Does

### React 19 Fixes
- Adds dependency overrides for React 19 compatibility
- Creates `.npmrc` with `legacy-peer-deps=true`
- Updates React and related packages to latest versions

### Security & Updates
- Runs `npm audit fix` to resolve vulnerabilities
- Updates outdated packages safely
- Provides detailed before/after reports

### Safety Features
- Creates automatic backup of `package.json`
- Restores backup if any operation fails
- Colored output for easy reading
- Detailed logging of all operations

## Troubleshooting

If something goes wrong:
1. The script automatically restores from `package.json.backup`
2. Check the colored output for specific error messages
3. Run with individual flags to isolate issues

## Output Colors

- 🔵 **Blue (ℹ)** - Information
- 🟢 **Green (✓)** - Success
- 🟡 **Yellow (⚠)** - Warning
- 🔴 **Red (✗)** - Error
- 🟣 **Magenta (→)** - Step in progress
