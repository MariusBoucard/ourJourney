<template>
    <div class="sidebar" :class="{ 'over': menuOpen}" @mouseover="menuOpen = true" @mouseleave="menuOpen = false">
      <div style="margin-top :150px" class="itemLine">
        <!-- Recherche -->
        <img src="/assets/loupe.png" alt="search" class="roundedPic">
        <div v-if="this.menuOpen" class="lineName">
          <input v-model="searchSong" class="beautifulInput"  @input="updateSearchTerm" placeholder="Chercher une chanson"/>
        </div>
      </div>
      <div class="titleFix">

        <!-- <div v-if="this.menuOpen" class="sidebar-title">Title</div> -->
      </div>
 
     
      
      <div class="menu-items">
        <!-- Artists linktree -->
   
        <a href="https://open.spotify.com/intl-fr/artist/57s3WOuEzD9ueruw3QKrYU?si=In7yJiw_QUm9ZrUsU1LbHQ">
          <div class="itemLine">
            <img src="/logos/spotify.png" alt="search" class="roundedPic">
            <span v-if="this.menuOpen" class="lineName">Ballzzy- Spotify</span>
        </div>
        </a> 
        <a href="https://deezer.page.link/YkXXz2ge6mAFZzxr8">
          <div class="itemLine">
            <img src="/logos/deezer.png" alt="search" class="roundedPic">
            <span v-if="this.menuOpen" class="lineName">Ballzy - Deezer</span>
        </div>
        </a>   
        <a href="https://open.spotify.com/intl-fr/artist/1ihPL4eI2ThTMGhWiPVef0?si=wLLwpo2XS7WxKz8l3zOY6g">
          <div class="itemLine">
            <img src="/logos/spotify.png" alt="search" class="roundedPic">
            <span v-if="this.menuOpen" class="lineName">Belle Demoiselle - Spotify</span>
        </div>
        </a>
        <a href="https://deezer.page.link/TTWMro5dUvEUFU9W6">
          <div class="itemLine">
            <img src="/logos/deezer.png" alt="search" class="roundedPic">
            <span v-if="this.menuOpen" class="lineName">Belle Demoiselle - Deezer</span>
        </div>
        </a>   
        <a href="https://brutalfekal.fr/">
          <div class="itemLine">
            <img src="/assets/bf.jpg" alt="search" class="roundedPic">
            <span v-if="this.menuOpen" class="lineName">Brutal Fekal Website</span>
        </div>
        </a> 

        <a href="https://www.instagram.com/marius_bbs/">
          <div class="itemLine">
            <!-- brutal webSite -->
        <img src="/assets/insta.png" alt="search" class="roundedPic">
        <span v-if="this.menuOpen" class="lineName">Instagram</span>
      </div>
        </a>

      </div>

      <div :class="hamburgerMenuClass" @click="toggleMenu">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>

      
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        menuOpen: false,
        searchSong: '', // This property is bound to the input
      };
    },
    computed: {
      ...mapGetters(['search']),
      hamburgerMenuClass() {
          if(this.menuOpen){
            return 'hamburger-menu menu-open';
        }else{
            return 'hamburger-menu';
        }
      
    }},
    methods: {
      ...mapActions(['updateSearch']),
    updateSearchTerm() {
      this.updateSearch(this.searchSong);
    },
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .beautifulInput {
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-right: 20px;
  margin-left: 20px;

}


  .sidebar {
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* This will push the menu to the bottom */
  background: rgba(255, 0, 0, 0.658); /* Semi-transparent white */
  backdrop-filter: blur(10px); /* Blur effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari */
  border: 1px solid rgba(255, 255, 255, 0.25); /* Subtle border */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  height: 100%;
  z-index: 0;
  overflow-y: hidden; /* Prevent vertical scrolling */

  }
  
  .sidebar-title {
    margin-bottom: 20px;
  }
  .itemLine:focus-within {
  width: 100%; /* Ensures the element maintains its full width */
  flex-shrink: 0; /* Prevents the element from shrinking */
}
  .user-profile {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .profile-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .username {
    display: none;
  }
  
  .hamburger-menu {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 40px;

  }
  
  .hamburger-menu:hover .bar {
    background-color: rgb(136, 190, 160) !important;
    transition: background-color 0.3s ease; /* Smooth transition for background-color */
  }

  .bar {
    width: 35px;
    height: 5px;
    background-color: #333;
  }
  
  .menu-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width : 100%;
    margin-top: 20px;
  }
  
  .menu-items a {
    text-decoration: none;
    color: #333;
   width:100%;
  }
  
  /* When menu is open, show username and adjust styles */
  .sidebar.menu-open .username {
    display: block;
  }
  
  .menu-open.hamburger-menu {
    transform: rotate(90deg);
  }
  .roundedPic {
  width: 40px;
  height: 40px; /* Ensuring the image is a perfect circle */
  border-radius: 50%;
  object-fit: cover; /* Ensures the image covers the area without losing its aspect ratio */
  /*transition: transform 0.3s ease; /* Smooth transition for scale effect */
  margin-right: 20px;
  margin-left: 20px;

}

.itemLine {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: #333;
height: 40px;
  gap: 10px;
  padding: 10px 0; /* Adds padding to the top and bottom for better spacing */
  transition: background-color 0.3s ease; /* Smooth transition for background color change */
}



.itemLine:hover {
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent black for glass effect */
  backdrop-filter: blur(5px); /* Blur effect for glass look */
  -webkit-backdrop-filter: blur(5px); /* For Safari */
    color: white ; /* White text color for contrast */
  cursor: pointer; /* Indicates it's clickable */
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1); /* Soft glow for realism */ /* Changes the cursor to indicate it's clickable */
  transform: none; /* Ensure no zoom effect */
  overflow: hidden; /* Prevents the element from becoming scrollable */
  /* height: wrap-content; */


}
.itemLine > span {
  margin : auto;
}
.lineName {
  font-size: 16px;
  font-weight: bold; /* Makes the text bold for better readability */
  transition: color 0.3s ease; /* Smooth transition for text color change */
}

@media (max-width: 768px) {
  .roundedPic{
    width: 30px;
    height: 30px;
  }
  .bar{
    width: 25px;
    height: 3px;
  }


}
  </style>