// import axios from 'axios';

// const API = 'http://localhost:5000/api/auth';

// export const registerRequest = (user) => axios.post(`${API}/register`, user);

// export const loginRequest = (user) => axios.post(`${API}/login`, user);

// //axios.post

import axios from './axios';

export const registerRequest =  (user) => axios.post(`auth/register`, user);

export const loginRequest =  (user) => axios.post(`auth/login`, user);

export const verifyTokenRequest = () => axios.get(`auth/verify`);

// export const logoutRequest = () => axios.post(`auth/logout`);