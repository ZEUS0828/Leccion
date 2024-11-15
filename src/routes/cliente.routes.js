import { Router } from 'express';
import { 
    getClientes, 
    getClientePorId, 
    postCliente, 
    putCliente, 
    patchCliente, 
    deleteCliente 
} from '../controladores/clienteCtrl.js';

const router = Router();

// Rutas para el manejo de clientes
router.get('/clientes', getClientes);  // Obtener todos los clientes
router.get('/clientes/:id', getClientePorId);  // Obtener cliente por ID
router.post('/clientes', postCliente);  // Crear un nuevo cliente
router.put('/clientes/:id', putCliente);  // Actualizar un cliente por ID
router.patch('/clientes/:id', patchCliente);  // Actualizar parcialmente un cliente por ID
router.delete('/clientes/:id', deleteCliente);  // Eliminar un cliente por ID

// Exportar las rutas
export default router;
