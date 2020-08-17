const path = require('path');
const fs = require('fs');


const from = path.resolve(__dirname, './temp/abc.txt');
const rs = fs.createReadStream(from, {
    encoding: 'utf-8',
    highWaterMark: 1
})
// const ws = fs.createWriteStream(from, {
//     highWaterMark: 3
// });
rs.on("data", chunk => {
    console.log("方式", chunk);
})

// const flag = ws.write('啊');
// console.log(flag);









async function method1() {
    const from = path.resolve(__dirname, './temp/abc.txt');
    const to = path.resolve(__dirname, './temp/abc2.txt');
    console.time("方式1");
    const rsResult = await fs.promises.readFile(from);
    await fs.promises.writeFile(to, rsResult);
    console.timeEnd("方式1");
    console.log("复制完成");
}

async function method2(){
    const from = path.resolve(__dirname, './temp/abc.txt');
    const to = path.resolve(__dirname, './temp/abc2.txt');
    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to);
    console.time("方式二");
    rs.on('data', chunk => {
        const flag = ws.write(chunk);
        if(!flag){
            rs.pause(); //暂停
        }
    })

    ws.on('drain', () => {
        rs.resume();
    })
    rs.on('close', () => {
        ws.end();
        console.timeEnd('方式二')
    })
}

