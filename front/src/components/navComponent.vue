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

          <img alt="logo" style="height:50px; margin : 5px" src="/assets/pioneerWhite.png">
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
nav-container {
  z-index: 1000;
  position: relative;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  color: white;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #FFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.info-div {
  background: linear-gradient(rgba(99, 99, 99, 1), rgba(200, 200, 200, 0.6)),
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255, 255, 255, 0.2) 10px,
                rgba(255, 255, 255, 0.2) 20px
              );
  background-size: cover; /* Ensure the div is fully covered */
  backdrop-filter: blur(5px);
  color: white;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.info-toggle {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 10px;
  cursor: pointer;
  color: white;
}

.info-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
}
.title {
  font-family: 'Lobster', cursive;
  text-decoration: none;
  font-size: 50px;
  color: #ffffff !important;
  text-decoration: none;
}
  </style>