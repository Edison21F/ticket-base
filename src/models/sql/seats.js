const seat = (sequelize, type) => {
    return sequelize.define('seats', {
        idSeat: {
            type: type.STRING,
            primaryKey: true,
        },
        rowSeat: type.STRING,
        numberSeat: type.STRING,
        typeSeat: type.STRING,
        additionalPrice: type.STRING,
        stateSeat: type.STRING,
        positionX: type.STRING,
        positionY: type.STRING,
        createSeat: type.STRING,
        updateSeat: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Asientos'
    })
}

module.exports = seat;