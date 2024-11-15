import { conmysql } from '../db.js';

// Obtener todos los clientes
export const getClientes = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_cliente');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar clientes" });
    }
};

// Obtener un cliente por ID
export const getClientePorId = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM tb_cliente WHERE cli_id = ?', [req.params.id]);
        if (result.length <= 0) return res.status(404).json({
            cli_id: 0,
            message: "Cliente no encontrado"
        });
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Crear un nuevo cliente
export const postCliente = async (req, res) => {
    try {
        const { cli_cedula, cli_nombres, cli_apellidos, cli_estado } = req.body;
        const [rows] = await conmysql.query(
            'INSERT INTO tb_cliente (cli_cedula, cli_nombres, cli_apellidos, cli_estado) VALUES (?, ?, ?, ?)',
            [cli_cedula, cli_nombres, cli_apellidos, cli_estado]
        );
        res.send({ id: rows.insertId });
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar un cliente
export const putCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { cli_cedula, cli_nombres, cli_apellidos, cli_estado } = req.body;
        const [result] = await conmysql.query(
            'UPDATE tb_cliente SET cli_cedula = ?, cli_nombres = ?, cli_apellidos = ?, cli_estado = ? WHERE cli_id = ?',
            [cli_cedula, cli_nombres, cli_apellidos, cli_estado, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: "Cliente no encontrado" });
        const [rows] = await conmysql.query('SELECT * FROM tb_cliente WHERE cli_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar parcialmente un cliente
export const patchCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { cli_cedula, cli_nombres, cli_apellidos, cli_estado } = req.body;
        const [result] = await conmysql.query(
            `UPDATE tb_cliente SET 
                cli_cedula = IFNULL(?, cli_cedula), 
                cli_nombres = IFNULL(?, cli_nombres), 
                cli_apellidos = IFNULL(?, cli_apellidos), 
                cli_estado = IFNULL(?, cli_estado) 
            WHERE cli_id = ?`,
            [cli_cedula, cli_nombres, cli_apellidos, cli_estado, id]
        );

        if (result.affectedRows <= 0) return res.status(404).json({ message: "Cliente no encontrado" });
        const [rows] = await conmysql.query('SELECT * FROM tb_cliente WHERE cli_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Eliminar un cliente
export const deleteCliente = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM tb_cliente WHERE cli_id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({
            id: 0,
            message: "No se pudo eliminar al cliente"
        });
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
