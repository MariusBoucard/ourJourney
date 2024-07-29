<template>
  <div class="home">


 <div class="layout">
   <div class="sidebar">
     <sidebarComponent />
     </div>
     <div class="main-content">
      <div class="sort-line">
        <div style="width:20%">
          <select v-model="sortType">
            <option value="dateDesc">Date de publication (plus récentes)</option>
            <option value="dateAsc">Date de publication (plus anciennes)</option>
            <option value="alphabetical">Ordre alphabétique</option>
            <option value="unalphabetical">Ordre anti-alphabétique</option>
          </select>
        </div>
        <div style="display: flex;">
          <div class="nameDiv">
            Belle demoiselle
          </div>
          <div class="nameDiv">
            Ballzzy
          </div>
          <div class="nameDiv">
            Marius
          </div>
        </div>
         <div style="width:20%">
          <select v-model="selectedArtist">
            <option v-for="artist in existingArtists" :key="artist" :value="artist">{{ artist }}</option>
          </select>
        </div>
        </div>
      <hr style="width :70%;margin:auto;"/>
      <div class="image-container">
      <img src="assets/banderole.png"/>
      <button class="button-overlay">Dernière chanson publiée</button>
    </div>
        <div class="cardsComponent">
          <template v-for="card in allSongs" :key="card.title">
            <CarteComponent :carteValue="card" />
          </template>
        </div>
      </div>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import CarteComponent from '@/components/carteComponent.vue';
import sidebarComponent from '@/components/sidebarComponent.vue';
import  AxiosInstance  from '../../axios';

export default {
  name: 'HomeView',
  components: {
    sidebarComponent,
    CarteComponent
  },
  data(){
    return {
      allSongs : [{ title: 'caca', genre: 'caca', artist: 'caca', type: 'caac', album: 'caca', picture: 'prout' },{ title: 'caca', genre: 'caca', artist: 'caca', type: 'caac', album: 'caca', picture: 'prout' },{ title: 'caca', genre: 'caca', artist: 'caca', type: 'caac', album: 'caca', picture: 'prout' },{ title: 'caca', genre: 'caca', artist: 'caca', type: 'caac', album: 'caca', picture: 'prout' },{ title: 'caca', genre: 'caca', artist: 'caca', type: 'caac', album: 'caca', picture: 'prout' },{ title: 'caca', genre: 'caca', artist: 'caca', type: 'caac', album: 'caca', picture: 'prout' } ]
    }
  },
  created(){
    AxiosInstance.get('allPublicSongs').then((res)=>{
      console.log(res)
      this.allSongs = res.data
      this.allSongs = this.allSongs.sort((a, b) => new Date(b.date) - new Date(a.date));    
    }).catch((err)=>{
      console.log(err)
    })
    // ...
  }
}
</script>
<style>
:root {
  --dark-green: #064420;
  --deep-grey: #333333;
  --light-color: #ffffff;
}
.cardsComponent{
  display: grid;
  width : 70%;
  margin: auto;
  grid-template-columns: repeat(3, 1fr); /* Creates three columns of equal width */
  gap: 20px; /* Maintains the gap between cards */
  padding-top: 30px;
  justify-items: center; 
}
.layout {
  display: flex;
  height: calc(100vh - /* Topbar height + Footer height */);
}

.sidebar {
  position: fixed;
  z-index: 0; /* Set to negative to ensure it's behind other positioned elements */
  bottom: 50px; /* Extend to 50px above the bottom edge of the viewport */
  flex: 0 0 auto; /* Do not grow, do not shrink, initial width auto */
  height: 100vh;
  overflow-y: auto; /* Enable vertical scrolling if content overflows */
  margin: 0;
}

.main-content {
  flex-grow: 1; /* Takes up the remaining space */
  background-color: #d3d3d3;
  /* Additional styling for the main content area */
}

.image-container {
  width: 70%;
  position: relative; /* Allows absolute positioning of children */
  margin: auto; /* Center the container */
  margin-top: 20px; /* Adjust top margin as needed */
  border-radius: 20px;
}

.image-container img {
  width: 100%; /* Make the image fit the width of the container */
  height: auto; /* Adjust height automatically to maintain aspect ratio */
  object-fit: cover; /* Adjust this as needed to 'contain' or 'cover' */
  border-radius: 20px;
}

.button-overlay {
  position: absolute;
  top: 80%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, 20%); /* Adjust horizontal centering and move slightly towards the bottom */
  background-color: transparent; /* Or any color */
  color: white; /* Text color */
  font-weight: 500;
  font-size: larger;
  border: none; /* Remove border */
  cursor: pointer; /* Change cursor to pointer on hover */
  padding: 10px 20px; /* Adjust padding */
  text-align: center; /* Center text */
  border-radius: 10px; /* Adjust border radius */
}

.button-overlay:hover{
  background-color: rgba(255, 255, 255, 0.5); /* Add a semi-transparent background on hover */
  color: black; /* Change text color on hover */
}

.sort-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin:auto;
  padding: 10px;
}

.nameDiv {
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
}
.nameDiv:hover {
  background-color: var(--deep-grey);
  color: var(--light-color);
  transition: 0.3s ease;
}
</style>