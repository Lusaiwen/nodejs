const path = require('path');
const fs = require('fs');

const fileName = path.resolve(__dirname, './myfile/1.txt');

class File {
    constructor(filename, name, ext, isFile, size, createTime, updateTime) {
        this.filename = filename;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
    async getContent(isBuffer = false) {
        if(this.isFile){
            if(isBuffer){
                return await fs.promises.readFile(this.filename);
            }else {
                return await fs.promises.readFile(this.filename, 'utf-8');
            }
        }
        return null;
    }
    async getChildren(){
        if(this.isFile){
            return [];
        }
        const filename = path.resolve(this.filename);
        let children = await fs.promises.readdir(filename);
        children =  children.map(name => {
            const result = path.resolve(this.filename, name);
            return File.getFile(result);
        })
        return Promise.all(children);
    }
    static async getFile(filename){
        const name = path.basename(filename);
        const ext = path.extname(filename);
        const stat = await fs.promises.stat(filename);
        const isFile = stat.isFile();
        const size = stat.size;
        const createTime = new Date(stat.birthtime);
        const updateTime = new Date(stat.mtime);
        return new File(filename, name, ext, isFile, size, createTime, updateTime);
    }
}
async function test(){
    const filename = path.resolve(__dirname, './myfile');
    const file = await File.getFile(filename);
    console.log(file);
    console.log(await file.getChildren());
}





// async function test(){
//     const result = await exits(fileName);
//     console.log(result);
// }

test();