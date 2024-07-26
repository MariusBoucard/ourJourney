<template>
  <div >
    <h1>This is the song page</h1>
    <div class="songBandeau">
      <div>
        <img :src="getPathCover(song.pathcover)" alt="cover" class="cover">
        playbutton tout ca  
      </div>
      <div class="songInfo">
        <h2>{{ song.titre }}</h2>
        <p>Artist: {{ song.artistes }}</p>
        <p>       </p>
        <p>Album: {{ song.album }}</p>
        <p>Genre: {{ song.genre }}</p>
        <p>Release Date: {{ song.date }}</p>
        <p>Support : {{ song.support }}</p>
        <p>description: {{ song.description }}</p>
      </div>
    </div>
    <div class="lyricsDiv">
        {{ song.lyrics }}
    </div>
  </div>
</template>
<script>
import AxiosInstance from '/axios';
import { API_BASE_URL } from '/axios';
export default {
  name: 'SongView',
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
    methods : {
      getPathCover(path){
        let splits = path.split('/')
        if(splits.length > 1){
            console.log(this.baseURL + splits[splits.length - 1])
          return this.baseURL+"/cover/" + splits[splits.length - 1]
        }
        return ''
      },
    },
    mounted() {
    // Accessing the 'id' parameter from the route
    const id = this.$route.params.id;
    // Fetching the song data from the API
    AxiosInstance.get(`/song/${id}`)
      .then((response) => {
        this.song = response.data;
        if(response.data.length ===1){
            this.song = response.data[0];
        }
        console.log(this.song);
      })
      .catch((error) => {
        console.error(error);
      });   
      // Fetching the song links from the API
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
    },
  
};
</script>
<style scoped>
.songBandeau {
  display: flex;
  flex-direction: row; /* This will align the children (the image and the song info) in a row */
  align-items: center; /* This will vertically center the children */
  gap: 20px; /* Adjusts the space between the image and the song info */
}

.cover {
  max-width: 200px; /* Adjusts the width of the cover image. You can set this to fit your design */
  height: auto; /* Keeps the aspect ratio of the image */
}

.songInfo {
  flex: 1; /* Allows the song info section to take up the remaining space */
}
</style>
