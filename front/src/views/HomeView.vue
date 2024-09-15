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

              <option default value="dateDesc">Date de publication (plus récentes)</option>
              <option value="dateAsc">Date de publication (plus anciennes)</option>
              <option value="alphabetical">Ordre alphabétique</option>
              <option value="unalphabetical">Ordre anti-alphabétique</option>
            </select>
          </div>
          <div style="display: flex;">
            <div class="nameDiv" :class="{ 'glass-effect': isSelected('Belle demoiselle') }"
              @click="selectedName === 'Belle demoiselle' ? selectedName = '' : selectedName = 'Belle demoiselle'">
              Belle demoiselle
            </div>
            <div class="nameDiv" :class="{ 'glass-effect': isSelected('Ballzzy') }"
              @click="selectedName === 'Ballzzy' ? selectedName = '' : selectedName = 'Ballzzy'">
              Ballzzy
            </div>
            <div class="nameDiv" :class="{ 'glass-effect': isSelected('Marius') }"
              @click="selectedName === 'Marius' ? selectedName = '' : selectedName = 'Marius'">
              Marius
            </div>
          </div>
          <div style="width:20%">
            <select v-model="selectedArtist">
              <option value="">Tous les artistes</option>
              <option v-for="artist in existingArtists" :key="artist" :value="artist">{{ artist }}</option>
            </select>
          </div>
        </div>
        <hr style="width :70%;margin:auto;" />
        <div class="image-container">
          <img src="assets/banderole2.JPG" />
          <button @click="goToLastSong()" class="button-overlay">Dernière chanson publiée</button>
        </div>
        <div class="cardsComponent" ref="cardsComponent">
          <div class="cardsRow" ref="cardsRow" v-on:mouseover="handleRowHover(index)" v-for="(row, index) in rows" :key="index"  :style="{ zIndex: zIndexes[index], position: 'relative' , marginTop: index === lastHovered+1? MarginTop + 'px' :( index >0 && index === lastHovered) ? currentMarginTopComputed :'0'}">
  
      <template v-for="card in row" :key="card.title" >
        <div class="cardDiv"  >

        <CarteComponent :carteValue="card"/>
        </div>
      </template>
   
  </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CarteComponent from '@/components/carteComponent.vue';
