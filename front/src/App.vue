<template>
  <navComponent></navComponent>
  <nav>

    <img alt="Vue logo" src="./assets/logo.png">



    <router-link to="/">Home</router-link> |
    <router-link to="/song">About</router-link>

  </nav>
  <router-view/>
  <playerComponent></playerComponent>
</template>
<script>
import navComponent from './components/navComponent.vue';
import playerComponent from './components/playerComponent.vue';
import  AxiosInstance  from '../axios';
export default {
  name: 'app',
  components : {
    navComponent,
    playerComponent
  },
  methods: {
    // ...
  },data(){
    return {
      allSongs : [],
      songsFiltered : [],
      currentPlaylist : [],
      currentSong : {},
      
    }
  },
  created(){
    AxiosInstance.get('allPublicSongs').then((res)=>{
      console.log(res)
      this.allSongs = res.data
    }).catch((err)=>{
      console.log(err)
    })
    // ...
  }
} 
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
