const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const user = require('../models/users_model');
const jwt = require('jsonwebtoken');

router.post('/', 
  function(request, response) {
    if(request.body.username && request.body.password){
      const username = request.body.username;
      const password = request.body.password;
      
        user.checkPassword(username, function(dbError, dbResult) {
          if(dbError){
            response.send("db_error");
          }
          else{
            if (dbResult.length > 0) {
              bcrypt.compare(password,dbResult[0].password, function(err,compareResult) {
                if(compareResult) {
                  console.log("success");
                  const token = generateAccessToken(username, dbResult[0].role);
                  response.setHeader('Content-Type', 'application/json'); 
                  response.json({
                    success: true,
                    message: "Login OK",
                    username: username,
                    token: token
                  });
                }
                else {
                    console.log("wrong password");
                    response.json({"message":"Invalid login credentials."});
                }			
              }
              );
            }
            else{
              console.log("user does not exists");
              response.json({"message":"Invalid login credentials."});
            }
          }
          }
        );
      }
    else{
      console.log("username or password missing");
      response.json({"message":"Invalid login credentials."});
    }
  }
);

function generateAccessToken(username, role) {
  return jwt.sign({ username, role },process.env.SECRET_TOKEN, { expiresIn: '1800s' });
}

module.exports=router;