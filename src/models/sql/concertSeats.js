// Modelo de asiento de concierto. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const concertSeat = (sequelize, type) => {
    return sequelize.define('concertSeats', {
        // Identificador único del asiento (string)
        idConcertSeat: {
            type: type.STRING,
            primaryKey: true,
        },
        // Identificador de fila (string)
        rowIdentifier: type.STRING,
        // Número de asiento (string)
        seatNumber: type.STRING,
        // Tipo de asiento (string)
        seatType: type.STRING,
        // Posición X en el mapa de la sala (string)
        positionX: type.STRING,
        // Posición Y en el mapa de la sala (string)
        positionY: type.STRING,
        // Línea de visión (string)
        viewLine: type.STRING,
        // Estado lógico del asiento (string)
        stateConcertSeat: type.STRING,
        // Fecha de creación (string)
        createConcertSeat: type.STRING,
        // Fecha de última actualización (string)
        updateConcertSeat: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Asientos de Conciertos'
    })
}

module.exports = concertSeat;