import sidebarComponent from '@/components/sidebarComponent.vue';
import AxiosInstance from '../../axios';
import { mapState } from 'vuex';
export default {
  name: 'HomeView',
  components: {
    sidebarComponent,
    CarteComponent
  },
  methods: {
    isSelected(name) {
      return this.selectedName === name;
    },
    handleScroll() {
      this.scrollY = window.scrollY;
    },

    goToLastSong() {
      this.allSongs = this.allSongs.sort((a, b) => new Date(b.date) - new Date(a.date));
      this.$router.push(`/song/${this.allSongs[0].songbacktitle}`)
    },
    handleRowHover(index) {
  // Remove the index from hoverOrder if it's already there
  this.hoverOrder = this.hoverOrder.filter(i => i !== index);
  this.currentMarginTop = this.$refs.cardsRow[index].style.marginTop;

    // Add the index to the start of hoverOrder
    this.hoverOrder.unshift(index);
    },
    handleCardHover(event) {
    event.target.style.zIndex = "1000"; // or any high value
  },
  handleCardUnhover(event) {
    event.target.style.zIndex = ""; // reset to the initial value
  },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    currentMarginTopComputed(){
      return this.currentMarginTop
    },
    lastHovered(){
      return this.hoverOrder[0]
    },
    MarginTop() {

     // const cardsComponentHeight = 10000;
      var rowHeight = 1000; 
            if(this.$refs.cardsRow){
        var test = this.$refs.cardsRow[0].clientHeight;
        rowHeight = test;
      }


      var a = (this.scrollY+(rowHeight)) % rowHeight // (cardsComponentHeight / this.rows.length)
      if(a > rowHeight/2){
        a = rowHeight - a
      }
      var normalized = Math.floor(a)
      var go = -0.3 * rowHeight + Math.sin(normalized / rowHeight * Math.PI) * 0.35 * rowHeight
      console.log(go)
      return go;
    },
    rows() {
    let rows = [];
    for (let i = 0; i < this.songsToDisplay.length; i += 3) {
      rows.push(this.songsToDisplay.slice(i, i + 3));
    }
    return rows;
  },
    existingArtists() {
      if (this.allSongs.length > 0) {
        return this.allSongs.map(song => song.artistes).filter((value, index, self) => self.indexOf(value) === index)
      } else {
        return []
      }
    },
    zIndexes() {
    let zIndexes = [];
    for (let i = 0; i < this.rows.length; i++) {
      zIndexes.push(this.rows.length - i);
    }
    for (let i = 0; i < this.hoverOrder.length; i++) {
      zIndexes[this.hoverOrder[i]] = this.hoverOrder.length - i+500;
    }
    return zIndexes;
  },
    ...mapState({
      // This creates a computed property named `songLink` that is linked to the state in the Vuex store
      search: state => state.currentSearch
    }),
    songsToDisplay() {

      if (this.selectedName !== '') {
        return this.allSongs.filter(song => song.artistes.toLowerCase().includes(this.selectedName.toLowerCase()))
      }
      if (this.selectedArtist !== '') {

        return this.allSongs.filter(song => song.artistes.toLowerCase().includes(this.selectedArtist.toLowerCase()))
      }
      const searchTerm = this.search.toLowerCase();
      const matchedSongs = new Map();

      // Helper function to search and add matches if not already added
      const searchAndAdd = (songs, field) => {
        if (songs.length > 0) {

          songs.forEach(song => {
            if (!song[field]) return;
            const fieldValue = song[field].toLowerCase();
            if (fieldValue.includes(searchTerm) && !matchedSongs.has(song.songbacktitle)) {
              matchedSongs.set(song.songbacktitle, song);
            }
          });
        }
      };

      // Search in 'title', then 'band', then 'artistes', then 'lyrics'
      searchAndAdd(this.allSongs, 'titre');
      searchAndAdd(this.allSongs, 'band');
      searchAndAdd(this.allSongs, 'artistes');
      searchAndAdd(this.allSongs, 'lyrics');
      // Convert the Map values to an array
      let array = Array.from(matchedSongs.values());
      switch (this.sortType) {
        case 'dateDesc':
          return array.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'dateAsc':
          return array.sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'alphabetical':
          return array.sort((a, b) => a.titre.localeCompare(b.titre));
        case 'unalphabetical':
          return array.sort((a, b) => b.titre.localeCompare(a.titre));
        default:
          return array;
        // Sort the array based on the selected sort type
      }

    }
  },
  data() {
    return {
      currentMarginTop: null,
      hoverOrder: [],  
      selectedName: '',
      scrollY: 0, // new data property

      selectedArtist: '',
      sortType: 'dateDesc',
      allSongs: [{ title: 'caca', genre: 'caca', artist: 'caca', type: 'caac', album: 'caca', picture: 'prout' }, { title: 'caca', genre: 'caca', artist: 'caca', type: 'caac', album: 'caca', picture: 'prout' }, { title: 'caca', genre: 'caca', artist: 'caca', type: 'caac', album: 'caca', picture: 'prout' }, { title: 'caca', genre: 'caca', artist: 'caca', type: 'caac', album: 'caca', picture: 'prout' }, { title: 'caca', genre: 'caca', artist: 'caca', type: 'caac', album: 'caca', picture: 'prout' }, { title: 'caca', genre: 'caca', artist: 'caca', type: 'caac', album: 'caca', picture: 'prout' }]
    }
  },
  created() {
    AxiosInstance.get('allPublicSongs').then((res) => {
      console.log(res)
      this.allSongs = res.data
      if (this.allSongs.length > 0) {
        this.allSongs = this.allSongs.sort((a, b) => new Date(b.date) - new Date(a.date));

      }
    }).catch((err) => {
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

.nameDiv {
  cursor: pointer;
  /* Your existing styles for .nameDiv */
}
.cardDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 32%;
  height: 100%;
  transition: transform 0.3s ease;
  /* Smooth transition on hover */
}

.cardDiv:hover {
  z-index: 1000;
  /* Slightly enlarge on hover */
}
.cardsRow {
  display: flex;

  justify-content: space-between;
  /* Adjust the gap between cards */
  /* Center the cards */
}

.glass-effect {
  background: rgba(0, 0, 0, 0.5);
  /* Darker background for glass effect */
  backdrop-filter: blur(8px);
  /* Increase blur for stronger effect */
  border: 1px solid rgba(255, 255, 255, 0.25);
  /* Adjust border color if needed */
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  /* Add shadow */

}

.nameDiv:hover {
  transform: scale(1.05);
  /* Slightly enlarge on hover */
  background: rgba(0, 0, 0, 0.7);
  /* Optional: Darker background on hover */
}

/* If you want the hover effect to only apply to selected items, you can combine selectors */
.nameDiv.glass-effect:hover {
  transform: scale(1.05);
  /* Slightly enlarge on hover */
  background: rgba(0, 0, 0, 0.7);
  /* Darker background on hover */
}

.cardsComponent {
  display: block;
  position: relative;

  width: 70%;
  margin: auto;
 /* grid-template-columns: repeat(3, 1fr);
  /* Creates three columns of equal width */
  gap: 20px;
  /* Maintains the gap between cards */
  padding-top: 30px;
  justify-items: center;
}

.layout {
  display: flex;
}

.sidebar {
  position: fixed;
  z-index: 1;
  bottom: 0px;
 /* flex: 0 0 auto;
  height: 100vh;
  overflow-y: auto;
  margin: 0;
  box-shadow:
    1px 1px 2px #e5e5e5,
    2px 2px 4px #cacaca,
    3px 3px 6px #a7a7a7,
    4px 4px 8px #858585; */
}

.main-content {
  background: rgb(201, 201, 201);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
}

.image-container {
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.7);

  width: 70%;
  position: relative;
  /* Allows absolute positioning of children */
  margin: auto;
  /* Center the container */
  margin-top: 20px;
  /* Adjust top margin as needed */
  border-radius: 20px;
}

.image-container img {
  width: 100%;
  /* Make the image fit the width of the container */
  height: 100%;
  /* Adjust height automatically to maintain aspect ratio */
  object-fit :fill;
  /* Adjust this as needed to 'contain' or 'cover' */
  border-radius: 20px;
}

.button-overlay {
  position: absolute;
  top: 80%;
  /* Center vertically */
  left: 50%;
  /* Center horizontally */
  transform: translate(-50%, 20%);
  /* Adjust horizontal centering and move slightly towards the bottom */
  background-color: transparent;
  /* Or any color */
  color: white;
  /* Text color */
  font-weight: 500;
  font-size: larger;
  border: none;
  /* Remove border */
  cursor: pointer;
  /* Change cursor to pointer on hover */
  padding: 10px 20px;
  /* Adjust padding */
  text-align: center;
  /* Center text */
  border-radius: 10px;
  /* Adjust border radius */
}

.button-overlay:hover {
  background-color: rgba(255, 255, 255, 0.5);
  /* Add a semi-transparent background on hover */
  color: black;
  /* Change text color on hover */
}

.sort-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: auto;
  padding: 10px;
}

.nameDiv {
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
}

.nameDiv:hover {
  /* background-color: var(--deep-grey);
  color: var(--light-color); */
  transition: transform 0.3s ease;
  color: white;
}

select {
  background-color: rgba(139, 127, 127, 0.438);
  /* Semi-transparent background for glass effect */
  color: white;
  /* White text color for contrast */
  padding: 10px;
  /* Padding for a larger click area and visual appeal */
  border-radius: 8px;
  /* Rounded corners for a modern look */
  border: 2px solid rgba(255, 255, 255, 0.3);
  /* Adjusted border for glass effect */
  outline: none;
  /* Remove the default focus outline */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3),
    /* Enhanced shadow for depth */
    inset 0 4px 4px rgba(255, 255, 255, 0.2);
  /* Inner glow for a more pronounced glass effect */
  font-weight: bold;
  /* Bold text for readability */
  cursor: pointer;
  /* Change cursor to pointer to indicate it's clickable */
  transition: all 0.3s ease;
  /* Smooth transition for interactions */
  backdrop-filter: blur(10px);
  /* Blur effect for glassmorphism */
  -webkit-backdrop-filter: blur(10px);
  /* For Safari */
}

