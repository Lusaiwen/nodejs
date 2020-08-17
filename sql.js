// get the client
const mysql = require('mysql2/promise');
// create the connection to database
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'lsw20001013...',
    database: 'company',
    multipleStatements: true
});
async function test(name) {
    const sql = `SELECT * FROM employee where \`name\` like concat('%',?,'%')`;
    const [result] = await connection.execute(sql,[name]);
    console.log(result);
}
test('袁');
// simple query
// connection.query(
//   'SELECT * FROM `company`.`company`',
//   function(err, results) {
//     // err 错误信息
//     // result 查询结果
//     console.log(err);
//     console.log(results); // results contains rows returned by server
//   }
// );

//增加一条数据
// connection.query(
//     'insert into company(`name`,location,buildDate) values("西南科技大学","绵阳",curdate());',
//     function (err, result){
//         console.log(err);
//         console.log(result);
//     }
// )

//修改一条数据
// connection.query(
//     'update company set name = "科技大学" where id = 4;',
//     (err, result) => {
//         console.log(result);
//     }
// )

// connection.query(
//     'delete from company where `name`= "科技大学" ;',
//     (err, result) => {
//         console.log(result);
//     }
// )


// // with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );