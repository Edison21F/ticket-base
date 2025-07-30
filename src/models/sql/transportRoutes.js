const transportRoute = (sequelize, type) => {
    return sequelize.define('transportRoutes', {
        idTransportRoute: {
            type: type.STRING,
            primaryKey: true,
        },
        routeName: type.STRING,
        transportType: type.STRING,
        origin: type.STRING,
        destination: type.STRING,
        distanceKm: type.STRING,
        estimatedDuration: type.STRING,
        routeCode: type.STRING,
        waypoints: type.STRING,
        tollCosts: type.STRING,
        statusRoute: type.STRING,
        stateRoute: type.STRING,
        createRoute: type.STRING,
        updateRoute: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Rutas de Transporte'
    })
}

module.exports = transportRoute;