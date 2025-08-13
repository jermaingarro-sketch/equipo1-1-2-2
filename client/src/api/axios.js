//configuracion de axios para que envíe las
//  cookies al servidor con cada petición

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true, //para que axios envie las cookies al servidor
});

export default instance;