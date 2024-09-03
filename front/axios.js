import axios from 'axios';

const Axiosinstance = axios.create({
  baseURL: 'http://ourjourney.fr/api/',
});

export const API_BASE_URL = 'http://ourjourney.fr/api/files';

export default Axiosinstance;