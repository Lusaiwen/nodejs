const express = require("express")
const router = express.Router();
const multer = require("multer")
const path = require("path")



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/upload"))
    },
    filename: function (req, file, cb) {
        const timeStamp = Date.now();
        const randomStr = Math.random().toString(36).slice(-6);
        const ext = path.extname(file.originalname);
        const filename = `${timeStamp}-${randomStr}${ext}`
        cb(null, filename)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 150 * 1024
    },
    fileFilter (req, file, cb) {
        const whiteList = [".jpg", ".gif", ".png", ".jpeg"];
        const ext = path.extname(file.originalname);
        if(whiteList.includes(ext)){
            cb(null, true);
        }else {
            cb(new Error(`your ext name of ${ext} is not support`))
        }
        // 这个函数应该调用 `cb` 用boolean值来
        // 指示是否应接受该文件
      
        // 拒绝这个文件，使用`false`，像这样:
        cb(null, false)
      
        // 接受这个文件，使用`true`，像这样:
        cb(null, true)
      
        // 如果有问题，你可以总是这样发送一个错误:
        cb(new Error('I don\'t have a clue!'))
      
      }
})



router.post("/", upload.single("img"), (req, res) => {
    const url = `/upload/${req.file.filename}`;
    res.send({
        code: 0,
        msg: "",
        url
    })
})

module.exports = router;