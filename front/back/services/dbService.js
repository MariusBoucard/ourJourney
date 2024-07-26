
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// eslint-disable-next-line no-unused-vars
export default class DatabaseService {

  constructor(dbPath) {
    this.dbPath = dbPath;
    this.db = null;
  }

  async init() {
    this.db = await this.openDb();
  }

  async openDb() {
    return open({
      filename: this.dbPath,
      driver: sqlite3.Database
    });
  }

  async askAllSongs() {

    try {
      const sql = 'SELECT * FROM chansons ';
      const row = await this.db.all(sql);
      console.log(row);
      return row;
    } catch (error) {
      console.error('Database error:', error);
    } finally {
      await this.db.close();
    }
  }

  async askAllPublicSongs() {

    try {
      const sql = 'SELECT * FROM chansons where private = false ';
      const row = await this.db.all(sql);
      console.log(row);
      return row;
    } catch (error) {
      console.error('Database error:', error);
    }
  }
}