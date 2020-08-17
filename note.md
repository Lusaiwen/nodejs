[toc]
# 数据库设计
## SQL

1. 大部分关系型数据库，拥有一致的SQL语法
2. DDL Data Definition Language  数据定义语言
    - 操控数据对象
        > 库
        > 表
        > 视图
        > 存储过程
3. DML Data Manipulation Language
    - 数据操控语言
## 管理库

- 创建数据库
    `CREATE DATABASE 名字;`
- 切换当前库
    `use 数据库名字;`
- 删除数据库
    `drop database 数据库名字;`

## 管理表
1. 创建表
    - 字段名
    - 字段类型：{
        bit:占1位,0或1，`false`或`true`
        int:32位,整数
        decimal(m,n):能精确计算的整数，M是总的位数，N位小数位数
        char(n): 固定长度位n的字符
        varchar(n): 长度最大为n的字符
        text: 大量的字符
        date: 仅日期
        datatime: 日期和时间
        time: 仅时间
        }
    - 是不是null
    - 默认值
    - 自动递增
    - 代码
    ![节点](./jietu/1.png)
    ```js
        CREATE TABLE `test`.`Untitled`  (
        `name` varchar(100) NOT NULL,
        `birthday` date NOT NULL,
        `sex` bit(255) NOT NULL DEFAULT 男,
        `id` int NOT NULL AUTO_INCREMENT
        );
    ``` 
2. 修改表
    - 上移
    ![节点](./jietu/2.png)
    ```js
    ALTER TABLE `test`.`student` 
    MODIFY COLUMN `id` int NOT NULL AUTO_INCREMENT FIRST;
    ```
3. 删除表
    - 删除表
    ```js
    drop table `test`.`student2`;
    ```
## 主键和外键
1. 主键
    - 定义：根据设计原则，每张表都要有主键

    - 主键必须满足的要求
    > 唯一 
    > 不能更改
    > 无业务含义
    - 主键中的uuid()
    ```js
    select uuid();
    ``` 
    > 全球唯一
2. 外键
    - 表与表之间关系的键

## 表关系
1. 一对一
    - 用户和用户信息
2. 一对多
    - 用户和文章
    - 班级和学生
3. 多对多
    - 购物车
## 三大设计范式
1. 数据库每一列都是不可分割的原始数据项
    - 地址
2. 非主键必须依赖与主键列
    - 与主键无关的列就不行
3. 非主键列直接依赖主键列

# 表记录的增删改（DML语言）

##  DML Data Manipulation Language - 数据操控语言

1. 增加
    - 增加一条语句
    ```js 
    INSERT INTO `student`(`name`,birthday,sex,stunum,classid)
    VALUES('陆赛文', '2000-10-13', TRUE, '5120180863', '1');
    ```
    加入`` 是因为和关键字 `name`冲突
    - 一次增加多条语句，用逗号分割。
    ```js 
    INSERT INTO `student`(`name`,birthday,sex,stunum,classid)
    VALUES('陆赛文', '2000-10-13', TRUE, '5120180863', '1'),
    ('冯', '2000-10-13', TRUE, '5120180115', '1');
    ```
2. 修改
    - 修改
    ```js
    UPDATE student SET `name`='冯成亮' WHERE id=5;
    ```
3. 删除
    ```js
    DELETE FROM student WHERE id=4;
    ```

## 单表基本查询 
1. SELECT 
    - 别名
    ```js
    SELECT sex as 性别 from `employee`;
    ```
    - *号
    ```js
    SELECT login, id, 'abc' as '额外的一列' from `employee`;
    ```
    - case
    ```js
    SELECT `name`,
    CASE ismale
	WHEN 1 THEN
		'男'
	ELSE
		'女'
    END sex,
    CASE 
        WHEN salary>=10000 THEN
            '高工资'
        WHEN salary>= 5000 THEN
            '中工资'
        ELSE
            '低工资'
    END `level`
    FROM employee;
    ```
    - distinct(去重)
    ```js
    SELECT DISTINCT location from employee;
    ```
2. from
3. where(条件)
    - =
    ```js
    SELECT * FROM employee WHERE ismale = 1;
    ```
    - in
    ```js
    SELECT * FROM department WHERE companyId in (1,2);
    ```
    - is
    ```js
    SELECT * FROM employee WHERE location is null;
    ```
    ```js
    SELECT * FROM employee WHERE location is not null;
    ```
    - 大于等于
    ```js
    SELECT * FROM employee WHERE salary >= 10000;
    ```
    - between
    ```js
    SELECT * FROM employee WHERE salary BETWEEN 10000 and 12000;
    ```
    - like
    ```js
    SELECT * FROM employee WHERE `name` LIKE '%袁%';  -- 包含袁的
    ```
    ```js
    SELECT * FROM employee WHERE `name` LIKE '袁_'; --两个字的
    ```
    - and
    ```js
    SELECT * FROM employee WHERE `name` LIKE '袁%' AND  ismale=0 and salary > 12000;
    ```
    - or and优先级高于or
    ```js
    SELECT * FROM employee WHERE `name` LIKE '袁%' or  ismale=0 or salary > 12000;
    ```
4. order by
    - 升序
    ```js
    SELECT * FROM employee WHERE `name` LIKE '袁%' AND  ismale=0 AND salary > 12000
    ORDER BY salary asc-- 升序;
    ```
    - 降序
    ```js
    SELECT * FROM employee WHERE `name` LIKE '袁%' AND  ismale=0 AND salary > 12000
    ORDER BY salary desc-- 降序;
    ```
5. limit (跳过n条数据取出m条数据)
    - 跳过两个取出3个
    ```js
    SELECT * FROM employee limit 2,3;
    ```
6. 运行顺序
    - select
    - from 
    - where
    - order by
    - limit
