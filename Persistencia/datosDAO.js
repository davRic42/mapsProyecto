const Database = require('./db');
const DatosDTO = require('./datosDTO');

class DatosDAO {
    constructor() {
        this.db = Database.getInstance();
    }

    async createUser(Data) {
        const query = 'CALL CreateUser(?, ?, ?, ?, ?, ?)';
        const results = await this.db.query(query, [Data.name, Data.lastName, Data.adress, Data.location, Data.latitude, Data.long]);
        return new DatosDTO(results[0][0]); // Usamos el DTO para la respuesta
    }

    async UpdateUser(id, Data) {
        const query = 'CALL	UpdateUser(?, ?, ?, ?, ?, ?, ?)';
        const results = await this.db.query(query, [id, Data.name, Data.lastName, Data.adress, Data.location, Data.latitude, Data.long]);
        return results.affectedRows > 0 ? new DatosDTO({ id, ...Data }) : null;
    }

    async deleteTutor(id) {
        const query = 'CALL deleteTutor(?)';
        const results = await this.db.query(query, [id]);
        return results.affectedRows > 0;
    }

    async getTutor(id) {
        const query = 'CALL readTutor(?)';
        try {
            const [rows] = await this.db.query(query, [id]);

            console.log('Resultados de la consulta:', rows[0]);

            // Asegúrate de que los resultados están correctamente estructurados
            if (rows) {
                const result = rows[0]; // Accede al primer resultado
                console.log('Primer resultado:', result);
                return new TutorDTO(result); // Crea el DTO con los datos
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