select:hover {
  background-color: #505050;
  /* Slightly lighter grey on hover for feedback */
}

select:focus {
  box-shadow: 0 0 0 2px #007BFF;
  /* Blue glow effect when focused */
}

/* Style options */
select option {
  background-color: #333;
  /* Dark background for options */
  color: #fff;
  /* White text for options */
}

/* Mobile styles */
@media (max-width: 768px) {
  .main-content {
    padding: 10px;
    margin-left: 40px;
    /* Add padding on smaller screens */
  }

  .cardsComponent {
    display: flex;
    flex-direction: column;
    /* Stack cards in a single column */
  }

  .sort-line>div,
  .image-container {
    width: 90%;
    margin : auto;
    /* Ensure elements within .main-content take full width */
    box-sizing: border-box;
    /* Include padding and border in the element's total width */
  }

  .sort-line {
    flex-direction: column;
    /* Stack sorting options vertically */
    align-items: center;
    /* Center-align the sorting options */
    display: none;
  }

  .sort-line select,
  .nameDiv {
    margin-bottom: 10px;
    /* Add some space between the sorting options */
  }
  .layout {
  display: flex;
}


.button-overlay{
  display: none;
}
.main-content {
  margin-left: 60px; /* Same as the sidebar width to prevent overlap */
  flex-grow: 1; /* Take up remaining space */
}
.cardsComponent{
  width: 90%;
}
}
</style>