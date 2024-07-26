<template>
    <div>
      <nav class="topbar">
        <div class="logo-and-title">
          <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
          <span>ourJourney</span>
        </div>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/song">About</router-link>
          <button @click="toggleInfoDiv">Last Release</button>
        </div>
        <button class="info-toggle" @click="toggleInfoDiv">☰</button>
      </nav>
      <div v-if="showInfo" class="info-div">
        <!-- Extra information goes here -->
        Extra information content...
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showInfo: false,
      };
    },
    methods: {
      toggleInfoDiv() {
        this.showInfo = !this.showInfo;
      },
    },
  };
  </script>
  
  <style>
  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    color: white;
    padding: 10px;
  }
  
  .logo-and-title {
    display: flex;
    align-items: center;
  }
  
  .logo-and-title img {
    margin-right: 10px;
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .info-toggle {
    cursor: pointer;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
  }
  
  .info-div {
    position: relative;
    top: 0;
    right: 0;
    width: 300px;
    height: 100px;
    background-color: #f4f4f4;
    box-shadow: -2px 0 5px rgba(0,0,0,0.5);
    padding: 20px;
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  
  .info-div.active {
    transform: translateX(0);
  }
  </style>