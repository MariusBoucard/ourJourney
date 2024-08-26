
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

async toggleSongPrivacy(id) {
  try {
    // Step 1: Fetch the current state of the song
    const getSql = 'SELECT private FROM chansons WHERE songbacktitle = ?';
    const song = await this.db.get(getSql, id); // Assuming db.get() fetches a single row

    if (song) {
      // Step 2: Toggle the privacy state based on the current state
      const newPrivacyState = !song.private; // This toggles the state
      const updateSql = 'UPDATE chansons SET private = ? WHERE songbacktitle = ?';
      await this.db.run(updateSql, newPrivacyState, id);
      return true;
    } else {
      // Song not found
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
async suppSong(id) {
  try {
    // Step 1: Fetch the current state of the song
    const getSql = 'DELETE FROM chansons WHERE songbacktitle = ?';
    await this.db.run(getSql, id); // Assuming db.get() fetches a single row
    // delete song files
   // await fs.unlink() TODO
    // delete cover file
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }

}
async addSong(song) {
  try {
    // Construct the SQL INSERT statement
    // Assuming your table has columns for id, title, artist, and file path
    const insertSql = `INSERT INTO chansons (titre, songbacktitle, titrealbum, numeroalbum, pathsong, pathcover, genre, support, artistes, annee, date, description, lyrics, private, lectures, band, lienext) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the SQL query with the song details
    // Replace `songDetails.title`, `songDetails.artist`, and `songDetails.filePath` with the actual property names in your songDetails object
    await this.db.run(insertSql, [song.titre,song.songbacktitle ,song.titrealbum, song.numeroalbum,"","",song.genre,song.support, song.artistes, song.annee, song.date, song.description, song.lyrics, true,0,song.groupe,song.lienext]);
    console.log("caca")



    // If successful, return true or the inserted song's ID
    return true;
  } catch (error) {
    console.error(error);
    // Return false or throw an error if the insertion fails
    return false;
  }
}
async addLinks(songbacktitle,links){
    const insertLien = "INSERT INTO liens (songbacktitle, soundcloud,yt,spotify,deezer,bandcamp,apple) VALUES (?,?,?,?,?,?,?)"
    await this.db.run(insertLien, [songbacktitle, links.souncloud,links.youtube,links.spotify,links.deezer,links.bandcamp,links.applemusic ])
  
}
async deleteSong(songbacktitle){
  console.log(songbacktitle)
  const deleteLien = "DELETE FROM chansons WHERE songbacktitle = ?"

    try {
      const result = await this.db.run(deleteLien, [songbacktitle]);
      const deleteLi = "DELETE FROM liens WHERE songbacktitle = ?"
      const resulte = await this.db.run(deleteLi, [songbacktitle]);

      console.log(result); // Log result to see the outcome of the operation
      console.log(resulte)
      if (result.changes > 0) {
        return 'deleted';
      } else {
        return 'no record found';
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      return 'error'; // Return or throw, depending on how you want to handle errors
    }
}
}