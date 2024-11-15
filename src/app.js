import express from 'express';
import trabajadorRoutes from './routes/trabajador.routes.js';  // Importa las rutas de trabajador
import clienteRoutes from './routes/cliente.routes.js';  // Importa las rutas de cliente
import consumoRoutes from './routes/consumo.routes.js';  // Importa las rutas de consumo
import medidorRoutes from './routes/medidor.routes.js';  // Importa las rutas de medidor
import rutaRoutes from './routes/ruta.routes.js';  // Importa las rutas de ruta

const app = express();

// Middlewares
app.use(express.json());  // Para manejar el cuerpo de las solicitudes en formato JSON
app.use(express.urlencoded({ extended: true }));  // Para manejar los formularios con datos codificados

// Rutas
app.use('/api', trabajadorRoutes);  // Rutas para trabajadores bajo /api
app.use('/api', clienteRoutes);  // Rutas para clientes bajo /api
app.use('/api', consumoRoutes);  // Rutas para consumo bajo /api
app.use('/api', medidorRoutes);  // Rutas para medidores bajo /api
app.use('/api', rutaRoutes);  // Rutas para rutas bajo /api

// Manejo de errores o rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;
