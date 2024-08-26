<template>
<div>
    <ul>
        <li v-for=" a in songsID" :key="a">
            <div>
                <label>{{a}}</label>
                <button @click="removeSong(a)">X</button>

            </div>
        </li>
    </ul>

    Ajouter une chanson dans le linktree :
    Il faut écrire le titre back
    <input v-model="input" type="text"/>
    <button @click="pushNewLinks">Ajouter</button>

</div>

</template>
<script>

import AxiosInstance from '/axios';
export default{
    name: 'manageLinktree',
    data(){
        return {
            songsID: [],
            input : ""
            }
        }
    ,
    methods: {
       fetchData(){
        AxiosInstance.get('/linktreeSongs')
        .then(response => {
            console.log(response.data)
            this.songsID = response.data
        })
        .catch(error => {
            console.log(error)
        });
    }, 
    pushNewLinks(){
        this.songsID.push(this.input)
        console.log(this.songsID)
        AxiosInstance.post('/linktreeSong', {songsID : this.songsID})
        .then(response => {
            console.log(response.data)
            this.fetchData()
        })
        .catch(error => {
            console.log(error)
        });
    },
    removeSong(songId) {
      // Remove the song from the array
      this.songsID = this.songsID.filter(id => id !== songId);
      AxiosInstance.post('/linktreeSong', {songsID : this.songsID})
        .then(response => {
            console.log(response.data)
            this.fetchData()
        })
        .catch(error => {
            console.log(error)
        });
    }
},
mounted(){
    this.fetchData()
}
    }



</script>
