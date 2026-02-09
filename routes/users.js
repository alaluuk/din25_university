const express=require('express');
const router = express.Router();
const users=require('../models/users_model');

router.get('/', function(request, response){
    if(request.user.role != 'admin'){
        return response.status(403).json("You dont have priviledges");
    }
    users.getAll(function(err, result){
        if(err){
            response.send(err)
        }
        else {
            response.json(result);
        }
    })
});

router.get('/:un',function(request, response){
    if(request.params.un != request.user.username && request.user.role != 'admin'){
        return response.status(403).json("You dont have priviledges");
    }
    users.getOne(request.params.un, function(err, result){
        if(err){
            response.send(err);
        }
        else{
            response.json(result[0]);
        }
    })
});

router.post('/', function(request, response){
    if(request.user.role != 'admin'){
        return response.status(403).json("You dont have priviledges");
    }
    users.addUser(request.body, function(err, result){
        if(err){
            response.send(err);
        }
        else{
            response.json(result);
        }
    })
});

router.put('/:un', function(request, response){
    if(request.params.un != request.user.username && request.user.role != 'admin'){
        return response.status(403).json("You dont have priviledges");
    }
    users.editUser(request.params.un, request.body, function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    })
});

module.exports=router;