const Mock = require("mockjs");

const result = Mock.mock({
    "datas|500-1000": [{
        name: "@cname",
        birthday: "@date",
        "sex|1-2": true,
        mobile: /1\d{10}/,
        "ClassId|1-77": 0
    }]
}).datas;
const Student = require("../models/Student");
require("../models/relation")
Student.bulkCreate(result);
