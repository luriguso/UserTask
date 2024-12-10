import { Sequelize } from 'sequelize';

// Credenciales de conexión
const db = new Sequelize('proyectofinal', 'root', '', {
    host: 'localhost',  // Cambiar según la configuración de tu servidor
    dialect: 'mysql',   // Cambiar a 'postgres', 'sqlite', etc., si usas otro sistema
});

export default db;