const express = require("express")
const app = express();
const path = require("path")
const cors = require("cors")
const session = require("express-session")

//使用session
// app.use(session({
//     secret: "lusaiwen",
//     name: "sessionId"
// }))

const history = require('connect-history-api-fallback');
app.use(history());


//映射public中的静态资源
const staticRoot = path.resolve(__dirname,"../public")
app.use(express.static(staticRoot))//请求静态资源

//cors  自己写的
// app.use(require("./corsMiddleware"))
// const whiteList = ["null", "http://127.0.0.1:5500","http://127.0.0.1:6008"];
app.use(cors({
    origin(origin, callback) {
        if(!origin){
            callback(null, "*");
            return;
        }
        callback(null, origin);
    },
    optionsSuccessStatus: 200,
    credentials: true
}))


//加入 cookie-parser 中间件
//加入过后,会在req对象中注入cookies属性，用于获取所有请求传递过来的cookie
//加入之后，会在res对象中注入cookie方法，用于设置cookie
const cookieParser = require("cookie-parser");
// app.use(cookieParser("yuanjin"));//如果加密
app.use(cookieParser());

//应用token中间件
app.use(require("./tokenMiddleware"));

//解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({
    extended: true
}))

//解析 application/json 格式的请求体
app.use(express.json())

app.use(require("./apiLoggerMid"))

//处理 api 的请求
app.use("/api/admin", require("./api/admin"))
app.use("/api/student", require("./api/student"))
app.use("/api/class", require("./api/class"))
app.use("/api/book", require("./api/book"))
app.use("/api/upload", require("./api/upload"))
app.use("/res", require("./api/download"))


//处理错误的中间件
app.use(require("./errorMiddleware"))//错误处理，匹配任何请求，与get或post无关，相似匹配例news/abc


const port = 6008;
app.listen(port, () => {
    console.log(`listening in ${port}`);
})
