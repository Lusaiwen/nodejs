const sequelize = require("./db");
const { DataTypes } = require("sequelize");
const moment = require("moment")

module.exports = sequelize.define("Student", {
    name: {
        type: DataTypes.STRING,
        allowNull: null
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
        get(){
            const birth = this.getDataValue("birthday");
            if(birth){
                return birth.getTime();
            }
            return undefined;
        }
    },
    age: {
        type: DataTypes.VIRTUAL,
        get(){
            const now = moment.utc();
            const birth = moment.utc(this.birthday);
            return now.diff(birth, "y");
        }
    },
    sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(11),
        allowNull: null
    }
},{
    createdAt: false,
    updatedAt: false
});