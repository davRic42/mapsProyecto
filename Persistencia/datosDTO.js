class DatosDTO {
    constructor(data) {
        if (data) {
            this.id = data.idDatos || null; 
            this.name = data.Nombres || null; 
            this.lastName = data.Apellidos || null; 
            this.adress = data.Direccion || null; 
            this.location = data.Ubicacion || null; 
            this.latitude = data.latitud || null; 
            this.long = data.longitud || null; 
        } else {
            this.id =null; 
            this.name = null; 
            this.lastName =null; 
            this.adress =  null;
            this.location =null; 
            this.latitude =null; 
            this.long =  null; 
        }
    }
}

module.exports = DatosDTO;
