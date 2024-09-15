import axios from 'axios';

const Axiosinstance = axios.create({
  baseURL: 'https://ourjourney.fr/api/',
});

export const API_BASE_URL = 'https://ourjourney.fr/api/files';

export default Axiosinstance;