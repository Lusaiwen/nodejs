const express = require("express")
const router = express.Router();
const path = require("path")

router.get("/:filename", (req, res, next) => {
    const filename = path.resolve(__dirname, "../../resoures", req.params.filename)
    res.download(filename, req.params.filename);
})







module.exports = router;