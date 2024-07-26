import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function queryDatabase(key) {
  // Open the database
  const db = await open({
    filename: './mydatabase.db',
    driver: sqlite3.Database
  });

  try {
    // Query the database for information with a key
    const sql = 'SELECT * FROM myTable WHERE key = ?';
    const row = await db.get(sql, [key]);

    console.log(row);
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    // Close the database
    await db.close();
  }
}

// Example usage
queryDatabase('yourKey');