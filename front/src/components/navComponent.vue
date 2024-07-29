<template>
    <div style="z-index: 1000;">
      <div v-if="showInfo" class="info-div">
       <h1>
         A propos
       </h1>

Avec les copains, on écrit des chansons depuis une dizaine d'années, et j'ai peur d'en perdre, car aux fur et à mesure où elles s'amoncellent, elles se perdent dans les entrailles de nos mémoires et de nos disques durs, ce passé écrit s'efface. L'idée est donc de tout centraliser ici. En un site, centralisant toutes les plateformes et toutes les collaborations. La quasi intégralité de ces projets est le fruit du travail de plusieurs personnes, vous retrouverez donc l'ensemble des artistes présents dans les pages correspondantent aux chansons/albums. En espérant que cela vous plaise et en vous souhaitant une bonne écoute ! Marius Boucard Bocciarelli

      </div>
      <nav class="topbar">
      
        <div class="logo-and-title">

          <img alt="logo" style="height:50px; margin : auto" src="/assets/pioneerWhite.png">
        </div>
        <div class="nav-links">
          <!-- <router-link to="/">Home</router-link>
          <router-link to="/song">About</router-link>
          <button @click="toggleInfoDiv">Last Release</button> -->
          <router-link class="title" to="/">our Journey</router-link>

        </div>
        <button class="info-toggle" @click="toggleInfoDiv">☰</button>
      </nav>
      
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
  
  .title{
    color : white !important;
    font-size: 24px;
    font-weight: bold;

  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .info-toggle {
    cursor: pointer;
    background: none;
    border: 1px solid #fff;
    border-radius: 5px;
  
    color: white;
    font-size: 40px;
  }
  
  .info-div {
    position: relative;
   
    background-color: #9e9e9e;
    padding: 20px;
    transition: transform 0.3s ease;
  }
  
  .info-div.active {
    transform: translateX(0);
  }
  </style>