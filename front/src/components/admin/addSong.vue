<template>
  <div class="form-container">
    {{ song.lienext }}
    <form @submit.prevent="addSong">
      <div class="form-group">
        <label for="titre">Titre</label>
        <input type="text" id="titre" v-model="song.titre" placeholder="Enter title" />
      </div>

      <div class="form-group">
        <label for="songbacktitle">Titre Interne</label>
        <input type="text" id="songbacktitle" v-model="song.songbacktitle" placeholder="Enter internal title" />
      </div>

      <div class="form-group">
        <label for="titrealbum">Titre Album</label>
        <input type="text" id="titrealbum" v-model="song.titrealbum" placeholder="Enter album title" />
      </div>

      <div class="form-group">
        <label for="numeroalbum">Numéro Album</label>
        <input type="text" id="numeroalbum" v-model="song.numeroalbum" placeholder="Enter album number" />
      </div>

      <div class="form-group">
        <label for="genre">Genre</label>
        <input type="text" id="genre" v-model="song.genre" placeholder="Enter genre" />
      </div>

      <div class="form-group">
        <label for="artistes">Artistes</label>
        <input type="text" id="artistes" v-model="song.artistes" placeholder="Enter artists" />
      </div>

      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" id="date" v-model="song.date" />
      </div>

      <div class="form-group">
        <label for="support">Support</label>
        <input type="text" id="support" v-model="song.support" placeholder="Enter support type" />
      </div>

      <div class="form-group">
        <label for="annee">Année</label>
        <input type="number" id="annee" v-model="song.annee" placeholder="Enter year" />
      </div>

      <div class="form-group">
        <label for="groupe">Groupe</label>
        <input type="text" id="groupe" v-model="song.groupe" placeholder="Enter group" />
      </div>

      <div class="form-group">
        <label for="lyrics">Lyrics</label>
        <textarea id="lyrics" v-model="song.lyrics" placeholder="Enter lyrics"></textarea>
      </div>

      <div class="form-group">
        <label for="description">Description de la Chanson</label>
        <textarea id="description" v-model="song.description" placeholder="Enter song description"></textarea>
      </div>

      <div class="form-group">
        <label for="cover">Image (Cover)</label>
        <input type="file" name="cover" @change="handleCoverUpload" />
      </div>

      <div class="form-group">
        <label for="songFile">Song File</label>
        <input type="file" name="song" @change="handleSongUpload" />
      </div>

      <div class="form-group">
        <div class="form-group">
  <input type="checkbox" id="lienExt" v-model="song.lienext" />
  <label for="lienExt">Lien Ext</label>
</div>

  <label for="youtube">YouTube Link</label>
  <input type="text" id="youtube" v-model="song.links.youtube" placeholder="Enter YouTube link" />
</div>

<div class="form-group">
  <label for="spotify">Spotify Link</label>
  <input type="text" id="spotify" v-model="song.links.spotify" placeholder="Enter Spotify link" />
</div>

<div class="form-group">
  <label for="deezer">Deezer Link</label>
  <input type="text" id="deezer" v-model="song.links.deezer" placeholder="Enter Deezer link" />
</div>

<div class="form-group">
  <label for="bandcamp">Bandcamp Link</label>
  <input type="text" id="bandcamp" v-model="song.links.bandcamp" placeholder="Enter Bandcamp link" />
</div>

<div class="form-group">
  <label for="soundcloud">SoundCloud Link</label>
  <input type="text" id="soundcloud" v-model="song.links.soundcloud" placeholder="Enter SoundCloud link" />
</div>

<div class="form-group">
  <label for="applemusic">Apple Music Link</label>
  <input type="text" id="applemusic" v-model="song.links.applemusic" placeholder="Enter Apple Music link" />
</div>
      <button type="submit" class="submit-button">Submit</button>    </form>
      <p></p>
      <p></p>
  </div>
</template>

<script>
import  AxiosInstance  from '../../../axios';
export default {
    name: 'addSong',
    data() {
        return {
      song: {
        titre: 'cx',
        songbacktitle: 'cwx',
        titrealbum: 'cwx',
        numeroalbum: 'cwx',
        genre: 'cwx',
        artistes: 'cwx',
        date: '22/22/22',
        support: 'cwx',
        annee: '2024',
        groupe: 'wcx',
        lyrics: 'cwx',
        description: 'wcx',
        cover: null, // For the cover image file
        songFile: null, // For the song file
        lienext : false,
        links : 
        {
          youtube: '',
          spotify: '',
          deezer: '',
          bandcamp: '',
          soundcloud: '',
          applemusic: ''
        }
      },
    };
    },
    methods: {
        handleCoverUpload(event) {
      this.song.cover = event.target.files[0];
    },
    handleSongUpload(event) {
      this.song.songFile = event.target.files[0];
    },
    addSong() {
      console.log("addsong")
      const formData = new FormData();
      // Append all song properties to formData
      Object.keys(this.song).forEach(key => {
        if (key !== 'cover' && key !== 'songFile') {
          formData.append(key, this.song[key]);
        }
      });
      // Append files separately to maintain file structure
      if (this.song.cover) formData.append('cover', this.song.cover);
      if (this.song.songFile) formData.append('songFile', this.song.songFile);

      // Send a POST request with formData
      AxiosInstance.post('/addSong', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        // Handle response
        console.log(response.data);
        if(this.song.lienext){
          console.log("add linksss")
          AxiosInstance.post('/songlinks', { songbacktitle : this.song.songbacktitle, links : this.song.links})
          .then(response => 
            console.log("links added",response)
          ).catch(error => console.log(error))
        }
      }).catch(error => {
        // Handle error
        console.error(error);
      });
    },
  },
};
</script>
<style scoped>
.form-container {
  width: 70%;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 100px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="date"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>