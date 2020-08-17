require("./Admin")
require("./Class")
require("./Student")
require("./Book")
require("./relation")
const sequelize = require("./db");
sequelize.sync({alter: true}).then(() => {
        console.log("所有模块已经被同步");
});


