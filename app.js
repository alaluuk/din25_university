const express=require('express');
const app=express();
const PORT=3000;
const userRouter=require('./routes/users');
const loginRouter=require('./routes/login');
const courseRouter=require('./routes/courses');
const dotenv=require('dotenv');
const jwt=require('jsonwebtoken');

app.use(express.json());

dotenv.config();
app.get('/',function(request, response){
    response.send("University API");
});

app.use('/login',loginRouter);

app.use(authenticateToken);
//protected routes
app.use('/users',userRouter);
app.use('/courses',courseRouter);


app.listen(PORT, function(){
    console.log("server is running in port: "+PORT);
});

// Middleware function that verifies JWT token and blocks unauthorized requests
function authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    // Extract token by removing "Bearer " prefix from "Bearer "
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return response.sendStatus(401);
    jwt.verify(token, process.env.SECRET_TOKEN, function(err, user) {
      if (err) {
        return res.sendStatus(403);
      }
      request.user = user;
      next();
    })
  }

module.exports=app;