const express = require("express")
const classSer = require("../../services/classService")
const router = express.Router();
const sendMsg = require("../getSendResult");


router.get("/", sendMsg.asyncHandle(async (req, res) => {//获取班级
    return await classSer.getClasses();
}))

router.get("/:id", sendMsg.asyncHandle(async (req, res) => {//获取单个班级
    return await classSer.getClassById(req.params.id)
}))

router.post("/", sendMsg.asyncHandle(async (req, res) => {//添加班级
    return await classSer.addClass(req.body);
}))

router.delete("/:id", sendMsg.asyncHandle(async (req, res) => {//删除班级
    return await classSer.deleteClass(req.params.id);
}))

router.put("/:id", sendMsg.asyncHandle(async (req, res) => {//修改班级
    return await classSer.updateClass(req.params.id, req.body);
}))

module.exports = router;