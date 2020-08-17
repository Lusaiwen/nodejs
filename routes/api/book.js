const express = require("express")
const bookSer = require("../../services/bookService")
const router = express.Router();
const sendMsg = require("../getSendResult");


router.get("/", sendMsg.asyncHandle(async (req, res) => {//获取图书
    return await bookSer.getAllBooks();
}))

router.get("/:id", sendMsg.asyncHandle(async (req, res) => {//获取单个图书
    return await bookSer.getBookById(req.params.id);
}))

router.post("/", sendMsg.asyncHandle(async (req, res) => {//添加图书
    return await bookSer.addBook(req.body);
}))

router.delete("/:id", sendMsg.asyncHandle(async (req, res) => {//删除图书
    return await bookSer.deleteBook(req.params.id);
}))

router.put("/:id", sendMsg.asyncHandle(async (req, res) => {//修改图书
    return await bookSer.updateBook(req.params.id, req.body);
}))


module.exports = router;