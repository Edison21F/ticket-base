// Modelo de ciudad. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const city = (sequelize, type) => {
    return sequelize.define('cities', {
        // Identificador único de la ciudad (string)
        idCity: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre de la ciudad (string)
        nameCity: type.STRING,
        // Código postal (string)
        postalCode: type.STRING,
        // Estado lógico de la ciudad (string)
        stateCity: type.STRING,
        // Fecha de creación (string)
        createCity: type.STRING,
        // Fecha de última actualización (string)
        updateCity: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Ciudades'
    })
}

module.exports = city;