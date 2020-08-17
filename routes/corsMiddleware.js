

module.exports = function(req, res, next) {
    
    const allowOrigins = [
        "http://127.0.0.1:5500",
        "null"
    ];



    //处理预检请求
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Headers", req.headers["access-control-request-headers"]);
        res.header("Access-Control-Allow-Method", req.headers["access-control-request-method"]); 
    }
    //处理附带凭证请求
    res.header("Access-Control-Allow-Credentials", true); 
    //处理简单请求
    if("origin" in req.headers && allowOrigins.includes(req.headers.origin)){
        res.header("access-control-allow-origin", req.headers.origin)
    }
    next();
}