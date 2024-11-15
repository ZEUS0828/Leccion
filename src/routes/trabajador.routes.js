import { Router } from 'express';
import { 
    getTrabajadores, 
    getTrabajadorPorId, 
    postTrabajador, 
    putTrabajador, 
    patchTrabajador, 
    deleteTrabajador 
} from '../controladores/trabajadorCtrl.js'; // Importa las funciones del controlador

const router = Router(); 

// Rutas para obtener los trabajadores
router.get('/trabajadores', getTrabajadores);  // Obtener todos los trabajadores
router.get('/trabajadores/:id', getTrabajadorPorId);  // Obtener un trabajador por ID

// Rutas para crear y actualizar trabajadores
router.post('/trabajadores', postTrabajador);  // Crear un nuevo trabajador
router.put('/trabajadores/:id', putTrabajador);  // Actualizar un trabajador por ID
router.patch('/trabajadores/:id', patchTrabajador);  // Actualizar parcialmente un trabajador por ID

// Ruta para eliminar un trabajador
router.delete('/trabajadores/:id', deleteTrabajador);  // Eliminar un trabajador por ID

export default router;  // Exporta el router para que pueda ser utilizado en la configuración del servidor
