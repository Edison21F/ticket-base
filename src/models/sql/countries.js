// Modelo de país. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const country = (sequelize, type) => {
    return sequelize.define('countries', {
        // Identificador único del país (string)
        idCountry: {
            type: type.STRING,
            primaryKey: true,
        },
        // Código ISO del país (string)
        isoCode: {
            type: type.STRING,
            unique: true
        },
        // Nombre del país (string)
        nameCountry: type.STRING,
        // Estado lógico del país (string)
        stateCountry: type.STRING,
        // Fecha de creación (string)
        createCountry: type.STRING,
        // Fecha de última actualización (string)
        updateCountry: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Países'
    })
}

module.exports = country;