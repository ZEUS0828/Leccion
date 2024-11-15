import { Router } from 'express';
import { getMedidores, getMedidorPorId, postMedidor, putMedidor, deleteMedidor } from '../controladores/medidorCtrl.js';

const router = Router();

// Rutas para los medidores
router.get('/medidores', getMedidores);  // Obtener todos los medidores
router.get('/medidores/:id', getMedidorPorId);  // Obtener un medidor por ID
router.post('/medidores', postMedidor);  // Crear un nuevo medidor
router.put('/medidores/:id', putMedidor);  // Actualizar un medidor
router.delete('/medidores/:id', deleteMedidor);  // Eliminar un medidor

export default router;
