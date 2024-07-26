<template>
    <div class="card">
      <div class="card-content">
        <h2>{{ carte.title }}</h2>
        <img :src="carte.picture" alt="Picture" class="card-img">
        <p>Genre: {{ carte.genre }}</p>
        <p>Artist: {{ carte.artist }}</p>
        <p>Type: {{ carte.type }}</p>
        <p>Album: {{ carte.album }}</p>
      </div>
      <div class="card-actions">
        <button @click="addToPlaylist">Add to Playlist</button>
        <button @click="listenSong">Listen Song</button>
        <button @click="goToPage">Go to Page</button>
        <button @click="seeOnSocial">See on Social Networks</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['carteValue'],
    data() {
      return {
        carte: this.carteValue
      }
    },
    watch: {
      carteValue: {
        immediate: true,
        handler(newValue) {
          this.carte = newValue;
        }
      }
    },
    methods: {
      addToPlaylist() {
        // Implement adding to playlist
      },
      listenSong() {
        // Implement listening to the song
      },
      goToPage() {
        // Implement navigation to the page
      },
      seeOnSocial() {
        // Implement seeing on social networks
      }
    }
  }
  </script>
  
  <style scoped>
:root {
  --dark-green: #064420;
  --deep-grey: #333333;
  --light-color: #ffffff;
}

.home {
  background-color: #064420;
  color: #ffffff;
}

/* Glassmorphism style for the card */
.card {
  background: rgba(255, 255, 255, 0.15);
  /* backdrop-filter: blur(10px); */
  border: 1px solid rgba(255, 255, 255, 0.18);
}



.card-actions button {
  background-color: #064420;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 5px;
}

.card-actions button:hover {
  background-color: #ffffff;
  color: #064420;
}

.card-actions button:active {
  transform: scale(0.95);
}

/* Adding a subtle shadow to buttons for depth */
.card-actions button {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* Enhancing the hover effect with a slight rotation */
.card-actions button:hover {
  transform: translateY(-3px) rotate(-2deg);
}
  </style>