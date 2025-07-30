const transportSeat = (sequelize, type) => {
    return sequelize.define('transportSeats', {
        idTransportSeat: {
            type: type.STRING,
            primaryKey: true,
        },
        seatNumber: type.STRING,
        seatClass: type.STRING,
        seatType: type.STRING,
        amenities: type.STRING,
        statusSeat: type.STRING,
        additionalFee: type.STRING,
        stateSeat: type.STRING,
        createSeat: type.STRING,
        updateSeat: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Asientos de Transporte'
    })
}

module.exports = transportSeat;