import 'dotenv/config'; // Carga las variables del .env
import app from './src/app.js';
import { connectDB } from './src/config/db.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // 1. Conectar a MongoDB en Docker
  await connectDB();

  // 2. Levantar el servidor de Express
  app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();