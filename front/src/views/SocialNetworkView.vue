<template>
    <div class="container">
      <div class="song-cover">
        <img :src=getPathCover(song.pathcover) alt="Picture" class="cover">
      </div>
      <div class="song-info">
        <h1>{{ song.titre }}</h1>
        <p>{{ song.artistes }}</p>
        <p>{{ song.titrealbum }}</p>
      </div>
      <div class="platforms">
        <a v-if="isOnPlateform('yt')" :href="songLinks.yt" class="platform">
            <img src="/logos/youtube.png" class="roundedImage">
            <span class="text">
              {{ song.titre }} - YouTube
            </span>
        </a>

        <a  v-if="isOnPlateform('spotify')" :href="songLinks.spotify" class="platform">
            <img src="/logos/spotify.png" class="roundedImage">
            {{ song.titre }} - Spotify</a>
        <a  v-if="isOnPlateform('deezer')" :href="songLinks.deezer" class="platform">
            <img src="/logos/deezer.png" class="roundedImage">
            {{ song.titre }} - Deezer</a>
        <a  v-if="isOnPlateform('soundcloud')" :href="songLinks.soundcloud" class="platform">
            <img src="/logos/soundcloud.png" class="roundedImage">
            {{ song.titre }} - SoundCloud</a>
        <a  v-if="isOnPlateform('apple')" :href="songLinks.apple" class="platform">
            <img src="/logos/apple.png" class="roundedImage">
            {{ song.titre }} - Apple Music</a>
      </div>
  
    </div>
  </template>
  
  <script>
  import AxiosInstance from '/axios';
  import { API_BASE_URL } from '/axios';

  export default {
    name: 'SocialNetworkView',
    data() {
      return {
        song: {
          titre: 'Song Title',
          artists: 'Artist Name',
          pathcover: 'path/to/cover.jpg',
        },
        songLinks : [],
        baseURL : API_BASE_URL

      };
    },
    mounted() {
    // Accessing the 'id' parameter from the route
    const id = this.$route.params.id;
    AxiosInstance.get(`/song/${id}`)
      .then((response) => {
        console.log(this.baseURL)
        this.song = response.data;
        if(response.data.length ===1){
            this.song = response.data[0];
        }
        console.log(this.song);
      })
      .catch((error) => {
        console.error(error);
      });   
      AxiosInstance.get(`/songLinks/${id}`)
        .then((response) => {
            console.log(this.baseURL)
            if(response.data.length ===1){
            this.songLinks = response.data[0];
        }
                    console.log(this.songLinks);
        })
        .catch((error) => {
            console.error(error);
        });

    console.log(id); // Do something with the id
  },
    methods: {
        getPathCover(path){
        let splits = path.split('/')
        if(splits.length > 1){
            console.log(this.baseURL + splits[splits.length - 1])
          return this.baseURL+"/cover/" + splits[splits.length - 1]
        }
        return ''
      },
      isOnPlateform(id){
        if(this.songLinks){
            return this.songLinks[id] !== "";
        }
      }
    }
    // Component logic here
  }
  </script>
  
  <style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.song-cover {
  margin-top: 50px;
  width: 200px;
  height: 200px;
}
.platforms { /* Corrected from .plateforms to .platforms */
  display: flex;
  width:40%;
  flex-direction: column;
  margin-bottom: 50px;
}
.platforms a {
  background-color: red; /* Assuming this is your default link color */
}

.platforms a:nth-child(odd) {
  background-color: black;
  color : white; /* Targets every other link starting from the first */
}
.platform {
  display: flex;
  align-items: center;
  text-decoration: none; /* Optional: removes underline from links */
  color: inherit; 
  border-radius: 10px;;
  margin-bottom: 20px;
}
.cover{
    height:100%;
    border-radius: 50%;
}
.roundedImage {
    width: 50px;
    height: 50px;
    margin : 10px;
    border-radius: 50%;
}
.text {
  flex-grow: 1;
  text-align: center; /* Adjusts text alignment */
}

  </style>
  