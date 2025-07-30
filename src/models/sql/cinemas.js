// Modelo de cine. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const cinema = (sequelize, type) => {
    return sequelize.define('cinemas', {
        // Identificador único del cine (string)
        idCinema: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre del cine (string)
        nameCinema: type.STRING,
        // Dirección del cine (string)
        addressCinema: type.STRING,
        // Teléfono del cine (string)
        phoneCinema: type.STRING,
        // Correo electrónico del cine (string)
        emailCinema: type.STRING,
        // Latitud del cine (string)
        latitudeCinema: type.STRING,
        // Longitud del cine (string)
        longitudeCinema: type.STRING,
        // Calificación del cine (string)
        ratingCinema: type.STRING,
        // Estado lógico del cine (string)
        stateCinema: type.STRING,
        // Indicador de popularidad (string)
        popularCinema: type.STRING,
        // Fecha de creación (string)
        createCinema: type.STRING,
        // Fecha de última actualización (string)
        updateCinema: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Cines'
    })
}

module.exports = cinema;