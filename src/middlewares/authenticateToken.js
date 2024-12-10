import jwt from "jsonwebtoken";
import config from "../libs/config.js";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Obtener el encabezado Authorization
    const token = authHeader && authHeader.split(' ')[1]; // Extraer el token
  
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. Token requerido.' });
    }
  
    jwt.verify(token, config.SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido.' });
      }
  
      req.user = user; // Adjuntar los datos del usuario al objeto request
      next();
    });
  };

export default authenticateToken;