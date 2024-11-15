import { conmysql } from '../db.js';  // Importa la conexión a la base de datos

// Obtener todos los consumos
export const getConsumos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_consumo');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar los consumos" });
    }
};

// Obtener un consumo por ID
export const getConsumoPorId = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_consumo WHERE con_id = ?', [req.params.id]);
        if (result.length <= 0) {
            return res.status(404).json({
                message: "Consumo no encontrado"
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Crear un nuevo consumo
export const postConsumo = async (req, res) => {
    try {
        const { med_id, mes, anio, consumo, longitudToma, latitudToma } = req.body;

        const [rows] = await conmysql.query(
            'INSERT INTO tb_consumo (med_id, mes, anio, consumo, longitudToma, latitudToma) VALUES (?, ?, ?, ?, ?, ?)',
            [med_id, mes, anio, consumo, longitudToma, latitudToma]
        );

        res.status(201).json({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear consumo' });
    }
};

// Actualizar un consumo
export const putConsumo = async (req, res) => {
    try {
        const { id } = req.params;
        const { med_id, mes, anio, consumo, longitudToma, latitudToma } = req.body;

        const [result] = await conmysql.query(
            'UPDATE tb_consumo SET med_id = ?, mes = ?, anio = ?, consumo = ?, longitudToma = ?, latitudToma = ? WHERE con_id = ?',
            [med_id, mes, anio, consumo, longitudToma, latitudToma, id]
        );

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: "Consumo no encontrado" });
        }

        res.json({ message: "Consumo actualizado con éxito" });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar consumo' });
    }
};

// Eliminar un consumo
export const deleteConsumo = async (req, res) => {
    try {
        const [result] = await conmysql.query('DELETE FROM tb_consumo WHERE con_id = ?', [req.params.id]);
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: "Consumo no encontrado" });
        }

        res.json({ message: "Consumo eliminado con éxito" });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar consumo' });
    }
};
