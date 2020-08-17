const sequelize = require("./db");
const { DataTypes } = require("sequelize");
const Class = sequelize.define("Class",{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    openDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    createdAt: false,
    updatedAt: false,
});

module.exports = Class;




