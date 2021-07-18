import axios from 'axios';

axios.defaults.baseURL = 'https://trello.backend.tests.nekidaem.ru/api/v1/';
axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token');