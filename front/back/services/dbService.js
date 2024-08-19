
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
      return row;
    } catch (error) {
      console.error('Database error:', error);
    } finally {
      await this.db.close();
    }
  }

  async askSong(id) {
      
      try {
        const sql = 'SELECT * FROM chansons';
        const row = await this.db.all(sql);
        console.log(id)
        let returnow = row.filter(row => row.songbacktitle === id);
        return returnow;
      } catch (error) {
        console.error('Database error:', error);
      }
  }
  async songLinks(id) {
      
    try {
      const sql = 'SELECT * FROM liens';
      const row = await this.db.all(sql);
      console.log(id)
      let returnow = row.filter(row => row.songbacktitle === id);
      return returnow;
    } catch (error) {
      console.error('Database error:', error);
    }
}


  async askAllPublicSongs() {

    try {
      const sql = 'SELECT * FROM chansons where private = false ';
      const row = await this.db.all(sql);
      const parsedRows = row.map(row => {
        // Assuming the date is in the 'date' attribute of your row
        const dateString = row.date.toString(); // Ensure it's a string
        const year = parseInt(dateString.substring(0, 4), 10);
        const month = parseInt(dateString.substring(4, 6), 10) - 1; // JS months are 0-indexed
        const day = parseInt(dateString.substring(6, 8), 10);
        
        // Create a new Date object
        const date = new Date(year, month, day);
        
        // Replace or add the parsed date to the row object
        return { ...row, date: date };
        });
      return parsedRows;
    } catch (error) {
      console.error('Database error:', error);
    }
  }
async askAlbumPublicSongs(albumName){
  try{
    const sql = 'SELECT * FROM chansons where private = false';
    const row = await this.db.all(sql);
    let returnow = row.filter(row => row.titrealbum === albumName);
    const parsedRows = returnow.map(row => {
      // Assuming the date is in the 'date' attribute of your row
      const dateString = row.date.toString(); // Ensure it's a string
      const year = parseInt(dateString.substring(0, 4), 10);
      const month = parseInt(dateString.substring(4, 6), 10) - 1; // JS months are 0-indexed
      const day = parseInt(dateString.substring(6, 8), 10);
      
      // Create a new Date object
      const date = new Date(year, month, day);
      
      // Replace or add the parsed date to the row object
      return { ...row, date: date };
      });
    return parsedRows;
  } catch {
    return null;
  }
}
}
