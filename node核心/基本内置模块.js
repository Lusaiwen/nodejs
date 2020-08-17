const os = require("os");
const path = require("path");
const URL = require("url");
const util = require("util");



console.log(os.EOL); //识别分隔符
console.log(os.arch());//获取cpu架构名
console.log(os.freemem());//剩余内存
console.log(os.cpus().length);
console.log(os.homedir()); //用户路径
console.log(os.hostname());//获取主机名





