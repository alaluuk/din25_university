const express=require('express');
const router=express.Router();
const courses=require('../models/courses_model');

router.get('/', function(request,response){
    courses.getAll(function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

router.get('/:c',function(request, response){
    courses.getOne(request.params.c, function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result[0]);
        }
    });
});

router.post('/', function(request, response){
    if(request.user.role != 'admin' && request.user.role != 'teacher'){
        return response.status(403).json("You are not allowed to add courses");
    }
    courses.add(request.body, function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

router.put('/:c', function(request, response){
    if(request.user.role != 'admin' && request.user.role != 'teacher'){
        return response.status(403).json("You are not allowed to add courses");
    }
    console.log("TEST1");
    courses.update(request.body, request.params.c, function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

router.delete('/:c', function(request, response){
    if(request.user.role != 'admin' && request.user.role != 'teacher'){
        return response.status(403).json("You are not allowed to add courses");
    }
    courses.delete(request.params.c, function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

module.exports=router;