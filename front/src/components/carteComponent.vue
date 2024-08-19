<template>
    <div class="card">
      <div class="card-content" @click.stop="navigateToSong(carte.songbacktitle)">
        <img :src=getPathCover(carte.pathcover) alt="Picture" class="card-img">
        <h2>{{ carte.titre }}</h2>
        <p>{{ carte.description }}</p>
        <p>Artistes : {{ carte.artistes }}</p>
        <div class="allDiv">
          <p>{{ carte.support }}</p>
          <p>{{ formatDate(carte.date) }}</p>
          <p>{{ carte.genre }}</p>
          </div>
          </div>
          <div class="card-actions">
            
            <div style="height:60px; display: flex; justify-content: space-between; width:70%; margin: auto; margin-bottom: 20px;margin-top:20px;" >
          <button class="buttonLink" @click.stop="addToPlaylist()" title="Ajouter à la playlist">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
              <path d="M 25 2 C 12.264481 2 2 12.264481 2 25 C 2 37.735519 12.264481 48 25 48 C 37.735519 48 48 37.735519 48 25 C 48 12.264481 37.735519 2 25 2 z M 25 4 C 36.664481 4 46 13.335519 46 25 C 46 36.664481 36.664481 46 25 46 C 13.335519 46 4 36.664481 4 25 C 4 13.335519 13.335519 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
              </svg>
              </button>
                <router-link :to="`/song/linktree/${carte.songbacktitle}`" class="buttonLink" width="100px" title="Autres plateformes">
        <img src="/assets/headphone.png" alt="spotify" style="height:30px"> 
      
      
      </router-link>          
              <button class="buttonLink" @click.stop="playSong()" title="Jouer la chanson">
              <svg fill="#000000" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 	 viewBox="0 0 512 512" xml:space="preserve">
              <g>
                <g>
                  <path d="M256,0C114.608,0,0,114.608,0,256s114.608,256,256,256s256-114.608,256-256S397.392,0,256,0z M256,496
                    C123.664,496,16,388.336,16,256S123.664,16,256,16s240,107.664,240,240S388.336,496,256,496z"/>
                </g>
              </g>
              <g>
                <g>
                  <path d="M176.416,129.792v252.416L395.024,256L176.416,129.792z M192.416,157.504L363.024,256l-170.608,98.496V157.504z"/>
                </g>
              </g>
              </svg>
             </button>
    <button class="buttonLink">
      
          <router-link :to="getPageLink()" class="buttonLink" title="Page chanson">
            <img src="/assets/fleche.png" alt="spotify" style="height:30px"> 
          
          </router-link>   
        </button>
        </div>

          </div> 
    </div>
  </template>
  
  <script>
import { API_BASE_URL } from '/axios';

export default {
    props: ['carteValue'],
    data() {
      return {
        carte: this.carteValue,
        baseURL : API_BASE_URL
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
      getPageLink(){
        if(this.carte.support === "Single"){
          return `/song/${this.carte.songbacktitle}`
        } else {
          return `/album/${this.carte.songbacktitle}`
        }
      },
      navigateToSong(songbacktitle) {
      this.$router.push(`/song/${songbacktitle}`);
    },
      playSong() {
        this.$store.commit('setCurrentSongLink', this.baseURL +"/song/"+ this.carte.songbacktitle + ".wav");
        this.$store.commit('setCurrentSong', this.carte);
      },
     getPathCover(path){
        if(path === undefined){
          return ''
        }
        let splits = path.split('/')
        if(splits.length > 1){
            console.log(this.baseURL + splits[splits.length - 1])
          return this.baseURL+"/cover/" + splits[splits.length - 1]
        }
        return ''
      },
      formatDate(dateString){
        const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0'); // Ensures two digits
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed, add 1
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
      },
      addToPlaylist() {
        // const currentPlaylist = this.$store.state.playlist;
        // currentPlaylist.push(this.carte);
        this.$store.commit('addSongToPlaylist', this.carte);
        const currentPlaylist = this.$store.state.playlist;
        console.log(currentPlaylist);
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
.buttonLink {
  padding: 10px 20px; /* Existing padding inside the buttons */
  border: none; /* Existing border removal */
  border-radius: 5px; /* Existing rounded corners for buttons */
  cursor: pointer; /* Existing pointer cursor on hover */
  background-color: #fff; /* Existing white background for buttons */
  color: #6a11cb; /* Existing text color for buttons */
  transition: background-color 0.3s, color 0.3s; /* Existing smooth transition for hover effect */
  display: inline-flex; /* Use flexbox for centering content */
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  width: 60px; /* Set a specific width */
  height: 60px; /* Set a specific height */
  padding: 0; /* Override padding to fit the design */
  vertical-align: top; /* Adjusts the vertical alignment */
  margin: 0; /* Ensures no margin is applied */
  padding: 0; /* Ensures no padding is applied */
}

.buttonLink svg {
  width: 30px; /* Control width of SVGs and images */
  height: 30px; /* Control height of SVGs and images */
}

.buttonLink img {
  width: 30px; /* Control width of SVGs and images */
  height: 30px; /* Control height of SVGs and images */
  padding-top: 10px;
  padding-bottom: 10px;
}

/* Optional: Adjust hover effect to include color changes for SVGs and images */
.buttonLink:hover {
  background-color: #e0e0e0; /* Slightly darker shade on hover */
  color: #4a148c; /* Change text (and SVG) color on hover */
}
.home {
  background-color: #064420;
  color: #ffffff;
}
.playButton {
  background-color: #007bff; /* Example button color */
  color: white;
  padding: 10px 10px;
  margin : 10px;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;

}

svg{
  width: 50px;
  height: 50px;
}

/* Glassmorphism style for the card */
.card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.40);
  cursor: pointer;
}

.card-img{
  border-radius: 10px 10px 0 0 ;
    width:100%;
}
.allDiv{
    display: flex;
    justify-content: space-between;
}
.allDiv > p {
  padding : 10px;
}

/* .card-actions button {
  background-color: #064420;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-radius: 5px;
}
.button-like-link {
  display: inline-block;
  background-color: #007bff; 
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.card-actions button:hover {
  background-color: #ffffff;
  color: #064420;
}

.card-actions button:active {
  transform: scale(0.95);
}

.card-actions button {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.card-actions button:hover {
  transform: translateY(-3px) rotate(-2deg);
} */
.playButton {
  padding: 10px 20px; /* Adjust padding to your preference */
  border: 2px solid rgba(255, 255, 255, 0.2); /* Light border for the glass effect */
  outline: none; /* Remove default focus outline */
  font-size: 16px; /* Adjust font size to your preference */
  font-weight: bold; /* Make the text bold */
  color: white; /* Text color */
  background: linear-gradient(135deg, rgba(67, 233, 123, 0.6), rgba(56, 249, 215, 0.6)); /* New gradient background */
  backdrop-filter: blur(10px); /* Blur effect for the glassmorphism */
  border-radius: 10px; /* Rounded corners */
  cursor: pointer; /* Change mouse cursor on hover */
  transition: all 0.3s ease; /* Smooth transition for hover effects */
}

.playButton:hover {
  background: linear-gradient(135deg, rgba(67, 233, 123, 0.8), rgba(56, 249, 215, 0.8)); /* Darker gradient on hover */
  transform: scale(1.05); /* Slightly increase size on hover */
}
  </style>