#!/usr/bin/env node

import { execSync } from "child_process"
import fs from "fs"
import path from "path"

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
}

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
  step: (msg) => console.log(`${colors.magenta}→${colors.reset} ${msg}`),
}

class DependencyManager {
  constructor() {
    this.packageJsonPath = path.join(process.cwd(), "package.json")
    this.packageJson = this.loadPackageJson()
    this.backupPath = path.join(process.cwd(), "package.json.backup")
  }

  loadPackageJson() {
    try {
      return JSON.parse(fs.readFileSync(this.packageJsonPath, "utf8"))
    } catch (error) {
      log.error("Could not read package.json")
      process.exit(1)
    }
  }

  savePackageJson() {
    try {
      fs.writeFileSync(this.packageJsonPath, JSON.stringify(this.packageJson, null, 2) + "\n")
      log.success("Updated package.json")
    } catch (error) {
      log.error("Could not write package.json")
      process.exit(1)
    }
  }

  createBackup() {
    try {
      fs.copyFileSync(this.packageJsonPath, this.backupPath)
      log.success("Created backup: package.json.backup")
    } catch (error) {
      log.warning("Could not create backup")
    }
  }

  restoreBackup() {
    try {
      if (fs.existsSync(this.backupPath)) {
        fs.copyFileSync(this.backupPath, this.packageJsonPath)
        log.success("Restored from backup")
      }
    } catch (error) {
      log.error("Could not restore backup")
    }
  }

  executeCommand(command, options = {}) {
    try {
      const result = execSync(command, {
        encoding: "utf8",
        stdio: options.silent ? "pipe" : "inherit",
        ...options,
      })
      return result
    } catch (error) {
      if (!options.silent) {
        log.error(`Command failed: ${command}`)
      }
      throw error
    }
  }

  checkOutdatedPackages() {
    log.step("Checking for outdated packages...")
    try {
      const result = this.executeCommand("npm outdated --json", { silent: true })
      return JSON.parse(result || "{}")
    } catch (error) {
      // npm outdated returns exit code 1 when there are outdated packages
      try {
        const stderr = error.stderr || ""
        const stdout = error.stdout || ""
        if (stdout) {
          return JSON.parse(stdout)
        }
      } catch (parseError) {
        log.warning("Could not parse outdated packages info")
      }
      return {}
    }
  }

  checkVulnerabilities() {
    log.step("Checking for security vulnerabilities...")
    try {
      const result = this.executeCommand("npm audit --json", { silent: true })
      const audit = JSON.parse(result)
      return audit
    } catch (error) {
      try {
        const stdout = error.stdout || ""
        if (stdout) {
          return JSON.parse(stdout)
        }
      } catch (parseError) {
        log.warning("Could not parse audit results")
      }
      return { vulnerabilities: {} }
    }
  }

  fixReactPeerDependencies() {
    log.step("Fixing React 19 peer dependency warnings...")

    // Add overrides for React 19
    if (!this.packageJson.overrides) {
      this.packageJson.overrides = {}
    }

    this.packageJson.overrides = {
      ...this.packageJson.overrides,
      react: "^19.0.0",
      "react-dom": "^19.0.0",
      "@types/react": "^19.0.0",
      "@types/react-dom": "^19.0.0",
    }

    // Create or update .npmrc
    const npmrcPath = path.join(process.cwd(), ".npmrc")
    const npmrcContent = `legacy-peer-deps=true\nstrict-peer-deps=false\n`

    try {
      fs.writeFileSync(npmrcPath, npmrcContent)
      log.success("Created .npmrc with peer dependency settings")
    } catch (error) {
      log.warning("Could not create .npmrc file")
    }

    this.savePackageJson()
  }

  updateNextJsEcosystem() {
    log.step("Updating Next.js ecosystem packages...")

    const nextPackages = ["next@latest", "react@latest", "react-dom@latest", "eslint-config-next@latest"]

    // Check if TypeScript is used
    if (this.packageJson.devDependencies?.typescript || this.packageJson.dependencies?.typescript) {
      nextPackages.push("@types/react@latest", "@types/react-dom@latest")
    }

    try {
      this.executeCommand(`npm install ${nextPackages.join(" ")}`)
      log.success("Updated Next.js ecosystem packages")
    } catch (error) {
      log.error("Failed to update Next.js packages")
      throw error
    }
  }

  updateDependencies(packages = []) {
    if (packages.length === 0) {
      log.step("Updating all dependencies...")
      try {
        this.executeCommand("npm update")
        log.success("Updated all dependencies")
      } catch (error) {
        log.error("Failed to update dependencies")
        throw error
      }
    } else {
      log.step(`Updating specific packages: ${packages.join(", ")}`)
      try {
        this.executeCommand(`npm install ${packages.map((pkg) => `${pkg}@latest`).join(" ")}`)
        log.success("Updated specified packages")
      } catch (error) {
        log.error("Failed to update specified packages")
        throw error
      }
    }
  }

