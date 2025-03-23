const express = require('express');
const path = require('path');
const crypt = require ('bcrypt');
const collection = require('./config');

const app = express ();
//convert data to json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use EJS as the view engine 
app.set('view engine', 'ejs');
//static file 
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("login");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

//register user 
app.post('/signup', async(req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
    }
    //check if user is already exist
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("User already exist , choose diffrent username");
    }else {
        //hash the password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await crypt.hash(data.password, saltRounds);
        data.password = hashedPassword; //Replace the password with the hashed password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
});
//Login user
app.post('/login', async(req, res) => {
    try{
            const check = await collection.findOne({name: req.body.username});
            if(!check){
                res.send("Username not found");
            }
            //compare the password with the plain text 
            const isPasswordMatch = await crypt.compare(req.body.password, check.password);
            if(isPasswordMatch){
                res.send("home");
            }else {
                    res.send("Password is incorrect");
                }
        }catch{
            res.send("An error occured");
    }
    });

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port : ${port}`);
})