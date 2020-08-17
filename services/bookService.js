const Book = require("../models/Book")

exports.addBook = async function (bookObj) {
    const ins = await Book.create(bookObj);
    console.log("添加书籍成功");
    return ins.toJSON();
}

exports.deleteBook = async function (bookId) {
    if (bookId) {
        Book.destroy({
            where: {
                id: bookId
            }
        })
        console.log("删除书籍成功");
        return;
    }
    console.log("删除书籍失败");
}

exports.updateBook = async function (id, bookObj) {
    if (id && bookObj) {
        Book.update(bookObj, {
            where: {
                id
            }
        })
        console.log("修改书籍成功");
        return;
    }
    console.log("修改书籍失败");
}

exports.getBookById = async function (id) {

    const result = await Book.findOne({
        where: {
            id
        }
    })
    return JSON.parse(JSON.stringify(result));
}

exports.getAllBooks = async function (page = 1, limit = 10, name = "", author = "") {
    const condition = {};
    if(name){
        condition.name = name;
    }
    if(author){
        condition.author = author;
    }
    const result = await Book.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
        where: condition
    })
    return {
        total: result.count,
        datas: JSON.parse(JSON.stringify(result.rows))
    }
}