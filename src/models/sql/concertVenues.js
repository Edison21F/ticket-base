// Modelo de venue de concierto. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const concertVenue = (sequelize, type) => {
    return sequelize.define('concertVenues', {
        // Identificador único del venue (string)
        idConcertVenue: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre del venue (string)
        nameVenue: type.STRING,
        // Dirección del venue (string)
        addressVenue: type.STRING,
        // Capacidad del venue (string)
        capacity: type.STRING,
        // Tipo de venue (string)
        venueType: type.STRING,
        // Sistema de sonido (string)
        soundSystem: type.STRING,
        // Sistema de iluminación (string)
        lightingSystem: type.STRING,
        // Tamaño del escenario (string)
        stageSize: type.STRING,
        // Espacios de estacionamiento (string)
        parkingSpaces: type.STRING,
        // Características de accesibilidad (string)
        accessibilityFeatures: type.STRING,
        // Información de contacto (string)
        contactInfo: type.STRING,
        // Estado lógico del venue (string)
        stateVenue: type.STRING,
        // Fecha de creación (string)
        createVenue: type.STRING,
        // Fecha de última actualización (string)
        updateVenue: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Venues de Conciertos'
    })
}

module.exports = concertVenue;