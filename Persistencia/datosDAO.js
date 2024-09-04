const Database = require('./db');
const DatosDTO = require('./datosDTO');

class DatosDAO {
    constructor() {
        this.db = Database.getInstance();
    }

    // Crear usuario
    async createUser(data) {
        const query = 'CALL CreateUser(?, ?, ?, ?, ?, ?)';
        const results = await this.db.query(query, [
            data.doc, 
            data.name, 
            data.lastName, 
            data.adress, 
            data.latitude, 
            data.long
        ]);

        console.log('Resultados de la consulta:', results); // Log para verificar resultados
        return new DatosDTO(results[0][0]); // Usamos el DTO para crear el objeto con los datos
    }

    // Actualizar usuario
    async updateUser(id, data) {
        const query = 'CALL UpdateUser(?, ?, ?, ?, ?, ?, ?)';
        const results = await this.db.query(query, [
            id,
            data.doc, 
            data.name, 
            data.lastName, 
            data.adress, 
            data.latitude, 
            data.long
        ]);

        console.log('Resultados de la consulta:', results); // Log para verificar resultados
        return new DatosDTO(results[0][0]); // Usamos el DTO para el objeto actualizado
    }

    // Eliminar usuario
    async deleteUser(id) {
        const query = 'CALL DeleteUser(?)';
        const results = await this.db.query(query, [id]);

        return results.affectedRows > 0; // Devuelve `true` si se eliminó correctamente
    }

    // Obtener usuario por ID
    async getUser(id) {
        const query = 'CALL ReadUser(?)';
        try {
            const [rows] = await this.db.query(query, [id]);

            console.log('Resultados de la consulta:', rows[0]); // Verifica el resultado

            if (rows && rows.length > 0) {
                const result = rows[0]; // Accede al primer resultado
                console.log('Primer resultado:', result);
                return new DatosDTO(result); // Crea el DTO con los datos obtenidos
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error ejecutando la consulta:', error);
            throw error;
        }
    }
}

module.exports = new DatosDAO();
