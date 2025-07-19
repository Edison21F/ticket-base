// Modelo de sección de concierto. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const concertSection = (sequelize, type) => {
    return sequelize.define('concertSections', {
        // Identificador único de la sección (string)
        idConcertSection: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre de la sección (string)
        sectionName: type.STRING,
        // Capacidad de la sección (string)
        capacity: type.STRING,
        // Precio base de la sección (string)
        basePrice: type.STRING,
        // Tipo de sección (string)
        sectionType: type.STRING,
        // Calidad de vista (string)
        viewQuality: type.STRING,
        // Amenidades de la sección (string)
        amenities: type.STRING,
        // Estado lógico de la sección (string)
        stateConcertSection: type.STRING,
        // Fecha de creación (string)
        createConcertSection: type.STRING,
        // Fecha de última actualización (string)
        updateConcertSection: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Secciones de Conciertos'
    })
}

module.exports = concertSection;