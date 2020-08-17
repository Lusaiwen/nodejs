const axios = require("axios").default;
const cherrio = require("cheerio");
const Book = require("../models/Book")

async function getBookHtml() {
    const resp = await axios.get("https://book.douban.com/latest?icn=index-latestbook-all");
    return resp.data;
}

async function getBookLinks() {
    const html = await getBookHtml();
    const $ = cherrio.load(html);
    const anchorArr = $("#wrapper .grid-12-12 li .cover");
    const hrefs = anchorArr.map((i, ele) => {
        const href = ele.attribs["href"];
        return href;
    }).get(); 
    return hrefs;
}
/**
 *
 *根据书籍详情页，获得书籍的相关信息
 * @param {*} detailUrl
 */
async function getBookDetail(detailUrl) {
    const resp = await axios.get(detailUrl);
    const $ = cherrio.load(resp.data);
    const name = $("h1").text().trim();
    const imgUrl = $("#mainpic .nbg img").attr("src");
    const spans = $("#info span.pl");
    const authorSpan = spans.filter((i, ele) => {
        return $(ele).text().includes("作者");
    })
    const author = authorSpan.next("a").text();

    const publishSpan = spans.filter((i, ele) => {
        return $(ele).text().includes("出版年");
    })
    const publishDate = publishSpan[0].nextSibling.nodeValue.trim();
    return {
        name,
        imgUrl,
        publishDate,
        author
    }
}

async function fetchAll() {
    const links = await getBookLinks();
    const prams = links.map(link => {
        return getBookDetail(link);
    });
    return Promise.all(prams);
}
 async function saveDataBase(){
     const books = await fetchAll();
     await Book.bulkCreate(books);
     console.log("数据添加成功");
 }


saveDataBase();
