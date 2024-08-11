const Database = require('./db');
const TutorDTO = require('./tutorDTO'); 

class TutorDAO {
    constructor() {
        this.db = Database.getInstance();
    }

    async createTutor(tutorData) {
        const query = 'CALL crearTutor(?, ?, ?, ?)';
        const results = await this.db.query(query, [tutorData.tutorName, tutorData.tutorPhone, tutorData.isDirector, tutorData.idCasa]);
        return new TutorDTO(results[0][0]); // Usamos el DTO para la respuesta
    }

    async updateTutor(id, tutorData) {
        const query = 'CALL editTutor(?, ?, ?, ?, ?)';
        const results = await this.db.query(query, [id, tutorData.tutorName, tutorData.tutorPhone, tutorData.isDirector, tutorData.idCasa]);
        return results.affectedRows > 0 ? new TutorDTO({ id, ...tutorData }) : null;
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

module.exports = new TutorDAO();