  cleanInstall() {
    log.step("Performing clean install...")
    try {
      // Remove node_modules and package-lock.json
      this.executeCommand("rm -rf node_modules package-lock.json", { silent: true })
      log.success("Cleaned existing installation")

      // Fresh install
      this.executeCommand("npm install")
      log.success("Completed fresh installation")
    } catch (error) {
      log.error("Failed to perform clean install")
      throw error
    }
  }

  fixVulnerabilities() {
    log.step("Fixing security vulnerabilities...")
    try {
      this.executeCommand("npm audit fix")
      log.success("Fixed security vulnerabilities")
    } catch (error) {
      log.warning("Some vulnerabilities could not be automatically fixed")
      try {
        this.executeCommand("npm audit fix --force")
        log.success("Applied force fixes for remaining vulnerabilities")
      } catch (forceError) {
        log.error("Could not fix all vulnerabilities")
      }
    }
  }

  generateReport() {
    log.header("📊 Dependency Report")

    const outdated = this.checkOutdatedPackages()
    const audit = this.checkVulnerabilities()

    // Outdated packages
    const outdatedCount = Object.keys(outdated).length
    if (outdatedCount > 0) {
      log.warning(`Found ${outdatedCount} outdated packages:`)
      Object.entries(outdated).forEach(([pkg, info]) => {
        console.log(`  ${pkg}: ${info.current} → ${info.latest}`)
      })
    } else {
      log.success("All packages are up to date")
    }

    // Security vulnerabilities
    const vulnCount = audit.metadata?.vulnerabilities?.total || 0
    if (vulnCount > 0) {
      log.warning(`Found ${vulnCount} security vulnerabilities`)
      const levels = audit.metadata.vulnerabilities
      if (levels.critical > 0) log.error(`  Critical: ${levels.critical}`)
      if (levels.high > 0) log.error(`  High: ${levels.high}`)
      if (levels.moderate > 0) log.warning(`  Moderate: ${levels.moderate}`)
      if (levels.low > 0) log.info(`  Low: ${levels.low}`)
    } else {
      log.success("No security vulnerabilities found")
    }

    return { outdatedCount, vulnCount }
  }

  async run(options = {}) {
    log.header("🔧 Dependency Manager")

    try {
      // Create backup
      this.createBackup()

      // Generate initial report
      const initialReport = this.generateReport()

      if (options.fixReact) {
        log.header("🔧 Fixing React 19 Peer Dependencies")
        this.fixReactPeerDependencies()
      }

      if (options.updateNext) {
        log.header("⬆️ Updating Next.js Ecosystem")
        this.updateNextJsEcosystem()
      }

      if (options.update) {
        log.header("⬆️ Updating Dependencies")
        this.updateDependencies(options.packages)
      }

      if (options.clean) {
        log.header("🧹 Clean Install")
        this.cleanInstall()
      }

      if (options.fixVulns) {
        log.header("🔒 Fixing Security Vulnerabilities")
        this.fixVulnerabilities()
      }

      // Generate final report
      log.header("📋 Final Report")
      this.generateReport()

      log.header("✅ Dependency Management Complete")
      log.success("All operations completed successfully!")
      log.info("Backup saved as package.json.backup")
    } catch (error) {
      log.error("An error occurred during dependency management")
      log.info("Restoring from backup...")
      this.restoreBackup()
      process.exit(1)
    }
  }
}

// CLI Interface
const args = process.argv.slice(2)
const options = {
  fixReact: args.includes("--fix-react"),
  updateNext: args.includes("--update-next"),
  update: args.includes("--update"),
  clean: args.includes("--clean"),
  fixVulns: args.includes("--fix-vulns"),
  packages: args.filter((arg) => !arg.startsWith("--")),
}

// Show help
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
${colors.bright}Dependency Manager${colors.reset}

Usage: node scripts/manage-dependencies.js [options] [packages...]

Options:
  --fix-react     Fix React 19 peer dependency warnings
  --update-next   Update Next.js ecosystem packages
  --update        Update dependencies (all or specified packages)
  --clean         Perform clean install (removes node_modules)
  --fix-vulns     Fix security vulnerabilities
  --help, -h      Show this help message

Examples:
  node scripts/manage-dependencies.js --fix-react
  node scripts/manage-dependencies.js --update-next --fix-react
  node scripts/manage-dependencies.js --update tailwindcss @types/node
  node scripts/manage-dependencies.js --clean --fix-vulns
  node scripts/manage-dependencies.js --update --fix-react --fix-vulns
`)
  process.exit(0)
}

// Run with all options if no specific options provided
if (!Object.values(options).some(Boolean)) {
  options.fixReact = true
  options.updateNext = true
  options.fixVulns = true
}

const manager = new DependencyManager()
manager.run(options)
