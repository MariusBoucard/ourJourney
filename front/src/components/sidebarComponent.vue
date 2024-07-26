<template>
    <div class="sidebar">
      <div class="titleFix">

        <div v-if="this.menuOpen" class="sidebar-title">Title</div>
      </div>
      <div class="itemLine">
        <!-- Recherche -->
        <img src="path/to/image.jpg" alt="search" class="roundedPic">
        <span v-if="this.menuOpen" class="lineName">Username</span>
      </div>
     
      
      <div class="menu-items">
        <!-- Artists linktree -->
        <a href="#">
          <div class="itemLine">
        <img src="path/to/image.jpg" alt="search" class="roundedPic">
        <span v-if="this.menuOpen" class="lineName">Username</span>
      </div>
        </a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>

        <a href="#">
          <div class="itemLine">
            <!-- brutal webSite -->
        <img src="path/to/image.jpg" alt="search" class="roundedPic">
        <span v-if="this.menuOpen" class="lineName">Username</span>
      </div>
        </a>*

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
  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; /* This will push the menu to the bottom */

    padding: 20px;
    height: 100%;
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
  }
  
  /* When menu is open, show username and adjust styles */
  .sidebar.menu-open .username {
    display: block;
  }
  
  .menu-open.hamburger-menu {
    transform: rotate(90deg);
  }
  </style>