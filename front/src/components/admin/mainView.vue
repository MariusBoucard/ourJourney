<template>
<div class="container">
    <div class="leftColumn">
        <router-link class="router-link" to="/admin/addSong">Add song</router-link>
        <router-link class="router-link" to="/admin/updateLinktree">update linktree</router-link>

    </div>
    <table class="rightColumn"> 
      <thead>
        <tr>
          <th>Titre</th>
          <th>Titre Interne</th>
          <th>Titre Album</th>
          <th>Numéro Album</th>
          <th>Genre</th>
          <th>Artistes</th>
          <th>Date</th>
          <th>Support</th>
          <th>Privé</th>
          <th>Suppr</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="song in songList" :key="song.id">
          <td>{{ song.titre }}</td>
          <td>{{ song.songbacktitle }}</td>
          <td>{{ song.titrealbum }}</td>
          <td>{{ song.numeroalbum }}</td>
          <td>{{ song.genre }}</td>
          <td>{{ song.artistes }}</td>
          <td>{{ song.date }}</td>
          <td>{{ song.support }}</td>
          <td><button @click="togglePrivacy(song.songbacktitle)">
            <p v-if= song.private>
                Privé
            </p>
            <p  v-if= !song.private>
                Public
            </p>
        </button></td>
          <td><button>Suppr</button></td>
        </tr>
      </tbody>
    </table>
</div>
</template>
<script>
import  AxiosInstance  from '../../../axios';
export default {
  name: 'mainView',
  data() {
    return {
        formData: {
      email: '',
      password: ''},
      songList : []
    }
  },
  methods: {
    togglePrivacy(songbacktitle){
        console.log("songbacktitle",songbacktitle)
        AxiosInstance.post('/toggleSongPrivacy', {songbacktitle : songbacktitle})
        .then(response => {
            console.log(response.data)
            this.fetchData()
        })
        .catch(error => {
            console.log(error)
        });
    },
    fetchData(){
        console.log("caca")
        AxiosInstance.get('/allSongs')
        .then(response => {
            console.log(response.data)
            this.songList = response.data
        })
        .catch(error => {
            console.log(error)
        });
    }
  },
    mounted(){
        this.fetchData()
    }
  }
</script>
<style scoped>
table {
    width : 60%;
    margin : auto;
}
.container{
    display: flex;
}

/* General layout styling */
.leftColumn, .rightColumn {
    padding: 20px;
}

.leftColumn {
    float: left;
    width: 20%;
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
}

.rightColumn {
    float: right;
    width: 75%;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-right: 20px;
}

/* Clear floats */
div::after {
    content: "";
    display: table;
    clear: both;
}

/* Styling for the list and buttons */
ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 10px 0;
    background-color: #e9e9e9;
    padding: 10px;
    border-radius: 5px;
}

label {
    margin-right: 15px;
}

button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}

button:hover {
    background-color: #ff3333;
}

/* Input and Add button styling */
input[type="text"] {
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: calc(100% - 22px); /* Adjust width to fit parent */
}

button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
}

/* Router link styling */
.router-link {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #333;
}

.router-link:hover {
    background-color: #ddd;
}
</style>