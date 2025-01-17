import axios from 'axios';

const url = 'https://dummyjson.com';

export const api = axios.create({
  baseURL: url,
});
