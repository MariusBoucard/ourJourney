<template>
  <div class="home">


 <div class="layout">
      <div class="sidebar">
        
        <sidebarComponent />
      </div>
      <div class="main-content">
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
  display: flex;
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  background-color: #333333;
}
.layout {
  display: flex;
}

.sidebar {
  width: auto;
  /* Additional styling for the sidebar */
}

.main-content {
  width: auto;
  /* Additional styling for the main content area */
}
</style>