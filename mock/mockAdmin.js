const Mock = require("mockjs")

const result = Mock.mock({
    "datas|5-10": [{
        loginId: /[a-z]{6}/,
        loginPwd: /\d{5}/
    }]
}).datas;

// const Admin = require("../models/Admin");
// Admin.bulkCreate(result);
