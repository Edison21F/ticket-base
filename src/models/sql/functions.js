// Modelo de función. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const func = (sequelize, type) => {
    return sequelize.define('functions', {
        // Identificador único de la función (string)
        idFunction: {
            type: type.STRING,
            primaryKey: true,
        },
        // Fecha de la función (string)
        dateFunction: type.STRING,
        // Hora de inicio (string)
        startTime: type.STRING,
        // Hora de fin (string)
        endTime: type.STRING,
        // Formato de la función (string)
        formatFunction: type.STRING,
        // Idioma de la función (string)
        languageFunction: type.STRING,
        // Subtítulos de la función (string)
        subtitlesFunction: type.STRING,
        // Precio base (string)
        basePrice: type.STRING,
        // Precio VIP (string)
        vipPrice: type.STRING,
        // Precio Premium (string)
        premiumPrice: type.STRING,
        // Asientos disponibles (string)
        availableSeats: type.STRING,
        // Asientos reservados (string)
        reservedSeats: type.STRING,
        // Asientos vendidos (string)
        soldSeats: type.STRING,
        // Estado de la función (string)
        stateFunction: type.STRING,
        // Estado lógico de la función (string)
        activeFunction: type.STRING,
        // Fecha de creación (string)
        createFunction: type.STRING,
        // Fecha de última actualización (string)
        updateFunction: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Funciones'
    })
}

module.exports = func;