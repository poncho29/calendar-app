import axios from 'axios';
import { getEnvVaribles } from '../helpers';

const { VITE_API_URL } = getEnvVaribles();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

// Configurar interceptores

export default calendarApi;
