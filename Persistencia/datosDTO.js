class DatosDTO {
    constructor(data = {}) {
        this.id = data.idDatos || null;
        this.doc = data.Cedula || null;
        this.name = data.Nombres || null;
        this.lastName = data.Apellidos || null;
        this.adress = data.Direccion || null;
        this.location = data.Ubicacion || null;
        this.latitude = data.latitud || null;
        this.long = data.longitud || null;
    }

    // Getter para todos los atributos
    getAll() {
        return {
            id: this.id,
            doc: this.doc,
            name: this.name,
            lastName: this.lastName,
            adress: this.adress,
            location: this.location,
            latitude: this.latitude,
            long: this.long
        };
    }

    // Setter para todos los atributos
    setAll({idDatos, Cedula, Nombres, Apellidos, Direccion, Ubicacion, latitud, longitud}) {
        this.id = idDatos || null;
        this.doc = Cedula || null;
        this.name = Nombres || null;
        this.lastName = Apellidos || null;
        this.adress = Direccion || null;
        this.location = Ubicacion || null;
        this.latitude = latitud || null;
        this.long = longitud || null;
    }
}

module.exports = DatosDTO;
