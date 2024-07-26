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
    background: none;
    border: none;
    color: white;
    font-size: 20px;
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