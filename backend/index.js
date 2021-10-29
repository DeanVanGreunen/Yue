// imports
const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');


const util = require('util');
const crypto = require('crypto');
const { rejects } = require('assert');

// used for api_key generation
const Rand = (len, chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => [...Array(len)].map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');

// used to hash user passwords (dont store passwords as plain text)
const SHA512Hash = (data)=>{
    let hash = crypto.createHash('sha512');
    let x = hash.update(data, 'utf-8');
    return x.digest('hex');    
};

class Database {
    con = null;
    query = null;
    constructor(){
        
    }

    setConnection(_connection) {
        this.con = _connection;
    }
    

    async check(email){
        return new Promise((resolve, reject)=>{
            this.con.query("SELECT * FROM `users` where `email` = ?", [email], function (err, result, fields) {
                if (err) reject(err);
                else resolve(result.length >= 1);
              });
        });
    }

    async login(email, password){
        return new Promise((resolve, reject)=>{
            let hashed = SHA512Hash(password);
            this.con.query("SELECT * FROM `users` where `email` = ? and `password_hash` = ?", [email, hashed], function (err, result, fields) {
                if (err) reject(false);
                else {
                    if(result.length == 1){    
                        resolve(result[0]['api_key']);
                    } else {
                        resolve(false);
                    }
                }
              });
        });
    }

    async register(email, password){
        // check if user exists, if they do, return false
        let result = await this.login(email, password);    
        if(result.length >= 1){
            return new Promise((resolve, reject)=>{resolve(false);});
        }        
        return new Promise((resolve, reject)=>{
            let hashed = SHA512Hash(password);
            let api_key = Rand(32);
            this.con.query("INSERT INTO `users` (`email`, `password_hash`, `api_key`, `credits`) VALUES (?, ?, ?, ?)", [email, hashed, api_key, 0], function (err, result, fields) {
                if (err) reject(false);
                else resolve(true);
              });
        });
    }
}

// global variables
const port = 3001;
const dbConnector = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "toor",
    database: 'test'
});
const db = new Database();

// pre-setup
db.setConnection(dbConnector);

// setup cors
app.use(cors({
    origin: '*'
}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// api routes - auth
app.post('/api/user/check', async (req, res) => {
    let email = req.body.email;
    let result = await db.check(email);
    if(result !== false){
        res.send({
            'success': true,
        });
    } else {
        res.send({
            'success': false,
        });
    }
});
app.post('/api/user/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let result = await db.login(email, password);
    if(result !== false){
        res.send({
            'success': true,
            'api_key': result
        });
    } else {
        res.send({
            'success': false,
        });
    }
});
app.post('/api/user/register', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let result = await db.register(email, password);
    if(result !== false){
        res.send({
            'success': true,
        });
    } else {
        res.send({
            'success': false,
        });
    }
});

// api routes - quesions
app.get('/api/question/list', async (req, res) => {
    res.send()
});
app.post('/api/question/get', async (req, res) => {
    res.send()
});
app.post('/api/question/create', async (req, res) => {
    res.send()
});
app.post('/api/question/edit', async (req, res) => {
    res.send()
});
app.post('/api/question/delete', async (req, res) => {
    res.send()
});

// api routes - answer
app.post('/api/answer/create', async (req, res) => {
    res.send()
});
app.post('/api/answer/edit', async (req, res) => {
    res.send()
});
app.post('/api/answer/delete', async (req, res) => {
    res.send()
});
app.post('/api/answer/mark', async (req, res) => {
    res.send()
});
    
// start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});