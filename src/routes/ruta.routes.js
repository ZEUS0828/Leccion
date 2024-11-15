import { Router } from 'express';
import { getRutasAsignadas, getRutaAsignadaPorId, postRutaAsignada, putRutaAsignada, deleteRutaAsignada } from '../controladores/rutaCtrl.js';

const router = Router();

// Rutas para la gestión de rutas asignadas
router.get('/rutas', getRutasAsignadas);  // Obtener todas las rutas asignadas
router.get('/rutas/:id', getRutaAsignadaPorId);  // Obtener una ruta asignada por ID
router.post('/rutas', postRutaAsignada);  // Crear una nueva ruta asignada
router.put('/rutas/:id', putRutaAsignada);  // Actualizar una ruta asignada
router.delete('/rutas/:id', deleteRutaAsignada);  // Eliminar una ruta asignada

export default router;
