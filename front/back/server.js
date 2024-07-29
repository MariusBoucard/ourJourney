import express from 'express';
import DatabaseService from './services/dbService.js';
import cors from 'cors'
const app = express();
const port = 3000;
app.use(cors()); // This will enable CORS for all routes
app.use('/files',express.static('files'));

let databaseServ = new DatabaseService('Db/sitedb.sqlite3');
databaseServ.init();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.get('/allSongs', async (req, res) => {
    let songs = await databaseServ.askAllSongs();
    res.send(songs);
});

app.get('/allPublicSongs', async (req, res) => {
    let songs = await databaseServ.askAllPublicSongs();
    res.send(songs);
});

app.get("/song/:id", async (req, res) => {
    console.log("not implemented yet");
    let song = await databaseServ.askSong(req.params.id);
    console.log(song)
    res.send(song);
})

app.get("/songLinks/:id", async (req, res) => {
    let song = await databaseServ.songLinks(req.params.id);
    console.log(song)
    res.send(song);
})

app.get("/songFile/:id", async (req, res) => {
    console.log("not implemented yet");
    let song = await databaseServ.askSongFile(req.params.id);
    res.send(song);
})

