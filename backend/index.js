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
                if (err) reject(err);
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
    
    async getUser(api_key){
        return new Promise((resolve, reject)=>{
            this.con.query("SELECT * FROM `users` where `api_key` = ?", [api_key], function (err, result, fields) {
                if (err) reject(err);
                else {
                    if(result.length == 1){    
                        resolve(result[0]);
                    } else {
                        resolve(false);
                    }
                }
              });
        });
    }
    
    async getQuestion(question_id){
        return new Promise((resolve, reject)=>{
            this.con.query("SELECT * FROM `questions` where `id` = ?", [question_id], function (err, result, fields) {
                if (err) reject(err);
                else {
                    if(result.length == 1){    
                        resolve(result[0]);
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
                if (err) reject(err);
                else resolve(true);
              });
        });
    }
    
    async createQuestion(api_key, title, description){
        // check if user exists, if they do, return false
        let result = await this.getUser(api_key);    
        if(result.length >= 1){
            return new Promise((resolve, reject)=>{resolve(false);});
        }        
        let user_id = result['id'];
        return new Promise((resolve, reject)=>{
            let api_key = Rand(32);
            this.con.query("INSERT INTO `questions` (`title`, `description`, `user_id`) VALUES (?, ?, ?)", [title, description, user_id], function (err, result, fields) {
                if (err) reject(err);
                else resolve(true);
              });
        });
    }
    
    async addCredits(api_key, credits){
        // check if user exists, if they do, return false
        let result = await this.getUser(api_key);    
        if(result.length >= 1){
            return new Promise((resolve, reject)=>{resolve(false);});
        }        
        let user_id = result['id'];
        return new Promise((resolve, reject)=>{
            let api_key = Rand(32);
            this.con.query("UPDATE `users` SET `credits` = ? WHERE `api_key` = ?", [credits, api_key], function (err, result, fields) {
                if (err) reject(err);
                else resolve(true);
              });
        });
    }
    
    async getQuestions(){
        return new Promise((resolve, reject)=>{
            this.con.query("SELECT * FROM `questions` ORDER BY id DESC", [], function (err, results, fields) {
                if (err) reject(err);
                else {
                    if(results.length >= 1){    
                        resolve(results);
                    } else {
                        resolve(false);
                    }
                }
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
    let questions = await db.getQuestions();
    res.send({
        'questions': questions,
    });
});
app.post('/api/question/get', async (req, res) => {
    let question_id = req.body.question_id;
    let result = await db.getQuestion(parseInt(question_id));
    res.send({
        'success': true,
        'question':result
    });
});
app.post('/api/question/create', async (req, res) => {
    let api_key = req.body.api_key;
    let title = req.body.title;
    let description = req.body.description;
    let result = await db.createQuestion(api_key, title, description);
    let result2 = await db.getUser(api_key);
    let result3 = await db.addCredits(api_key, result2['credits'] + 3);
    res.send({
        'success': true,
    });
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