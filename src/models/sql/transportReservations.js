const transportReservation = (sequelize, type) => {
    return sequelize.define('transportReservations', {
        idTransportReservation: {
            type: type.STRING,
            primaryKey: true,
        },
        reservationCode: {
            type: type.STRING,
            unique: true
        },
        passengerName: type.STRING,
        passengerDocument: type.STRING,
        passengerEmail: type.STRING,
        passengerPhone: type.STRING,
        bookingClass: type.STRING,
        priceReservation: type.STRING,
        statusReservation: type.STRING,
        specialRequests: type.STRING,
        checkInTime: type.STRING,
        luggageInfo: type.STRING,
        createTransportReservation: type.STRING,
        updateTransportReservation: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Reservas de Transporte'
    })
}

module.exports = transportReservation;