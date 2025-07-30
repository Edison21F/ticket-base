// Modelo de evento. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const event = (sequelize, type) => {
    return sequelize.define('events', {
        // Identificador único del evento (string)
        idEvent: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre del evento (string)
        nameEvent: type.STRING,
        // Descripción del evento (string)
        descriptionEvent: type.STRING,
        // Tipo de evento (string)
        eventType: type.STRING,
        // ID del evento en el microservicio específico (string)
        microserviceEventId: type.STRING,
        // Lugar del evento (string)
        venue: type.STRING,
        // Fecha y hora del evento (string)
        dateTimeEvent: type.STRING,
        // Capacidad del evento (string)
        capacity: type.STRING,
        // Estado del evento (string)
        statusEvent: type.STRING,
        // URL de la imagen del evento (string)
        imageUrl: type.STRING,
        // Estado lógico del evento (string)
        stateEvent: type.STRING,
        // Fecha de creación (string)
        createEvent: type.STRING,
        // Fecha de última actualización (string)
        updateEvent: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla Maestra de Eventos'
    })
}

module.exports = event;