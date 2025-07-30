// Modelo de clasificación. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const classification = (sequelize, type) => {
    return sequelize.define('classifications', {
        // Identificador único de la clasificación (string)
        idClassification: {
            type: type.STRING,
            primaryKey: true,
        },
        // Código único de la clasificación (string)
        codeClassification: {
            type: type.STRING,
            unique: true
        },
        // Nombre de la clasificación (string)
        nameClassification: type.STRING,
        // Descripción de la clasificación (string)
        descriptionClassification: type.STRING,
        // Edad mínima (string)
        minimumAge: type.STRING,
        // Requiere acompañante (string)
        requiresCompanion: type.STRING,
        // Estado lógico de la clasificación (string)
        stateClassification: type.STRING,
        // Fecha de creación (string)
        createClassification: type.STRING,
        // Fecha de última actualización (string)
        updateClassification: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Clasificaciones'
    })
}

module.exports = classification;