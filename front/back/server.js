import express from 'express';
import DatabaseService from './services/dbService.js';
import userService from './services/userService.js';
import cors from 'cors'
import bcrypt from 'bcrypt'
import multer from 'multer';
const app = express();
app.use(express.json());

const port = 3000;
app.use(cors()); // This will enable CORS for all routes
app.use('/files',express.static('files'));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Determine the correct folder based on the file type
    let folder = '';
    if (file.fieldname === 'cover') {
      folder = 'cover';
    } else if (file.fieldname === 'songFile') {
      folder = 'song';
    }
    cb(null, `files/${folder}/`); // Adjust the path as needed
  },
  filename: function(req, file, cb) {
    // Use songbacktitle from req.body for naming
    const extension = file.fieldname === 'cover' ? '.png' : '.wav';
    cb(null, `${req.body.songbacktitle}${extension}`);
  }
});

const upload = multer({ storage: storage });


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
    res.send(song);
})

app.get("/songLinks/:id", async (req, res) => {
    let song = await databaseServ.songLinks(req.params.id);
    res.send(song);
})

app.get("/songFile/:id", async (req, res) => {
    console.log("not implemented yet");
    let song = await databaseServ.askSongFile(req.params.id);
    res.send(song);
})

app.get("/songsAlbum/:id", async (req, res) => {
    let song = await databaseServ.askAlbumPublicSongs(req.params.id);
    res.send(song);
})

app.post('/api/login', async (req, res) => {
    const {  password, email } = req.body;
    console.log(req.body)
   const id = await userService.doUserExists({
      mail: email,
      password : password
    })
    if(id !== false){
        console.log(id)
      const token = userService.generateToken(id)
      res.status(200).json({ token : token, connected : true });
    }
    res.status(401)
  });
  
app.post('/api/register', async (req, res) => {
    console.log(req.body)
    const {  mail,password } = req.body;
    const user = {
      mail: mail,
      password : password
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    user.password = hashedPassword;
    const id = await userService.addUser(user)
    if(id !== false){
      res.status(200).json({ connected : true });
    }
    res.status(401)
  });


// TODO
app.post("/toggleSongPrivacy", userService.authenticateToken, async (req, res) => {
    let song = await databaseServ.toggleSongPrivacy(req.body.songbacktitle);
    res.send(song);
})


app.post("/addSong", userService.authenticateToken, upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'songFile', maxCount: 1 }]), async (req, res) => {
  try {
    // Combine form fields and files information
    let songData = {
      ...req.body,
      cover: req.files['cover'] ? req.files['cover'][0].path : undefined,
      songFile: req.files['songFile'] ? req.files['songFile'][0].path : undefined,
     // links: req.body.links ? JSON.parse(req.body.links) : undefined, // Parse the links JSON string if it exists

    };

    let song = await databaseServ.addSong(songData);
    console.log("song added")
    res.send(song);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Failed to add song", error: error.message });
  }
});

app.post("/songlinks", userService.authenticateToken, async (req, res) =>{
  console.log(req.body)
  await databaseServ.addLinks(req.body.songbacktitle, req.body.links)
  res.status(200)
});


app.post("/linktreeSong",  async (req, res) => {
  let { songsID } = req.body
  let song = await userService.updateLinktreeSongs(songsID);
  res.send(song);
});

app.get("/linktreeSongs", async (req, res) => {
  let song = await userService.getLinktreeSongs();
  res.send(song);
});

app.get("/linktreePageData", async (req,res) => {
  let songs = await userService.getLinktreeSongs();
  // Recup all data on songs :
  let s = []
  console.log(songs)
  for (let i = 0; i < songs.length; i++) {
    let song = await databaseServ.askSong(songs[i])
    s.push(song)
  }
  return res.send(s)
})