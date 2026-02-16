const express=require('express');
const router=express.Router();
const grades=require('../models/grades_model');

//student can check their own grades
router.get('/owngrades/:uname',function(request, response){
    if(request.params.uname != request.user.username){
        return response.status(403).json("You can check only your own grades");
    }
    grades.getMyGrades(request.params.uname, function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

router.get('/', function(request,response){
    if(request.user.role != 'admin' && request.user.role != 'teacher'){
        return response.status(403).json("You are not allowed to add grades");
    }
    grades.getAll(function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

router.get('/:c',function(request, response){
    if(request.user.role != 'admin' && request.user.role != 'teacher'){
        return response.status(403).json("You are not allowed to add grades");
    }
    grades.getOne(request.params.c, function(err, result){
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
        return response.status(403).json("You are not allowed to add grades");
    }
    grades.add(request.body, function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

router.put('/:id', function(request, response){
    if(request.user.role != 'admin' && request.user.role != 'teacher'){
        return response.status(403).json("You are not allowed to add grades");
    }
    grades.update(request.body, request.params.id, function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

router.patch('/:id',function(request, response){
        if(request.user.role != 'admin' && request.user.role != 'teacher'){
        return response.status(403).json("You are not allowed to update grades");
    }
    grades.updateGrade(request.body, request.params.id, function(err, result){
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
        return response.status(403).json("You are not allowed to add grades");
    }
    grades.delete(request.params.c, function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

module.exports=router;