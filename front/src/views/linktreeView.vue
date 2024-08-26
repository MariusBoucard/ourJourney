<template>
    <div class="container">
      <div class="song-cover">
        <img src="assets/bf.jpg" alt="Picture" class="cover">
      </div>
      <div class="song-info">
        <h1>Bangers les plus frais :</h1>

      </div>
      <div class="platforms">
        <a v-if="isOnPlateform('yt')" :href="songLinks.yt" class="platform">
            <img src="/logos/youtube.png" class="roundedImage">
            <span class="text">
              {{ song.titre }} - YouTube
            </span>
        </a>

        <a  v-if="isOnPlateform ('spotify')" :href="songLinks.spotify" class="platform">
            <img src="/logos/spotify.png" class="roundedImage">
            <span class="text">

            {{ song.titre }} - Spotify
          </span>

          </a>
        <a  v-if="isOnPlateform('deezer')" :href="songLinks.deezer" class="platform">
            <img src="/logos/deezer.png" class="roundedImage">
            <span class="text">
            {{ song.titre }} - Deezer
          </span>
        
        </a>
        <a  v-if="isOnPlateform('soundcloud')" :href="songLinks.soundcloud" class="platform">
            <img src="/logos/soundcloud.png" class="roundedImage">
            <span class="text">

            {{ song.titre }} - SoundCloud
          </span>
        </a>
        <a  v-if="isOnPlateform('apple')" :href="songLinks.apple" class="platform">
            <img src="/logos/apple.png" class="roundedImage">
            <span class="text">

            {{ song.titre }} - Apple Music
          </span>
        </a>
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
        songLinks : {
          yt: undefined,
          spotify: undefined,
          deezer: undefined,
          soundcloud: undefined,
          apple: undefined
        },
        baseURL : API_BASE_URL

      };
    },
    computed: {
      isOnPlatform() {
        return (platform) => {
          return this.songLinks && this.songLinks[platform] !== undefined;
        };
      },  
      },
    created() {
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
            if(response.data.length ===1){
            this.songLinks = response.data[0]; 
        }      
        })
        .catch((error) => {
            console.error(error);
        });

    console.log(id); // Do something with the id
  },
    methods: {
      isOnPlateform(platform){
        return this.songLinks && this.songLinks[platform] !== undefined && this.songLinks[platform] !== '';
      },
        getPathCover(path){
        let splits = path.split('/')
        if(splits.length > 1){
            console.log(this.baseURL + splits[splits.length - 1])
          return this.baseURL+"/cover/" + splits[splits.length - 1]
        }
        return ''
      },
      
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
.platforms {
  display: flex;
  width: 40%;
  flex-direction: column;
  margin-bottom: 50px;
  background: linear-gradient(145deg, rgba(135, 222, 235, 0.5), rgba(255, 177, 193, 0.5)); /* Soft blue to pink gradient */
  border-radius: 15px; /* Optional: adds rounded corners */
  padding: 20px; /* Optional: adds some space inside the div */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
}

.platforms a {
  background-color: rgba(255, 0, 0, 0.5); /* Red with reduced opacity */
}

.platforms a:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.5); /* Black with reduced opacity */
  color: white;
}

.platform {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  border-radius: 10px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px); /* Blur effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari */
  border: 1px solid rgba(255, 255, 255, 0.18); /* Slight white border for definition */
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; /* Smooth transition for color and border color */

}

.platform:hover {
  background-color: rgba(255, 255, 255, 0.75) !important; /* Lighter white on hover */
  border: 1px solid black !important;
  color: black !important;
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
  font-weight: 600;
  font-size: large;
}

  </style>
  