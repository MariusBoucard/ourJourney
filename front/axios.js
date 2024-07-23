import axios from 'axios';
import Vue from 'vue';

const Axiosinstance = axios.create({
  baseURL: 'http://localhost:3000/',
});


export default Axiosinstance;