7. 练习
    > 登录：查询user表，得到账号为admin，密码为123456的用户
    ```js
    SELECT * from `user` WHERE loginId = 'admin' AND loginPwd=123123;
    ```
    > 查询员工表， 按照入职时间降序排序，并且使用分页查询，查询第二页，每页10条
## 联表查询
1. 全连接，笛卡尔积
    - 创建战队，主客场
    ```js
    SELECT t1.`name` 主场, t2.`name` 客场
    FROM team as t1, team as t2
    WHERE t1.id != t2.id;
    ```
2. 左连接，左外连接，left join
    ```js
    SELECT * from
    department as d left JOIN employee as e
    on d.id = e.deptId;
    ```
3. 右连接，右外连接，right join
4. 内连接 inner join
    - 查询
    ```js
    SELECT e.`name` as empname, 
    CASE e.ismale
        WHEN 1 THEN
            '男'
        ELSE
            '女'
    END sex,
    e.joinDate as 入职时间,
    e.salary as 薪水,
    d.`name` as departmentname,
    c.`name` as companyname from
    employee as e inner JOIN  department as d on e.deptId = d.id
    INNER JOIN company as c on d.companyId = c.id;
    ```
## 函数和分组
1. 内置函数
    - 数学
    ```js
    SELECT ABS(-1);
    SELECT FLOOR(4.5);  -- 向下取整
    SELECT CEILING(4.5); -- 向上取整
    SELECT MOD(10,3);
    SELECT TRUNCATE(3.1415926, 3); -- 保留几位小数
    SELECT TRUNCATE(salary, 0) from employee;

    ```
    - 聚合(单一列)
    ```js
    SELECT COUNT(id) as 员工数量,
    AVG(salary) as 平均薪资,
    SUM(salary) as 总薪资,
    MIN(salary) as 最小薪资,
    MAX(salary) as 最大薪资
    from employee;
    ```
    - 字符
    ```js
    SELECT CONCAT(`name`,salary) as 个人信息 from employee;
    ```
    - 时间
    ```js
    SELECT CURDATE();   -- 日期
    SELECT CURRENT_TIME;   -- 当前时间
    SELECT TIMESTAMPDIFF(MONTH,'2000-10-13','2010-10-13');  -- 差距时间

    SELECT 
    TIMESTAMPDIFF(YEAR,birthday,CURDATE()) as age
    from employee
    ORDER BY age ASC;
    ```
2. 分组

    ```js
    SELECT location,COUNT(id) as 员工数量 from employee
    GROUP BY location;
    ```
    - mysql运行顺序
        1. from
        2. join on
        3. where
        4. group by
        5. select
        6. having
        7. order by
        8. limit

## 视图
1. 操作视图DDL
```js
SELECT e.`name` as empname, 
    CASE e.ismale
        WHEN 1 THEN
            '男'
        ELSE
            '女'
    END sex,
    e.joinDate as 入职时间,
    e.salary as 薪水,
    d.`name` as departmentname,
    c.`name` as companyname from
    employee as e inner JOIN  department as d on e.deptId = d.id
    INNER JOIN company as c on d.companyId = c.id;
    ```
```

# 数据驱动和ORM

## 安装 mysql2
    1. https://www.npmjs.com/package/mysql2#installation
## 使用 mysql2
    ```js
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection to database
    async function test() {
        //创建连接
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'lsw20001013...',
            database: 'company'
        });
        const [result] = await connection.query('SELECT * FROM company');
        console.log(result);
        connection.end();
    }
    test();
    ```
## 防止sql注入
1. 危险
    ```js
    const mysql = require('mysql2/promise');
    // create the connection to database
    async function test(id) {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'lsw20001013...',
            database: 'company',
            multipleStatements: true
            
        });
        const [result] = await connection.query(`SELECT * FROM company where id =${id}`);
        console.log(result);
        connection.end();
    }
    test(`'';insert into company(\`name\`,location,buildDate) values("北京科技大学","北京",curdate());`);
    ```
2. 解决方法
    ```js
    const mysql = require('mysql2/promise');
    // create the connection to database
    async function test(id) {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'lsw20001013...',
            database: 'company',
            multipleStatements: true
            
        });
        const sql = `SELECT * FROM company where id =?`;
        const [result] = await connection.execute(sql,[id]);
        console.log(result);
        connection.end();
    }
    test(`'';insert into company(\`name\`,location,buildDate) values("北京科技大学","北京",curdate());`);
    ```
3. 创建池


## ORM
1. 定义：对象关系映射
2. sequelize - js/ts
3. typeORM - ts

## sequeze
1. 安装
    - https://github.com/demopark/sequelize-docs-Zh-CN

## 三层架构
1. 客户端(浏览器,app,pad,小程序)
2. 服务器端逻辑验证(业务逻辑的验证): 为了业务逻辑的完整性，安全性
3. 数据库验证：为了保证数据完整性


## 数据爬取
- axios
- cheerio

## md5 加密
1. hash加密算法的一种
2. 任何一个字符串，加密为任意长度的字符串
3. 单向加密
4. 同样的源字符串加密的结果固定

## moment

## log4js


# express
## nodemon
1. npx nodemon index

## express 中间件
1. 中间件处理细节
 - 如果后续没有中间件，express发现响应没有结束，express响应404
 - 如果中间件出现错误，不会停止服务器，相当于调用next(错误对象)，寻找后续的错误处理中间件

## 常用express中间件
1. express.static()
2. express.json()
3. express.urlEncoded()

## 实现登录和认证
1. 使用cookie-parse
2. 登录成功后给予token
3. 对后续请求进行认证  - 解析cookie中的token
4. 验证token path-to-regExp

## 断点调试

## session   

