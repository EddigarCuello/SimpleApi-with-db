import express from 'express';
import userRoutes from './routes/user.routes.js';
import { errorHandler,notFoundHandler } from './middlewares/errorHandler.js';

const app = express();

//Middlewares globales
app.use(express.json());

//Rutas de la API
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API REST E-commerce Cursos activa' });
});

//Manejador de rutas no encontradas (404)
app.use(notFoundHandler);

//Manejador global de errores (Debe ser la ÚLTIMA línea de app.use)
app.use(errorHandler);

export default app;