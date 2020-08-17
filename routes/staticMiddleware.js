
module.exports = (req, res, next) => {
    if(req.path.startsWith("/api")) {
        next();
        //说明你请求的时api接口
    }else {
        //说明你请求的是静态资源
        if(true){
            res.send("静态资源存在")
        }else {
            next();
        }
    }
}