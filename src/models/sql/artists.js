// Modelo de artista. Todos los campos definidos como string para máxima compatibilidad y flexibilidad en la base de datos.
const artist = (sequelize, type) => {
    return sequelize.define('artists', {
        // Identificador único del artista (string)
        idArtist: {
            type: type.STRING,
            primaryKey: true,
        },
        // Nombre del artista (string)
        nameArtist: type.STRING,
        // Género musical del artista (string)
        genreArtist: type.STRING,
        // País de origen del artista (string)
        countryOrigin: type.STRING,
        // Biografía del artista (string)
        biography: type.STRING,
        // Enlaces a redes sociales (string)
        socialMediaLinks: type.STRING,
        // Información de contacto (string)
        contactInfo: type.STRING,
        // Estado del artista (string)
        statusArtist: type.STRING,
        // Estado lógico del artista (string)
        stateArtist: type.STRING,
        // Fecha de creación (string)
        createArtist: type.STRING,
        // Fecha de última actualización (string)
        updateArtist: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Artistas'
    })
}

module.exports = artist;