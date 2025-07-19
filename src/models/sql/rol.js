// Modelo de rol. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const role = (sequelize, type) => {
    return sequelize.define('roles', {
        // Identificador único del rol (string)
        idRole: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre del rol (string)
        nameRole: type.STRING,
        // Descripción del rol (string)
        descriptionRole: type.STRING,
        // Estado lógico del rol (string)
        stateRole: type.STRING,
        // Fecha de creación (string)
        createRole: type.STRING,
        // Fecha de última actualización (string)
        updateRole: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Roles'
    })
}

module.exports = role;