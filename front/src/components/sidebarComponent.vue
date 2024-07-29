<template>
    <div class="sidebar" @mouseover="menuOpen = true" @mouseleave="menuOpen = false">
      <div style="margin-top :150px" class="itemLine">
        <!-- Recherche -->
        <img src="assets/loupe.png" alt="search" class="roundedPic">
        <div v-if="this.menuOpen" class="lineName">
          <input v-model="searchSong" class="beautifulInput"/>
        </div>
      </div>
      <div class="titleFix">

        <div v-if="this.menuOpen" class="sidebar-title">Title</div>
      </div>
 
     
      
      <div class="menu-items">
        <!-- Artists linktree -->
        <a href="#">
          <div class="itemLine">
            <img src="logos/spotify.png" alt="search" class="roundedPic">
            <span v-if="this.menuOpen" class="lineName">Ballzy</span>
        </div>
        </a>
        <a href="#">
          <div class="itemLine">
            <img src="logos/deezer.png" alt="search" class="roundedPic">
            <span v-if="this.menuOpen" class="lineName">Ballzy</span>
        </div>
        </a>    
        
        <a href="#">
          <div class="itemLine">
            <img src="assets/bf.jpg" alt="search" class="roundedPic">
            <span v-if="this.menuOpen" class="lineName">Ballzy</span>
        </div>
        </a> 

        <a href="#">
          <div class="itemLine">
            <!-- brutal webSite -->
        <img src="assets/insta.png" alt="search" class="roundedPic">
        <span v-if="this.menuOpen" class="lineName">instagram</span>
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
    background-color: #747474;
    padding: 20px;
    height: 100vh;
    z-index: 0;
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

  }
  
  .bar {
    width: 30px;
    height: 3px;
    background-color: #333;
  }
  
  .menu-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
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
  .roundedPic{
    width : 50px;
    border-radius: 50%;
  }

.itemLine {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center; /* This will vertically center the items in the container */
  gap: 10px; /* Adds some space between the image and the text */
}

.lineName {
  /* Additional styling for the text */
  font-size: 16px; /* Example font size, adjust as needed */
  color: #333; /* Example text color, adjust as needed */
}
  </style>