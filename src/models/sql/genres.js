// Modelo de género. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const genre = (sequelize, type) => {
    return sequelize.define('genres', {
        // Identificador único del género (string)
        idGenre: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre del género (string)
        nameGenre: {
            type: type.STRING,
            unique: true
        },
        // Descripción del género (string)
        descriptionGenre: type.STRING,
        // Color en formato hexadecimal (string)
        colorHex: type.STRING,
        // Estado lógico del género (string)
        stateGenre: type.STRING,
        // Fecha de creación (string)
        createGenre: type.STRING,
        // Fecha de última actualización (string)
        updateGenre: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Géneros'
    })
}

module.exports = genre;