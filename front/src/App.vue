<template>
  <nav>



    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>
<script>
import  AxiosInstance  from 'axios';
export default {
  name: 'app',
  methods: {
    // ...
  },data(){
    return {
      caca : 'caca'
    }
  },
  created(){
    AxiosInstance.get('/').then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
    // ...
  }
} 
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
