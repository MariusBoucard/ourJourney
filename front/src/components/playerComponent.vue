<template>
  <div class="player">
    <img class="album-cover" :src="currentSong.albumCover" alt="Album Cover">

    <div class="song-info">
      <span>{{ currentSong.name }}</span>
      <div class="progress-bar" :style="{ width: progressBarWidth + '%' }"></div>
    </div>
    <div class="transport-controls">
      <button @click="previousSong">
        <img style="height:100%;" src="/assets/player/derniereChanson.svg" alt="Dernière chanson">
      </button>
      <button @click="togglePlay">

    <img style="height:65%;" v-if="!isPlaying" src="/assets/player/play.svg" alt="Dernière chanson">
    <img style="height:65%;" v-else src="/assets/player/pause.svg" alt="Dernière chanson">
 
  </button>
  <button @click="nextSong">
    <img style="height:100%;" src="/assets/player/chansonApres.svg" alt="Dernière chanson">
  </button>
    </div>
    <div class="playlist-div">
      Playlist
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      currentSong: {
        name: 'Back Home',
        albumCover: 'http://localhost:3000/files/cover/backhome.png',
        // Additional song details can be added here
      },
      isPlaying: false,
      // Simulate song duration and current time
      songDuration: 180, // in seconds
      currentTime: 0, // in seconds
    };
  },
  computed: {
    progressBarWidth() {
      return (this.currentTime / this.songDuration) * 100;
    },
  },
  methods: {
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      // Here you would control the actual playback of the song
    },
    nextSong() {
      // Logic to go to the next song
    },
    previousSong() {
      // Logic to go to the previous song
    },
    loadSong() {
      // Fetch song details from backend and update `currentSong`
    },
  },
  mounted() {
    this.loadSong();
  },
};
</script>

<style scoped>

.player {
  position: fixed;
  bottom: 20px;
  left: 0;
  /* Added to ensure horizontal centering */
  right: 0;
  /* Added to ensure horizontal centering */
  margin: auto;
  margin: auto;
  width: 60%;
  border-radius: 10px;
  height: 7%;
  display: flex;
  align-items: center;
  background-color: rgba(51, 51, 51, 0.5);
  /* Semi-transparent background */
  color: white;
  backdrop-filter: blur(10px);
  /* Blur effect for glassmorphism */
  -webkit-backdrop-filter: blur(10px);
  /* For Safari */
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  /* Subtle top border for a glass effect */
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.3);
  /* Shadow for depth, adjusted to appear above the player */
}

.transport-controls button {
  background-color: transparent;
  /* Transparent background */
  height: 70%;
  width : 30%;
  border: none;
  /* Removes the default border */
  color: white;
  /* White text color for the icon */
  /* Padding around the icon */
  display: flex;
  /* Use flex to center the icon */
  justify-content: center;
  /* Center the icon horizontally */
  align-items: center;
  /* Center the icon vertically */
  font-size: 24px;
  /* Adjust icon size as needed */
  /* Adds some space around the buttons */
  transition: color 0.3s ease, transform 0.3s ease;
  /* Smooth transition for hover effects */
  cursor: pointer;
  /* Changes cursor to pointer to indicate it's clickable */
  border-radius: 50%;
  /* Circular buttons */
}

.transport-controls button:hover {
  color: #ffffff;
  /* Keeps the icon color white on hover */
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  /* Glowing effect */
  transform: scale(1.1);
  /* Slightly enlarges the button */
}

.transport-controls button:focus {
  outline: none;
  /* Removes the outline to keep the design clean */
}

.transport-controls {
  display: flex;
height: 100%;
  width: 30%;
  align-items: center;
  justify-content: center;
  /* Centers buttons horizontally */

}

.song-info {
  flex-grow: 1;
  position: relative;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: red;
}

.album-cover {
  height: 75%;

  margin-left: 10px;
  border-radius: 10px;
  aspect-ratio: 1;
  object-fit: cover;
  /* Ensures the image covers the area without losing its aspect ratio */
  box-shadow: 0 0 0 2px white;
  /* Creates a thin white outline */
  display: block;
  /* Ensures the image is properly displayed */
}

.playlist-div {
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  width: 15%;
}
</style>