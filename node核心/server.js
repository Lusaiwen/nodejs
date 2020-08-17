const http = require("http");
const url = require("url");



function handleUrl(req){
    console.log("有请求来了");
    const urlObj = url.parse(req.url);
    console.log("请求路径", urlObj);
    console.log("请求方法", req.method);
    console.log("请求头", req.headers);
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString("utf-8");
        console.log("chunk", chunk);
    })

    req.on("end", () => {
        console.log("请求体", body);
    })
}

const server = http.createServer((req, res) => {
    handleUrl(req);
    res.setHeader("a", "1");
    res.setHeader("b", '2');
    res.write("你好 !   ");
    res.end();
})

server.listen(8087);

server.on("listening", () => {
    console.log("server listening 8087");
})

