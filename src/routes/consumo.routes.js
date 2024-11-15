import { Router } from 'express';
import { getConsumos, getConsumoPorId, postConsumo, putConsumo, deleteConsumo } from '../controladores/consumoCtrl.js';

const router = Router();

// Rutas para los consumos
router.get('/consumos', getConsumos);  // Obtener todos los consumos
router.get('/consumos/:id', getConsumoPorId);  // Obtener un consumo por ID
router.post('/consumos', postConsumo);  // Crear un nuevo consumo
router.put('/consumos/:id', putConsumo);  // Actualizar un consumo
router.delete('/consumos/:id', deleteConsumo);  // Eliminar un consumo

export default router;
