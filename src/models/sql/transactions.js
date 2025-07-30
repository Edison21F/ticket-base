const transaction = (sequelize, type) => {
    return sequelize.define('transactions', {
        idTransaction: {
            type: type.STRING,
            primaryKey: true,
        },
        transactionNumber: {
            type: type.STRING,
            unique: true
        },
        paymentMethod: type.STRING,
        paymentProvider: type.STRING,
        amount: type.STRING,
        currency: type.STRING,
        stateTransaction: type.STRING,
        externalReference: type.STRING,
        processingDate: type.STRING,
        completedDate: type.STRING,
        refundAmount: type.STRING,
        refundDate: type.STRING,
        processorCommission: type.STRING,
        createTransaction: type.STRING,
        updateTransaction: type.STRING,
    }, {
        timestamps: false,
        comment: 'Tabla de Transacciones'
    })
}

module.exports = transaction;