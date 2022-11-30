const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config( { path: './.env'});
exports.register = (req,res) => {
    //console.log(req.body);
    //const { name, mobile, password } = req.body;
    const db = mysql.createConnection({
        host : 'localhost',//process.env.DATABASE_HOST,
        user : 'root',//process.env.DATABASE_USER,
        password : '',//process.env.DATABASE_PASSWORD,
        database : 'node',//process.env.DATABASE,
        port: 3306
    });
    
    res.send("form submitted");
};
exports.login = (req,res) => {
    //console.log(req.body);
    //const { name, mobile, password } = req.body;
    const db = mysql.createConnection({
        host : 'localhost',//process.env.DATABASE_HOST,
        user : 'root',//process.env.DATABASE_USER,
        password : '',//process.env.DATABASE_PASSWORD,
        database : 'node',//process.env.DATABASE,
        port: 3306
});

   res.send("logged in");

};
exports.product = (req,res) => {
    //console.log(req.body);
    //const { name, mobile, password } = req.body;
    const db = mysql.createConnection({
        host : 'localhost',//process.env.DATABASE_HOST,
        user : 'root',//process.env.DATABASE_USER,
        password : '',//process.env.DATABASE_PASSWORD,
        database : 'node',//process.env.DATABASE,
        port: 3306
});
res.render('/product');
};