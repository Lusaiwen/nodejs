const Class = require("../models/Class")
exports.addClass = async function(classObj){
    const ins = await Class.create(classObj);
    console.log("添加班级成功");
    return ins.toJSON();
}

exports.deleteClass = async function (classId) {
    if(classId){
        Class.destroy({
            where:{
                id: classId
            }
        })
        console.log("删除班级成功");
        return;
    }
    console.log("删除班级失败");
}

exports.updateClass = async function (id, classObj){
    if(id && classObj){
        Class.update(classObj, {
            where: {
                id
            }
        })
        console.log("修改班级成功");
        return;
    }
    console.log("修改班级失败");
}

exports.getClasses = async function () {
    const result = await Class.findAndCountAll();
    return {
        total: result.count,
        datas: JSON.parse(JSON.stringify(result.rows))
    }
}

exports.getClassById = async function (id) {
    const result =  await Class.findOne({
        where: {
            id
        }
    })
    return JSON.parse(JSON.stringify(result));
}