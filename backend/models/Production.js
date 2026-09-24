const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Production = sequelize.define(
    "Production",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        ordem: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        produto: {
            type: DataTypes.STRING,
            allowNull: false
        },

        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Aguardando"
        }
    },
    {
        tableName: "productions",
        timestamps: true
    }
);

module.exports = Production;
