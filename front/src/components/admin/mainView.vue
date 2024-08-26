<template>
<div class="container">
    <div>
        <router-link to="admin/addSong">Add song</router-link>
        <router-link to="admin/updateLinktree">Add song</router-link>

    </div>
    <table>
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
</style>