const ticket = (sequelize, type) => {
    return sequelize.define('tickets', {
        idTicket: {
            type: type.STRING,
            primaryKey: true,
        },
        ticketCode: {
            type: type.STRING,
            unique: true
        },
        microserviceTicketId: type.STRING,
        ticketType: type.STRING,
        priceTicket: type.STRING,
        statusTicket: type.STRING,
        purchaseDate: type.STRING,
        qrCode: type.STRING,
        createTicket: type.STRING,
        updateTicket: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla Maestra de Tickets'
    })
}

module.exports = ticket;