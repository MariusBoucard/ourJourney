import axios from 'axios';

const Axiosinstance = axios.create({
  baseURL: 'http://localhost:3000/',
});

export const API_BASE_URL = 'http://localhost:3000/files';

export default Axiosinstance;