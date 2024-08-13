<template>
    <div class="sidebar" @mouseover="menuOpen = true" @mouseleave="menuOpen = false">
      <div style="margin-top :150px" class="itemLine">
        <!-- Recherche -->
        <img src="/assets/loupe.png" alt="search" class="roundedPic">
        <div v-if="this.menuOpen" class="lineName">
          <input v-model="searchSong" class="beautifulInput" placeholder="Chercher une chanson"/>
        </div>
      </div>
      <div class="titleFix">

        <div v-if="this.menuOpen" class="sidebar-title">Title</div>
      </div>
 
     
      
      <div class="menu-items">
        <!-- Artists linktree -->
        <a href="#">
          <div class="itemLine">
            <img src="/logos/spotify.png" alt="search" class="roundedPic">
            <span v-if="this.menuOpen" class="lineName">Ballzy sur Spotify</span>
        </div>
        </a>
        <a href="#">
          <div class="itemLine">
            <img src="/logos/deezer.png" alt="search" class="roundedPic">
            <span v-if="this.menuOpen" class="lineName">Ballzy sur Deezer</span>
        </div>
        </a>    
        
        <a href="#">
          <div class="itemLine">
            <img src="/assets/bf.jpg" alt="search" class="roundedPic">
            <span v-if="this.menuOpen" class="lineName">Brutal Fekal Website</span>
        </div>
        </a> 

        <a href="#">
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
  export default {
    data() {
      return {
        menuOpen: false,
        searchSong: '', // This property is bound to the input
      };
    },
    computed: {
      hamburgerMenuClass() {
          if(this.menuOpen){
            return 'hamburger-menu menu-open';
        }else{
            return 'hamburger-menu';
        }
      
    }},
    methods: {
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

  transition: all 0.3s ease;
}

.beautifulInput:focus {
  outline: none;
  border-color: #007BFF;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
  .sidebar {
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* This will push the menu to the bottom */
  background: rgba(255, 255, 255, 0.15); /* Semi-transparent white */
  backdrop-filter: blur(10px); /* Blur effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari */
  border: 1px solid rgba(255, 255, 255, 0.25); /* Subtle border */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  height: 100vh;
  z-index: 0;
  overflow-y: hidden; /* Prevent vertical scrolling */

  }
  
  .sidebar-title {
    margin-bottom: 20px;
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
  transition: transform 0.3s ease; /* Smooth transition for scale effect */
  margin-right: 20px;
  margin-left: 20px;

}

.itemLine {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: #333;

  gap: 10px;
  padding: 10px 0; /* Adds padding to the top and bottom for better spacing */
  transition: background-color 0.3s ease; /* Smooth transition for background color change */
}

.itemLine:hover .roundedPic {
  transform: scale(1.1); /* Slightly enlarges the image on hover */
}

.itemLine:hover {
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent black for glass effect */
  backdrop-filter: blur(5px); /* Blur effect for glass look */
  -webkit-backdrop-filter: blur(5px); /* For Safari */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Subtle white border for depth */
  color: white ; /* White text color for contrast */
  cursor: pointer; /* Indicates it's clickable */
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1); /* Soft glow for realism */ /* Changes the cursor to indicate it's clickable */
}
.itemLine > span {
  margin : auto;
}
.lineName {
  font-size: 16px;
  font-weight: bold; /* Makes the text bold for better readability */
  transition: color 0.3s ease; /* Smooth transition for text color change */
}


  </style>