// 使用对称加密算法   aes 128
// 128位密钥
const crypto = require("crypto");

// const secret = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
const secret = Buffer.from("nlx6czpnwtsdsi9n");

//准备一个iv，随机向量
// const iv = Buffer.from(
//     Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
// )

const iv = Buffer.from("heyll8kc8c05t5yi");

exports.encrypt = function (str) {
    const cry = crypto.createCipheriv("aes-128-cbc", secret, iv);
    let result = cry.update(str, "utf8", "hex");
    result += cry.final("hex");
    return result;
}

exports.descrypt = function (str) {
    const decry = crypto.createDecipheriv("aes-128-cbc", secret, iv);
    let result = decry.update(str, "hex", "utf-8");
    result += decry.final("utf-8");
    return result;
}

