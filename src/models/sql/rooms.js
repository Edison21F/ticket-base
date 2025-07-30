const room = (sequelize, type) => {
    return sequelize.define('rooms', {
        idRoom: {
            type: type.STRING,
            primaryKey: true,
        },
        nameRoom: type.STRING,
        numberRoom: type.STRING,
        typeRoom: type.STRING,
        totalCapacity: type.STRING,
        rows: type.STRING,
        basePrice: type.STRING,
        stateRoom: type.STRING,
        createRoom: type.STRING,
        updateRoom: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Salas'
    })
}

module.exports = room;