import Database from 'better-sqlite3'
import { join } from 'path'
import { readFileSync } from 'fs'
import { app } from 'electron'

let db: Database.Database | null = null

function getDatabasePath(): string {
  // Check if running in Electron (app is available)
  if (typeof app !== 'undefined' && app?.getPath) {
    const userDataPath = app.getPath('userData')
    console.log(userDataPath)
    return join(userDataPath, 'app.db')
  }

  // Fallback for standalone testing: use local database directory
  return join(__dirname, '../database/app.db')
}

export function initDatabase(): Database.Database {
  if (db) {
    return db
  }

  // Get database path
  const dbPath = getDatabasePath()

  // Create database connection
  db = new Database(dbPath)

  // Enable foreign keys
  db.pragma('foreign_keys = ON')

  // Read and execute SQL file
  const sqlPath = join(__dirname, '../database/app.sql')
  const sql = readFileSync(sqlPath, 'utf-8')

  // Split by semicolon, but keep the structure
  // Remove empty lines and trim each statement
  const statements = sql
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  // Execute each statement (prepare() doesn't need semicolons)
  for (const statement of statements) {
    if (statement.trim().length > 0) {
      try {
        db.prepare(statement).run()
      } catch (error) {
        console.error('Failed to execute statement:')
        console.error(statement)
        throw error
      }
    }
  }

  console.log('Database initialized at:', dbPath)
  return db
}

export function getDatabase(): Database.Database {
  if (!db) {
    return initDatabase()
  }
  return db
}

export function closeDatabase(): void {
  if (db) {
    db.close()
    db = null
  }
}
