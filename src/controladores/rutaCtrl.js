import { conmysql } from '../db.js';  // Importa la conexión a la base de datos

// Obtener todas las rutas asignadas
export const getRutasAsignadas = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_rutaasignada');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar las rutas asignadas" });
    }
};

// Obtener una ruta asignada por ID
export const getRutaAsignadaPorId = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_rutaasignada WHERE ruta_id = ?', [req.params.id]);
        if (result.length <= 0) {
            return res.status(404).json({
                message: "Ruta asignada no encontrada"
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Crear una nueva ruta asignada
export const postRutaAsignada = async (req, res) => {
    try {
        const { med_id, tra_cedula } = req.body;

        const [rows] = await conmysql.query(
            'INSERT INTO tb_rutaasignada (med_id, tra_cedula) VALUES (?, ?)',
            [med_id, tra_cedula]
        );

        res.status(201).json({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error al asignar ruta' });
    }
};

// Actualizar una ruta asignada
export const putRutaAsignada = async (req, res) => {
    try {
        const { id } = req.params;
        const { med_id, tra_cedula } = req.body;

        const [result] = await conmysql.query(
            'UPDATE tb_rutaasignada SET med_id = ?, tra_cedula = ? WHERE ruta_id = ?',
            [med_id, tra_cedula, id]
        );

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: "Ruta asignada no encontrada" });
        }

        res.json({ message: "Ruta asignada actualizada con éxito" });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar ruta asignada' });
    }
};

// Eliminar una ruta asignada
export const deleteRutaAsignada = async (req, res) => {
    try {
        const [result] = await conmysql.query('DELETE FROM tb_rutaasignada WHERE ruta_id = ?', [req.params.id]);
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: "Ruta asignada no encontrada" });
        }

        res.json({ message: "Ruta asignada eliminada con éxito" });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar ruta asignada' });
    }
};
