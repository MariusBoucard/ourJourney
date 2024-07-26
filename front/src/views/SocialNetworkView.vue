<template>
    <div class="container">
      <div class="song-cover">
        <img src="path/to/your/song-cover.jpg" alt="Song Cover">
      </div>
      <div class="song-info">
        <h1>Song Title</h1>
        <p>Artist Name</p>
      </div>
      <div class="platforms">
        <div class="platform">YouTube</div>
        <div class="platform">Spotify</div>
        <div class="platform">Deezer</div>
        <div class="platform">SoundCloud</div>
        <div class="platform">Apple Music</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SocialNetworkView',
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
  </style>
  