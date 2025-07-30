const transportSchedule = (sequelize, type) => {
    return sequelize.define('transportSchedules', {
        idTransportSchedule: {
            type: type.STRING,
            primaryKey: true,
        },
        departureTime: type.STRING,
        arrivalTime: type.STRING,
        priceSchedule: type.STRING,
        availableSeats: type.STRING,
        statusSchedule: type.STRING,
        gateTerminal: type.STRING,
        platform: type.STRING,
        delayMinutes: type.STRING,
        delayReason: type.STRING,
        stateSchedule: type.STRING,
        createSchedule: type.STRING,
        updateSchedule: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Horarios de Transporte'
    })
}

module.exports = transportSchedule;