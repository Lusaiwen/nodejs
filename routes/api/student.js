const express = require("express")
const stuSer = require("../../services/studentService");
const router = express.Router();
const sendMsg = require("../getSendResult");

router.get("/", sendMsg.asyncHandle(async (req, res) => {//获取学生
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sex = req.query.sex || -1;
    const name = req.query.name || "";
    return await stuSer.getStudents(page, limit, sex, name);
}))

router.get("/:id", sendMsg.asyncHandle(async (req, res) => {//获取单个学生
    return await stuSer.getStudentById(req.params.id);
}))

router.post("/", sendMsg.asyncHandle(async (req, res) => {//添加学生
    return await stuSer.addStudent(req.body);
}))

router.delete("/:id", sendMsg.asyncHandle(async (req, res) => {//删除学生
    return await stuSer.deleteStudent(req.params.id);
}))

router.put("/:id", sendMsg.asyncHandle(async (req, res) => {//修改学生
    return await stuSer.updateStudent(req.params.id, req.body);
}))

module.exports = router;