<template>
  <div >
    <div class="sidebar">
     <sidebarComponent />
     </div>

    <h1 class="pageTitle">{{ song.titre }}</h1>
    <div class="songContainer">
      <div class="playerCard">
        <div>
          {{ song.band }} | {{ song.titre }}
        </div>
        <img :src="getPathCover(song.pathcover)" alt="cover" class="cover">
       <div class="buttons">
        <button >
          <svg fill="#000000" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 	 viewBox="0 0 512 512" xml:space="preserve">
          <g>
            <g>
              <path d="M256,0C114.608,0,0,114.608,0,256s114.608,256,256,256s256-114.608,256-256S397.392,0,256,0z M256,496
                C123.664,496,16,388.336,16,256S123.664,16,256,16s240,107.664,240,240S388.336,496,256,496z"/>
            </g>
          </g>
          <g>
            <g>
              <path d="M176.416,129.792v252.416L395.024,256L176.416,129.792z M192.416,157.504L363.024,256l-170.608,98.496V157.504z"/>
            </g>
          </g>
          </svg>
         </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
          <path d="M 25 2 C 12.264481 2 2 12.264481 2 25 C 2 37.735519 12.264481 48 25 48 C 37.735519 48 48 37.735519 48 25 C 48 12.264481 37.735519 2 25 2 z M 25 4 C 36.664481 4 46 13.335519 46 25 C 46 36.664481 36.664481 46 25 46 C 13.335519 46 4 36.664481 4 25 C 4 13.335519 13.335519 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
          </svg>
                </button>
       </div>
      </div>
      <div class="songInfo">
        <h2>{{ song.titre }}</h2>
        <p><span class="descSpan"> Artist: </span> {{ song.artistes }}</p>
        <p><span class="descSpan">Album:</span> {{ song.album }}</p>
        <p><span class="descSpan">Genre:</span> {{ song.genre }}</p>
        <p><span class="descSpan">Release Date:</span> {{ formatSongDate(song.date) }}</p>
        <p><span class="descSpan">Support :</span> {{ song.support }}</p>
        <p><span class="descSpan">Description :</span> </p>
        <p>{{ song.description }}</p>
        <router-link :to="`/song/linktree/${song.songbacktitle}`">
          

        </router-link>
            </div>
    </div>
    <div class="lyricsDiv">
        <h1>Paroles</h1>
        {{ song.lyrics }}
    </div>
  </div>
</template>
<script>
import sidebarComponent from '../components/sidebarComponent.vue';
import AxiosInstance from '/axios';
import { API_BASE_URL } from '/axios';
export default {
  name: 'SongView',
  components: {
    sidebarComponent,
  },
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
      formatSongDate(dateStr) {
      // Ensure the date string is in the expected format
      if (dateStr && dateStr.length === 8) {
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);

        // Create a date object
        const date = new Date(`${year}-${month}-${day}`);

        // Options to format the date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        // Return the formatted date string
        return date.toLocaleDateString('en-US', options);
      } else {
        // Return a fallback or an error message
        return 'Invalid date';
      }
    },
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
.songContainer {
  width :60%;
  margin: auto;
  display: flex;
  flex-direction: row; /* This will align the children (the image and the song info) in a row */
  align-items: center; /* This will vertically center the children */
  gap: 20px; /* Adjusts the space between the image and the song info */
}

.playerCard{
  display: flex;
  flex-direction: column;
  align-items: center;
  width : 40%;
  margin-right: 10%;
  gap: 10px;
  z-index: 1; /* Ensures the card is above the lyrics div */
}

.cover {
  width: 80%; /* Adjusts the width of the cover image. You can set this to fit your design */
  height: auto; /* Keeps the aspect ratio of the image */
  margin: auto;
}

.songInfo {
  flex: 1; /* Allows the song info section to take up the remaining space */
}
.playerCard {
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Glassmorphism effect */
  border-radius: 20px; /* Rounded corners */
  padding: 20px; /* Padding around the content */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  color: #fff; /* White text color */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Space out the text, image, and buttons */
  margin: auto; /* Center the card */
  background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%); /* Colorful background */
}

.playerCard .text {
  margin-bottom: 20px; /* Space below the text */
  text-align: center; /* Center the text */
}
.playerCard img {
  width: 100%; /* Default width */
  height: auto; /* Keep the aspect ratio */
  border-radius: 10px; /* Rounded corners */
  border: 1px solid transparent; /* Default border */
  transition: width 0.5s ease, border 0.5s ease, transform 0.5s ease; /* Smooth transition for multiple properties */
  margin: 20px 0; /* Margin around the image */
}

.playerCard img:hover {
  width: 150%; /* Enlarged size */
  border: 1px solid black; /* Solid border on hover */
  transform: rotate(-10deg); /* Rotate on hover */
  /* Removed the duplicate rotate and corrected the transition property */
}

.playerCard .buttons {
  display: flex;
  flex-direction: space-between;
  gap: 10px; /* Space between buttons */
}

.playerCard button {
  padding: 10px 20px; /* Padding inside the buttons */
  border: none; /* Remove border */

  border-radius: 5px; /* Rounded corners for buttons */
  cursor: pointer; /* Pointer cursor on hover */
  background-color: #fff; /* White background for buttons */
  color: #6a11cb; /* Text color for buttons */
  transition: background-color 0.3s, color 0.3s; /* Smooth transition for hover effect */
}

.playerCard button:hover {
  background-color: #6a11cb; /* Background color on hover */
  color: #fff; /* Text color on hover */
}
.songInfo p {
  text-align: left;
}
.songInfo p span{
  font-weight: bold;
}
.lyricsDiv{
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(255, 0, 0, 0.5)), rgba(255, 255, 255, 0.1); /* Adding a dark overlay */
  backdrop-filter: blur(10px); /* Glassmorphism effect */
  transform: translate(0, -30px); /* Move the div up */
  border-radius: 20px; /* Rounded corners */
  padding: 20px; /* Padding around the lyrics */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  color: #fff; /* White text color for readability */
  margin: 20px 0; /* Margin around the div */
  overflow-y: auto; /* Allows scrolling if the content is too long */
  font-family: 'Arial', sans-serif; /* Font family for the lyrics */
  line-height: 1.5; /* Line height for better readability */
  text-align: left; /* Align text to the left */
  width : 80%;
  margin : auto;
  white-space: pre-wrap; /* Preserve whitespace and line breaks */
  margin-bottom: 20px; /* Space below the text */
  text-align: center; /* Center the text */
  font-size: large;
}
.pageTitle {
  text-align: center;
  margin-top: 30px;;
  font-size: xxx-large;
}
</style>

