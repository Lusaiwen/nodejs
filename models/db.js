const { Sequelize } = require("sequelize");
const {sqlLogger} = require("../logger");
const sequelize = new Sequelize('myschooldb', 'root', 'lsw20001013...', {
    host: 'localhost',
    dialect: 'mysql', /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    logging(msg) {
        sqlLogger.debug(msg);
    },
    define: {
        freezeTableName: true,
        paranoid: true
    }
});

module.exports = sequelize;