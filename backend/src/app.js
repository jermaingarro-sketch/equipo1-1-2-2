import express from 'express';
import morgan from 'morgan'; //importamos morgan para ver las peticiones que llegan al servidor
import authRoutes from './routes/auth.routes.js'; //importamos las rutas de autenticacion
//para que el servidor las entienda
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/tasks.routes.js';
import cors from 'cors'; //importamos cors para que el servidor entienda las peticiones del frontend
const app = express();
app.use(cors( //middleware para que el servidor entienda las peticiones del frontend
    {
        origin: 'http://localhost:5173', //origen de la peticion
        
        credentials: true //necesario para que el servidor acepte las cookies
    }));
app.use(morgan('dev')); //middleware para ver las peticiones que llegan al servidor
app.use(express.json()); //middleware para que el servidor entienda json
app.use(cookieParser()); //middleware para que el servidor entienda las cookies
app.use("/api/auth", authRoutes); //middleware para que el servidor entienda las rutas de autenticacion
//simplemente cambiamos el prefijo de la ruta de la autenticacion a /api/auth para que no se confunda
// con las rutas del frontend
app.use("/api/", taskRoutes); //middleware para que el servidor entienda las rutas de las tareas
export default app;