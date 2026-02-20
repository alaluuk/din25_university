const express=require('express');
const router=express.Router();
const enrollments=require('../models/enrollment_model');

router.get('/:code', function(request, response){
    enrollments.show_enrollments(request.params.code, function(err,result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});


router.post('/', function(request, response){
    const id=request.body.id_course_offering;
    //console.log(id);
    const student_username=request.user.username;
    //console.log(student_username);
    enrollments.enroll_to_course(id,student_username, function(err, result){
        if(err){
            response.send(err);
        }
        else {
            response.json(result);
        }
    });
});

module.exports=router;