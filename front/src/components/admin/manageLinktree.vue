<template>
<div>
    <div class="leftColumn"> 
        <router-link class="router-link" to="/admin">Main Admin</router-link>
        <router-link class="router-link" to="/admin/addSong">Add song</router-link>
    </div>
    <div class="rightColumn">

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
<style scoped>

/* General layout styling */
.leftColumn, .rightColumn {
    padding: 20px;
}

.leftColumn {
    float: left;
    width: 20%;
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
}

.rightColumn {
    float: right;
    width: 75%;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-right: 20px;
}

/* Clear floats */
div::after {
    content: "";
    display: table;
    clear: both;
}

/* Styling for the list and buttons */
ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 10px 0;
    background-color: #e9e9e9;
    padding: 10px;
    border-radius: 5px;
}

label {
    margin-right: 15px;
}

button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}

button:hover {
    background-color: #ff3333;
}

/* Input and Add button styling */
input[type="text"] {
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: calc(100% - 22px); /* Adjust width to fit parent */
}

button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
}

/* Router link styling */
.router-link {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #333;
}

.router-link:hover {
    background-color: #ddd;
}
</style>