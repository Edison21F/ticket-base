// Modelo de reserva. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const reservation = (sequelize, type) => {
    return sequelize.define('reservations', {
        // Identificador único de la reserva (string)
        idReservation: {
            type: type.STRING,
            primaryKey: true,
        },
        // Código único de reserva (string)
        codeReservation: {
            type: type.STRING,
            unique: true
        },
        // Fecha de la reserva (string)
        dateReservation: type.STRING,
        // Fecha de expiración (string)
        expirationDate: type.STRING,
        // Número de asientos (string)
        numberSeats: type.STRING,
        // Subtotal de tickets (string)
        subtotalTickets: type.STRING,
        // Subtotal de productos (string)
        subtotalProducts: type.STRING,
        // Comisión de servicio (string)
        serviceCommission: type.STRING,
        // Descuentos aplicados (string)
        discounts: type.STRING,
        // Total de la reserva (string)
        totalReservation: type.STRING,
        // Método de pago (string)
        paymentMethod: type.STRING,
        // Referencia de pago (string)
        paymentReference: type.STRING,
        // Estado de la reserva (string)
        stateReservation: type.STRING,
        // Origen de la reserva (string)
        originReservation: type.STRING,
        // Fecha de creación (string)
        createReservation: type.STRING,
        // Fecha de última actualización (string)
        updateReservation: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Reservas'
    })
}

module.exports = reservation;