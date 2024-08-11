class TutorDTO {
    constructor(data) {
        if (data) {
            this.id = data.id_tutor || null; // Renombrar id_tutor a id
            this.tutorName = data.tutor_name || null; // Renombrar tutor_name a tutorName
            this.tutorPhone = data.tutor_phone || null; // Renombrar tutor_phone a tutorPhone
            this.isDirector = data.tutor_director || null; // Renombrar tutor_director a isDirector
            this.idCasa = data.id_casa || null; // Renombrar id_casa a idCasa
        } else {
            this.id = null;
            this.tutorName = null;
            this.tutorPhone = null;
            this.isDirector = null;
            this.idCasa = null;
        }
    }
}

module.exports = TutorDTO;
