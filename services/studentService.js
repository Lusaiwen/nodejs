const Student = require("../models/Student");
const {
    Op
} = require("sequelize") //查询
const Class = require("../models/Class")
const validate = require("validate.js")
const moment = require("moment")
const {
    pick
} = require("../units/properHelper");
const { async } = require("validate.js");


exports.addStudent = async function (studentObj) {
    studentObj = pick(studentObj, 'name', 'birthday', 'sex', 'mobile', 'ClassId');
    console.log(studentObj);
    const rules = {
        name: {
            presence: {
                allowEmpty: false
            },
            type: "string",
            length: {
                minimum: 2,
                maximum: 10
            }
        },
        birthday: {
            presence: {
                allowEmpty: false
            },
            datetime: {
                earliest: +moment.utc().subtract(100, "y"),
                latest: +moment.utc().subtract(5, "y"),
                dateOnly: true,
            }
        },
        sex: {
            presence: {
                allowEmpty: false
            },
            type: "boolean"
        },
        mobile: {
            presence: {
                allowEmpty: false
            },
            format: /1\d{10}/
        },
        ClassId: {
            presence: {
                allowEmpty: false
            },
            numericality: {
                onlyInterger: true,
                strict: true
            },
            classExits: true
        }
    }
    await validate.async(studentObj, rules);
    const ins = await Student.create(studentObj);
    // console.log(result);
    console.log("添加学生成功");
    return ins.toJSON();
}

exports.deleteStudent = async function (studentId) {
    if (studentId) {
        Student.destroy({
            where: {
                id: studentId
            }
        })
        console.log("删除学生成功");
        return;
    }
    console.log("删除学生失败");
}

exports.updateStudent = async function (id, studentObj) {
    if (id && studentObj) {
        Student.update(studentObj, {
            where: {
                id
            }
        })
        console.log("修改学生成功");
        return studentObj;
    }
    console.log("修改学生失败");
}

exports.getStudents = async function (page = 1, limit = 10, sex = -1, name = "") {
    // const result = await Student.findAll({
    //     offset: (page - 1) * limit,
    //     limit: +limit
    // });
    // const total = await Student.count();
    // const datas = JSON.parse(JSON.stringify(result));
    // return {
    //     total,
    //     datas
    // }
    const condition = {};
    if (sex !== -1) {
        condition.sex = !!sex;
    }
    if (name) {
        condition.name = {
            [Op.like]: `%${name}%`
        };
    }
    const result = await Student.findAndCountAll({
        attributes: ['id', 'name', 'sex', 'birthday', 'age'],
        where: condition,
        include: [Class],
        offset: (page - 1) * limit,
        limit: +limit
    })
    return {
        total: result.count,
        datas: JSON.parse(JSON.stringify(result.rows))
    }
}

exports.getStudentById = async function (id) {
    const result = await Student.findByPk(id);
    return JSON.parse(JSON.stringify(result));
}