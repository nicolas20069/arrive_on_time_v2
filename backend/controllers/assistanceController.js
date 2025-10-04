// Importamos la conexión al pool de MySQL desde el archivo de configuración
import { pool } from '../config/db.js'; // archivo de conexión a MySQL
import moment from 'moment-timezone'; // Útil para manejar fechas y zonas horarias

// ================================================
// Controlador para registrar una nueva asistencia
// ================================================
export const recordAssistance = async (req, res) => {
    // 1. Desestructuración y Validación de Datos del cuerpo de la petición
    const { employeeId, type } = req.body; // 'type' puede ser 'entrada' o 'salida'

    // Si falta alguno de los datos requeridos, se devuelve error 400 (Bad Request)
    if (!employeeId || !type) {
        return res.status(400).json({ 
            success: false, 
            message: 'Faltan datos requeridos: employeeId y type.' 
        });
    }

    // Validación del campo 'type' para asignar el tipo_id correspondiente
    let tipo_id;
    if (type === 'entrada') {
        tipo_id = 1; // tipo_id 1 representa una entrada
    } else if (type === 'salida') {
        tipo_id = 2; // tipo_id 2 representa una salida
    } else {
        // Si el valor no es válido, se devuelve un error
        return res.status(400).json({ 
            success: false, 
            message: 'El tipo de asistencia debe ser "entrada" o "salida".' 
        });
    }

    // 2. Intentamos ejecutar la transacción para registrar la asistencia
    try {
        // Obtenemos la fecha y hora actual en la zona horaria de Bogotá
        const now = moment().tz("America/Bogota");
        const fecha = now.format('D/M/YYYY'); // Fecha en formato día/mes/año
        const hora = now.format('HH:mm:ss');  // Hora en formato 24 horas

        // 3. Preparamos la consulta SQL para insertar el nuevo registro
        const query = `
            INSERT INTO asistencia (user_id, tipo_id, fecha, hora) 
            VALUES (?, ?, ?, ?)
        `;
        
        // Ejecutamos la consulta pasando los valores como parámetros para evitar inyección SQL
        const [result] = await pool.execute(query, [employeeId, tipo_id, fecha, hora]);

        // 4. Si la inserción fue exitosa, devolvemos una respuesta 201 (Created)
        res.status(201).json({
            success: true,
            message: `Registro de ${type} exitoso para el empleado ${employeeId}.`,
            data: {
                id: result.insertId, // ID del registro insertado
                employeeId,          // ID del empleado
                type,                // Tipo de asistencia (entrada/salida)
                fecha,               // Fecha registrada
                hora                 // Hora registrada
            }
        });

    } catch (error) {
        // Si ocurre un error en la base de datos o en la lógica, se captura aquí
        console.error('Error al insertar el registro de asistencia:', error);

        // 5. Respondemos con un error 500 (Internal Server Error)
        res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor al registrar la asistencia.' 
        });
    }
};


// ================================================
// Controlador para consultar el historial de asistencia
// ================================================

export const getAssistanceHistory = async (req, res) => {
    // Obtenemos el ID del empleado desde los parámetros de la URL
    const { employeeId } = req.params;

    // Validamos que se haya enviado el parámetro employeeId
    if (!employeeId) {
        return res.status(400).json({
            success: false,
            message: 'Falta el ID del empleado.'
        });
    }

    try {
        // Consulta SQL que une las tablas asistencia y tipo_asistencia
        // para mostrar el nombre del tipo de asistencia (Entrada/Salida)
        const query = `
            SELECT a.fecha, a.hora, ta.tipo_asistencia as type
            FROM asistencia a
            JOIN tipo_asistencia ta ON a.tipo_id = ta.tipo_id
            WHERE a.user_id = ?
            ORDER BY a.fecha DESC, a.hora DESC
            LIMIT 10;
        `;

        // Ejecutamos la consulta pasando el ID del empleado
        const [records] = await pool.execute(query, [employeeId]);

        // Si no hay registros, devolvemos un mensaje indicándolo
        if (records.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No se encontraron registros para este empleado.',
                current_status: 'desconocido', // No se puede determinar si está dentro o fuera
                history: [] // Sin historial
            });
        }

        // El estado actual se determina por el tipo del registro más reciente
        const current_status = records[0].type;

        // Respondemos con los registros encontrados
        res.status(200).json({
            success: true,
            current_status: current_status, // Entrada o Salida
            history: records // Últimos 10 registros
        });

    } catch (error) {
        // Si ocurre un error durante la consulta, lo capturamos aquí
        console.error('Error al obtener el historial de asistencia:', error);

        // Respondemos con un error 500 (Internal Server Error)
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al obtener el historial.'
        });
    }
};

