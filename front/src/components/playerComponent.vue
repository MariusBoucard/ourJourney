<template>
  <div class="player">
    <div class="progress-container" @click="seekSong($event)">
      <div class="progress-bar"  ref="progressBar" :style="{ width: progressBarWidth + '%' }"></div>
      <div class="progress-dot" @mousedown="startDrag" :style="{ left: progressBarWidth + '%' }"></div>
    </div>
    <div class="time-display">{{  currentTimeFormatted }} / {{ durationFormatted }}</div>
    <audio ref="audioPlayer" @loadedmetadata="updateSongDuration" @timeupdate="updateCurrentTime">
      <source :src="songLink" type="audio/wav">
      Your browser does not support the audio element.
    </audio>
    <img class="album-cover" :src="currentSong.albumCover" alt="Album Cover">

    <div class="song-info">
      <span>{{ currentSong.name }}</span>
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
  watch: {
    // Watch for changes in songLink
    songLink(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadNewSong();
      }
    }
  },
  data() {
    return {
      playlist: [],
      songLink : "http://localhost:3000/files/song/backhome.wav",
      currentSong: {
        name: 'Back Home',
        albumCover: 'http://localhost:3000/files/cover/backhome.png',
      },
      isPlaying: false,
      songDuration: 180, // in seconds
      currentTime: 0, // in seconds,
      };
  },
  computed: {
    progressBarWidth() {
      return (this.currentTime / this.songDuration) * 100;
    },
    currentTimeFormatted() {
      return this.formatTime(this.currentTime);
    },
    durationFormatted() {
      return this.formatTime(this.songDuration);
    }
  },
  methods: {
    seekSong(event) {
      const progressBar = this.$el.querySelector('.progress-container');
      const clickX = event.offsetX;
      const duration = this.$refs.audioPlayer.duration;
      const newTime = (clickX / progressBar.offsetWidth) * duration;
      this.$refs.audioPlayer.currentTime = newTime;
    },

    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
    loadNewSong() {
      const audio = this.$refs.audioPlayer;
      if (audio) {
        audio.load(); // Reloads the audio element to fetch the new source
        this.songDuration = 0;
        this.currentTime = 0;
        if (this.isPlaying) {
          this.playSong(); // Automatically play the new song if isPlaying is true
        }
      }
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      this.isPlaying ? this.playSong() : this.pauseSong();
    },
    playSong() {
      const audio = this.$refs.audioPlayer;
      if (audio) {
        audio.play();
      }
    },
    pauseSong() {
      const audio = this.$refs.audioPlayer;
      if (audio) {
        audio.pause();
      }
    },
    updateSongDuration() {
      const audio = this.$refs.audioPlayer;
      if (audio) {
        this.songDuration = audio.duration;
      }
    },
    updateCurrentTime() {
      const audio = this.$refs.audioPlayer;
      if (audio) {
        this.currentTime = audio.currentTime;
      }
    },
    startDrag() {
      document.addEventListener('mousemove', this.dragging);
      document.addEventListener('mouseup', this.stopDrag);
    },
    dragging(event) {
      const progressBar = this.$refs.progressBar; // Ensure you have a ref="progressBar" on your progress-container
      const bounds = progressBar.getBoundingClientRect();
      console.log(bounds);
      let progress =0;
      if(bounds.width > 0){
        progress = Math.min(Math.max(1, event.clientX - bounds.left), bounds.width) / bounds.width;
      }
      else{
        bounds.width = 100;
        progress = Math.min(Math.max(1, event.clientX - bounds.left), bounds.width) / bounds.width;

      }
      console.log(progress);
      this.$refs.audioPlayer.currentTime = parseFloat(progress * this.$refs.audioPlayer.duration);
      this.updateProgressBar(progress * 100); // Implement this method to visually update the progress bar based on drag
    },
    stopDrag() {
      document.removeEventListener('mousemove', this.dragging);
      document.removeEventListener('mouseup', this.stopDrag);
    },
    updateProgressBar(progress) {
      // Update your progress bar's width here based on the progress percentage
      this.progressBarWidth = progress; // Assuming you have a progressBarWidth data property controlling the width
    },
  },
  mounted() {
    this.loadNewSong();
  },
};
</script>

<style scoped>
/* Existing styles */
.progress-container {
  position: absolute;
  top :0px;
  left:1%;
  width: 98%;
  height: 2px;
  background-color: #ccc;
  cursor: pointer;
  border-radius: 5px;
}
.progress-container:hover{
  height: 4px;
  transform: height 0.3s;
}
.progress-container:hover .progress-dot{
  height: 16px;
  width: 16px;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
}

.progress-dot {
  position: absolute;
  top: -3px; /* Adjust based on the size of the dot */
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #4caf50;
  transform: translateX(-50%);
  transition: width 0.3s, height 0.3s;
}

.progress-dot:hover {
  width: 16px;
  height: 16px;
}

.time-display {
  margin-top: 5px;
  margin-left : 20px;
}

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

  margin-left: 20px;
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