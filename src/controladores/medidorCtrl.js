import { conmysql } from '../db.js';  // Importa la conexión a la base de datos

// Obtener todos los medidores
export const getMedidores = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_medidor');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar los medidores" });
    }
};

// Obtener un medidor por ID
export const getMedidorPorId = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_medidor WHERE med_id = ?', [req.params.id]);
        if (result.length <= 0) {
            return res.status(404).json({
                message: "Medidor no encontrado"
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Crear un nuevo medidor
export const postMedidor = async (req, res) => {
    try {
        const { cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado } = req.body;

        const [rows] = await conmysql.query(
            'INSERT INTO tb_medidor (cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado) VALUES (?, ?, ?, ?, ?)',
            [cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado]
        );

        res.status(201).json({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear medidor' });
    }
};

// Actualizar un medidor
export const putMedidor = async (req, res) => {
    try {
        const { id } = req.params;
        const { cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado } = req.body;

        const [result] = await conmysql.query(
            'UPDATE tb_medidor SET cli_cedula = ?, med_num_medidor = ?, med_longitud = ?, med_latitud = ?, med_estado = ? WHERE med_id = ?',
            [cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado, id]
        );

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: "Medidor no encontrado" });
        }

        res.json({ message: "Medidor actualizado con éxito" });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar medidor' });
    }
};

// Eliminar un medidor
export const deleteMedidor = async (req, res) => {
    try {
        const [result] = await conmysql.query('DELETE FROM tb_medidor WHERE med_id = ?', [req.params.id]);
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: "Medidor no encontrado" });
        }

        res.json({ message: "Medidor eliminado con éxito" });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar medidor' });
    }
};
