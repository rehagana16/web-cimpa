module.exports = (sequelize, Sequelize) => {
    const pesertaCimpa = sequelize.define("pesertaCimpa", {
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        klasis: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        runggun: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pesertaId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        jenisKelamin: {
            type: Sequelize.STRING,
            allowNull: false
        },
        noTelp: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        linkSosmed: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        buktiBayar: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        foto: {
            type: Sequelize.STRING,
            allowNull: false,
        }, 
        isConfirmed: {
            type: Sequelize.BOOLEAN,
            allowNull:false,
        },
    });

    return pesertaCimpa;
};