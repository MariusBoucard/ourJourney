<template>
  <div class="container">
    <div class="song-cover">
      <img src="assets/bf.jpg" alt="Picture" class="cover">
    </div>
    <div class="song-info">
      <h1>Bangers les plus frais :</h1>
    </div>
    <div class="platforms">
      <div v-for="song in songs" :key="song.id" class="song-container plateform"
        @click="redirectToLinktree(song[0].songbacktitle)">
        <img :src="getPathCover(song[0].pathcover)" alt="Picture" class="cov">
        <div class="text-button-container">
          <div class="left-column"></div> <!-- Placeholder for left column -->
          <div class="center-column">
            <span class="text">{{ song[0].titre }}</span>
          </div>
          <div class="right-column">
            <button @click.stop="redirectToPage(song[0].songbacktitle)" class="redirect-button">
              <img src="assets/export.png" class="buttonImage"/>
            </button>
          </div>
        </div>
      </div>

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
      songs: [],
      baseURL: API_BASE_URL

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
    AxiosInstance.get(`/linktreePageData`)
      .then((response) => {
        this.songs = response.data;
        console.log(this.songs)
      })
      .catch((error) => {
        console.error(error);
      });

  },
  methods: {
    redirectToLinktree(songbacktitle) {
      this.$router.push(`/song/linktree/${songbacktitle}`);
    },
    isOnPlateform(platform) {
      return this.songLinks && this.songLinks[platform] !== undefined && this.songLinks[platform] !== '';
    },
    getPathCover(path) {
      let splits = path.split('/')
      if (splits.length > 1) {
        console.log(this.baseURL + splits[splits.length - 1])
        return this.baseURL + "/cover/" + splits[splits.length - 1]
      }
      return ''
    },
    redirectToPage(pageIdentifier) {
      // Logic to redirect to the specific page
      // For example, using Vue Router:
      this.$router.push({ name: 'song', params: { id: pageIdentifier } });
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

.platforms {
  display: flex;
  width: 40%;
  flex-direction: column;
  margin-bottom: 50px;
  background: linear-gradient(145deg, rgba(135, 222, 235, 0.5), rgba(255, 177, 193, 0.5));
  /* Soft blue to pink gradient */
  border-radius: 15px;
  /* Optional: adds rounded corners */
  padding: 20px;
  /* Optional: adds some space inside the div */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.platforms a {
  background-color: rgba(255, 0, 0, 0.5);
  /* Red with reduced opacity */
}

.platforms a:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.5);
  /* Black with reduced opacity */
  color: white;
}

.platform {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  border-radius: 10px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  /* Blur effect */
  -webkit-backdrop-filter: blur(10px);
  /* For Safari */
  border: 1px solid rgba(255, 255, 255, 0.18);
  /* Slight white border for definition */
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  /* Smooth transition for color and border color */

}


.cover {
  height: 100%;
  border-radius: 50%;
}

.roundedImage {
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 50%;
}

.text {
  flex-grow: 1;
  text-align: center;
  /* Adjusts text alignment */
  font-weight: 600;
  font-size: large;
}

.song-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  background: linear-gradient(135deg, rgba(255, 0, 0, 0.4), rgba(255, 0, 0, 0.7));
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 0, 0, 0.18);
  box-shadow: 0 4px 6px rgba(255, 0, 0, 0.1);
}



.cov {
  width: 90%;
  margin-top: 5%;
  object-fit: cover;
  /* Adjust this as needed */
  margin-bottom: 10px;
  /* Space between image and text */
}

.text-button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-bottom: 20px;
  /* Match the image width for alignment */
}

.left-column,
.center-column,
.right-column {
  flex: 1;
  /* Each column takes up equal space */
  display: flex;
  justify-content: center;
  /* Center content horizontally */
  align-items: center;
  /* Center content vertically */
}

.center-column {
  justify-content: center;
  /* Ensures text in the center column is centered */
}

.right-column {
  justify-content: flex-end;
  /* Aligns the button to the right */
}

.text {
  font-size: 25px;
  /* Adjust font size as needed */
  text-align: center;
}

.platform {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  text-decoration: none;
  color: inherit;
  /* Ensures text color is not changed */
}

.redirect-button {
  padding: 10px 20px;
  width: 40%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  /* Makes the button round */
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.redirect-button:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.song-container:hover {
  background: none;
  background-color: rgba(255, 255, 255, 0.75) !important;
  /* Lighter white on hover */
  border: 1px solid black !important;
  color: black !important;
}

.song-container:hover .redirect-button {
  background-color: black;
}
.buttonImage{
  width : 70%;
}
@media (max-width: 768px) {
.platforms{
  width: 80%;
}
.redirect-button{
  padding: 5px;
}
}
</style>