const transportVehicle = (sequelize, type) => {
    return sequelize.define('transportVehicles', {
        idTransportVehicle: {
            type: type.STRING,
            primaryKey: true,
        },
        vehicleCode: {
            type: type.STRING,
            unique: true
        },
        transportType: type.STRING,
        capacity: type.STRING,
        vehicleModel: type.STRING,
        licensePlate: type.STRING,
        yearVehicle: type.STRING,
        fuelType: type.STRING,
        facilities: type.STRING,
        safetyFeatures: type.STRING,
        lastMaintenance: type.STRING,
        nextMaintenance: type.STRING,
        statusVehicle: type.STRING,
        stateVehicle: type.STRING,
        createVehicle: type.STRING,
        updateVehicle: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Vehículos de Transporte'
    })
}

module.exports = transportVehicle;