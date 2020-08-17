//处理错误的中间件
const sendMsg = require("./getSendResult")
const multer = require("multer")

module.exports = (err, req, res, next) => {
    if(err instanceof multer.MulterError){
        res.status(200).send(sendMsg.getErr(err.message));
    }
    if(err){
        const errMsg =  err instanceof Error ? err.message : err;
        res.status(500).send(sendMsg.getErr(errMsg));
    }else {
        next();
    }
}