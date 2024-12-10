
import express from 'express';
import db from './models/index.js';
import routes from './routes/index.js';

const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Rutas
app.use('/api', routes);

// Conectar a la base de datos
db.sync({ force: false });


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});