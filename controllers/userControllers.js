const users   = require("../models/user.js");
const bcrypt  = require('bcrypt');
const { valid } = require("joi");

/*
Post request json file structure

    obj =  {
        "email":email,
        "password": password,
    }

*/

//You need to complete the route of user login.
//if user with given email doesnot exis return 404 status with text message as "User with this E-mail does not exist !!".
//if the password is invalid return 404 status with text message as "Invalid Password, try again !!".
//if the email ans password is correct return 200 status with particular User document that matches.
//IMP - Password are store using bcrypt hashing function in current database.
//to look the user schema look ../models/user.js


const loginUser =async (req, res) => {

    //Write youe code here.
    const email = req.body.email;
    const password = req.body.password;

    const result = await users.find({'email':email});
    if(result.length){
        if(bcrypt.compareSync(password,result[0].password)){
           res.status(200).send(result[0]);
        }
        else{
            res.status(404).send('Invalid Password, try again !!')
        }

    }
    else{
        res.status(404).send('User with this E-mail does not exist !!')
    }


}

module.exports = { loginUser };