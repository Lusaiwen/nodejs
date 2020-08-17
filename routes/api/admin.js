const express = require("express")
const adminSer = require("../../services/adminService")
const router = express.Router()
const sendMsg = require("../getSendResult")
const crypto = require("../../units/crypt")
const jwt = require("../jwt")

router.get("/whoami", sendMsg.asyncHandle(async (req, res) => {//登录信息
    const result =  await adminSer.getAdminById(req.userId);
    return result;
}))

// router.get("/:id", sendMsg.asyncHandle(async (req, res) => {//获取单个管理员
//     console.log(req.params.id);
//     return await adminSer.getAdminById(req.params.id);
// }))

router.post("/login", sendMsg.asyncHandle(async (req, res) => {//登录
    const result = await adminSer.login(req.body.loginId, req.body.loginPwd);
    if(result) {
        // value = crypto.encrypt(value.toString());
        // res.header("set-cookie", `token=${result.id};path=/;domain=localhost;max-age=3600;`)
        // res.cookie("token", value, {
        //     path: '/',
        //     domain: "localhost",
        //     maxAge: 7 * 24 * 3600 * 1000, //毫秒数
        //     // signed: true 如果加密
        // });
        // res.header("authorization", value);
        //用session
        // req.session.loginUser = result;
        jwt.publish(res, 3600, result)

    }
    return result;
}))



router.post("/", sendMsg.asyncHandle(async (req, res) => {//添加管理员
    return await adminSer.addAdmin(req.body);
}))

router.delete("/:id", sendMsg.asyncHandle(async (req, res) => {//删除管理员
    return await adminSer.deleteAdmin(req.params.id);
}))

router.put("/:id", sendMsg.asyncHandle(async (req, res) => {//修改管理员
    return await adminSer.updateAdmin(req.params.id, req.body)
}))


module.exports = router;