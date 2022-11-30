const mysql= require('mysql');
const express = require('express');
const dotenv = require('dotenv');
const hbs = require('hbs');
const path = require('path');
const { register, product }  = require('./controllers/auth');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config( { path: './.env'});
const app = express();
const session = require('express-session');
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());
const port = process.env.PORT || 3001;
const userDirectory = path.join(__dirname + 'public');
app.use(express.static(userDirectory));
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use(express.json());
app.set('view engine', 'hbs');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
const db = mysql.createConnection({
    host : 'localhost',//process.env.DATABASE_HOST,
    user : 'root',//process.env.DATABASE_USER,
    password : '',//process.env.DATABASE_PASSWORD,
    database : 'node',//process.env.DATABASE,
    port: 3306
});
db.connect((error) => {
    if(error){
        throw error;
    }
    console.log('Mysql connected....');
}); 
app.get('/', (req,res)=>{
    db.query("select * from users",(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
});
app.get('/home',(req,res) =>{
    res.render('index');
});
app.get('/loggedin',(req,res) =>{
    res.render('login');
});


app.get('/registered',(req,res) =>{
    res.render('register');
});
app.get('/products',(req,res) =>{
    res.render('product');
});


app.post('/login',(req, res)=> {
    let mobile = req.body.mobile;
	let password = req.body.password;
	if (mobile && password) {
		db.query("SELECT * FROM users WHERE mobile = ? AND password = ?", [req.body.mobile, req.body.password],(error, results, fields)=> {
			if (error) throw error;
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.mobile = mobile;
				res.redirect('/products');
			} else {
				res.send('Incorrect mobile and/or password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter correct mobile and password!');
		res.end();
	}
});
app.get('/product/getall', (req,res)=>{
    db.query("SELECT * FROM product1s",(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
});

app.post('/product/insert',(req,res) =>{
    db.query( "INSERT INTO product1s (name_product, price) VALUES (?,?)",[req.body.name_product, req.body.price],(err,result)=>{
     if(err){
         throw err;
     }else{
         res.send(result);
     }
 });
});

app.put('/product/update/:id_of_product', (req,res)=>{
    //const data = [req.body.name,req.body.mobile,req.body.password,req.params.id];

    db.query("UPDATE product1s SET name_product = ?,price = ? WHERE id_of_product= ?",[req.body.price, req.body.name_product ,req.params.id_of_product],(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })
});

app.delete('/product/delete/:id_of_product', (req,res)=>{
    //const data = [req.body.name,req.body.mobile,req.body.password,req.params.id];

    db.query("DELETE FROM product1s WHERE id_of_product = ?",[req.params.id_of_product],(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })
});

app.post('/register/insert',(req,res) =>{
    db.query( "INSERT INTO users (name, mobile, password) VALUES (?,?,?)",[req.body.name,req.body.mobile,req.body.password],(err,result)=>{
     if(err){
         throw err;
     }else{
         res.send(result);
     }
    });
});
//app.post('/',(req,res) =>{
  //   console.log("Post Api working"); 
//})

app.put('/update/:id', (req,res)=>{
    //const data = [req.body.name,req.body.mobile,req.body.password,req.params.id];
    db.query("UPDATE users SET name = ?,mobile=?,password=? where id = ?",[req.body.name,req.body.mobile,req.body.password, req.params.id],(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })
});
app.delete('/delete/:id', (req,res)=>{
    //const data = [req.body.name,req.body.mobile,req.body.password,req.params.id];

    db.query("DELETE FROM users WHERE id = ?",[req.params.id],(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
});
app.listen(port, () => {
    console.log(`Server started successfully ${port}`);
});
exports.port= port;