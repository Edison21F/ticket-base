// Modelo de detalle de rol. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const detalleRol = (sequelize, type) => {
    return sequelize.define('detalleROls', {
        // Identificador único del detalle de rol (string)
        idDetalleRol: {
            type: type.STRING,
            primaryKey: true
        },
        // Fecha de creación (string)
        createDetalleRol: type.STRING,
        // Fecha de última actualización (string)
        updateDetalleRol: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de detalle Rol'
    })
}

module.exports = detalleRol;