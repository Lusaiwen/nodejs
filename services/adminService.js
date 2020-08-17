const Admin = require("../models/Admin");
const md5 = require("md5")

exports.addAdmin = async function (adminObj){
    adminObj.loginPwd = md5(adminObj.loginPwd);
    const ins = await Admin.create(adminObj);
    console.log("添加管理员成功");
    return ins.toJSON();
}

exports.deleteAdmin = async function (adminId) {
    //方式一
    // const ins = await Admin.findByPk(adminId); // 得到实例
    // if(ins){
    //     await ins.destroy();     //销毁实例
    // }

    //方式二
    if(adminId){
        Admin.destroy({
            where:{
                id: adminId
            }
        })
        console.log("删除管理员成功");
        return;
    }
    console.log("删除管理员失败");
}

exports.updateAdmin = async function (id, adminObj){
    //方式一
    // const ins = await Admin.findByPk(id);
    // ins.loginId = adminObj.loginId;
    // ins.save();
    if(adminObj.loginPwd) {
        adminObj.loginPwd = md5(adminObj.loginPwd);
    }
    if(id && adminObj){
        Admin.update(adminObj, {
            where: {
                id
            }
        })
        console.log("修改管理员成功");
        return;
    }
    console.log("修改管理员失败");
}


exports.login = async function (loginId, loginPwd) {
    loginPwd = md5(loginPwd);
    const result = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        },
        attributes: {
            exclude: ['loginPwd']
        }
    })
    if(result != null && result.loginId === loginId){
        console.log("登陆成功");
        return result.toJSON();
    }else {
        return null;
    }
}

exports.getAdminById = async function (id) {
    const result = await Admin.findByPk(id, {
        attributes: {
            exclude: ['loginPwd']
        }
    });
    if(result){
        return result.toJSON();
    }
}