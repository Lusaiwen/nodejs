const jwt = require("jsonwebtoken")
const secret = "nlx6czpnwtsdsi9n";
const cookieKey = "token";

exports.publish = function (res, maxAge = 3600, info = {}) {
    const token = jwt.sign(info, secret, {
        expiresIn: maxAge
    })
    res.header("authorization", token);
}

exports.verify = function (req) {
    let token;
    token = req.headers.authorization;
    if (!token) {
        //没有token
        return null;
    }
    //authorization bearer token
    token = token.split(" ");
    token = token.length === 1 ? token[0] : token[1];
    try {
        const result = jwt.verify(token, secret);
        return result;
    } catch {
        return null;
    }

}