const {
    getErr
} = require("./getSendResult");
const {
    pathToRegexp
} = require("path-to-regexp")
const needToken = [
    {
        method: "POST",
        path: "/api/student"
    },
    {
        method: "PUT",
        path: "/api/student/:id"
    },
    {
        method: "GET",
        path: "/api/student"
    },
    {
        method: "GET",
        path: "/api/admin/whoami"   
    }
]
const jwt = require("./jwt")

module.exports = (req, res, next) => {
    const apis = needToken.filter(ele => {
        const reg = pathToRegexp(ele.path);
        return ele.method === req.method && reg.test(req.path)
    });
    if (apis.length === 0) {
        next();
        return;
    }

    const result = jwt.verify(req);
    if(result){
        req.userId = result.id;
        next(); 
    }
    else {
        handleNonToken(req, res, next);
    }
    // console.log(req.session);
    // const userId = crypto.descrypt(token);
    // // 验证token
    // console.log(userId);
    // req.userId = userId;
    // console.log(req.session);
    // if(req.session.loginUser) {
    //     console.log("验证通过");
    //     next();
    // }else {
    //     handleNonToken(req, res, next);
    // }
}


function handleNonToken(req, res, next) {
    res.status(403).send(getErr("you don't hanve any token or authrization", 403));
}