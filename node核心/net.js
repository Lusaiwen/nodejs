const net = require("net");
const fs = require("fs");
const path = require("path");

//客户端
// const socket = net.createConnection({
//     host: 'duyi.ke.qq.com',
//     port: 80
// }, () => {
//     console.log("连接成功");
// })

// socket.on("data", chunk => {
//     console.log("请求的数据", chunk.toString("utf-8"));
// })

// socket.write(`GET / HTTP/1.1
// Host: duyi.ke.qq.com
// Connection: keep-alive

// `)
















//服务器
// const server = net.createServer();

// server.listen(8087);

// server.on("listening", () => {
//     console.log("server listening 8087");
// })

server.on("connection", socket => {
    console.log("服务器连接成功");
    socket.on("data", async chunk => {
        const filename = path.resolve(__dirname, './myfile/2.jpg');
        const bodyBuffer = await fs.promises.readFile(filename);
        const headBuffer = Buffer.from(`HTTP/1.1 200 OK
Content-Type: image/jpeg

`, "utf-8");
        const result = Buffer.concat([headBuffer, bodyBuffer]);
        socket.write(result);
        socket.end();
    });
    socket.on("end", () => {
        console.log("结束了");
    })
})