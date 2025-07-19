// Modelo de reserva de concierto. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const concertReservation = (sequelize, type) => {
    return sequelize.define('concertReservations', {
        // Identificador único de la reserva (string)
        idConcertReservation: {
            type: type.STRING,
            primaryKey: true,
        },
        // Código único de la reserva (string)
        reservationCode: {
            type: type.STRING,
            unique: true
        },
        // Tipo de ticket reservado (string)
        ticketType: type.STRING,
        // Precio pagado (string)
        pricePaid: type.STRING,
        // Estado de la reserva (string)
        statusReservation: type.STRING,
        // Solicitudes especiales (string)
        specialRequests: type.STRING,
        // Necesidades de accesibilidad (string)
        accessibilityNeeds: type.STRING,
        // Fecha de compra (string)
        purchaseDate: type.STRING,
        // Fecha de creación (string)
        createConcertReservation: type.STRING,
        // Fecha de última actualización (string)
        updateConcertReservation: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Reservas de Conciertos'
    })
}

module.exports = concertReservation;