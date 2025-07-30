// Modelo de concierto. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const concert = (sequelize, type) => {
    return sequelize.define('concerts', {
        // Identificador único del concierto (string)
        idConcert: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre del concierto (string)
        nameConcert: type.STRING,
        // Nombre de la gira (string)
        tourName: type.STRING,
        // Descripción del concierto (string)
        descriptionConcert: type.STRING,
        // Fecha del concierto (string)
        dateConcert: type.STRING,
        // Hora de inicio (string)
        startTime: type.STRING,
        // Hora de fin (string)
        endTime: type.STRING,
        // Restricción de edad (string)
        ageRestriction: type.STRING,
        // Duración en minutos (string)
        durationMinutes: type.STRING,
        // Hora de prueba de sonido (string)
        soundCheckTime: type.STRING,
        // Requerimientos de montaje (string)
        setupRequirements: type.STRING,
        // Rider técnico (string)
        technicalRider: type.STRING,
        // Precio de entrada general (string)
        ticketPrice: type.STRING,
        // Precio VIP (string)
        vipPrice: type.STRING,
        // Estado del concierto (string)
        statusConcert: type.STRING,
        // Estado lógico del concierto (string)
        stateConcert: type.STRING,
        // Fecha de creación (string)
        createConcert: type.STRING,
        // Fecha de última actualización (string)
        updateConcert: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Conciertos'
    })
}

module.exports = concert;