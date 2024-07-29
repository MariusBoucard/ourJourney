<template>
    <div class="player">
      <div class="transport-controls">
        <button @click="previousSong">⏮️</button>
        <button @click="togglePlay">{{ isPlaying ? '⏸️' : '▶️' }}</button>
        <button @click="nextSong">⏭️</button>
      </div>
      <div class="song-info">
        <span>{{ currentSong.name }}</span>
        <div class="progress-bar" :style="{ width: progressBarWidth + '%' }"></div>
      </div>
      <img class="album-cover" :src="currentSong.albumCover" alt="Album Cover">
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentSong: {
          name: 'Song Name',
          albumCover: 'path/to/album/cover.jpg',
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
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    color: white;
  }
  .transport-controls button {
  background-color: #4CAF50; /* Green background */
  border: none; /* Removes the default border */
  color: white; /* White text color */
  padding: 10px 20px; /* Padding around the text */
  text-align: center; /* Center the text/icon */
  text-decoration: none; /* Removes underline from icons/text */
  display: inline-block; /* Allows setting dimensions */
  font-size: 16px; /* Increases the font size */
  margin: 4px 2px; /* Adds some space around the buttons */
  transition: all 0.3s ease; /* Smooth transition for hover effects */
  cursor: pointer; /* Changes cursor to pointer to indicate it's clickable */
  border-radius: 5px; /* Slightly rounded corners for a softer look */
}

.transport-controls button:hover {
  background-color: #45a049; /* Darker shade of green on hover */
  transform: scale(1.1); /* Slightly enlarges the button */
}

.transport-controls button:focus {
  outline: none; /* Removes the outline to keep the design clean */
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
    height: 100%;
    aspect-ratio: 1;
  }
  </style>