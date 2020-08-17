const express = require("express")
const router = express.Router();
const multer = require("multer")
const path = require("path")
const jimp = require("jimp");
const { async } = require("validate.js");

async function water(originPath, waterPath, targetPath, proportion = 10, marginProportion = 0.05) {
    const [water, origin] = await Promise.all([
        jimp.read(waterPath),
        jimp.read(originPath)
    ])

    // 水印图片缩放
    const curProportion = origin.bitmap.width / water.bitmap.width; 
    water.scale(curProportion / proportion);


    //计算位置
    const right = origin.bitmap.width * marginProportion;
    const bottom = origin.bitmap.height * marginProportion;
    const x = origin.bitmap.width - water.bitmap.width - right;
    const y = origin.bitmap.height - water.bitmap.height - bottom;

    origin.composite(water,x, y, {
        mode: jimp.BLEND_SOURCE_OVER,
        opacitySource: 0.5,
    });
    await origin.write(targetPath);
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/origin"))
    },
    filename: function (req, file, cb) {
        const timeStamp = Date.now();
        const randomStr = Math.random().toString(36).slice(-6);
        const ext = path.extname(file.originalname);
        const filename = `${timeStamp}-${randomStr}${ext}`
        cb(null, filename)
    }
})

const upload = multer({
    storage,
    limits: {
        // fileSize: 100 * 1024
    },
    fileFilter (req, file, cb) {
        const whiteList = [".jpg", ".gif", ".png", ".jpeg"];
        const ext = path.extname(file.originalname);
        if(whiteList.includes(ext.toLowerCase())){
            cb(null, true);
        }else {
            cb(new Error(`your ext name of ${ext} is not support`))
        }
      
      }
})



router.post("/", upload.single("img"),async (req, res) => {
    const url = `/upload/${req.file.filename}`;
    const waterPath = path.resolve(__dirname, "../../public/img/water.jpg")
    //加水印
    const targetPath = path.resolve(__dirname, "../../public/upload", req.file.filename)
    await water(req.file.path, waterPath, targetPath);
    
    res.send({
        code: 0,
        msg: "",
        data: url
    })
})

module.exports = router;