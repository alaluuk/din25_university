const db=require('../database');

const enrollments={
    enroll_to_course(id, username,callback){
        return db.query("INSERT INTO course_enrollments(id_course_offering,student_username) VALUES(?,?)",
        [
            id,
            username
        ],callback);
    },
    show_enrollments(course_code, callback){
        return db.query("SELECT username, concat(fname, ' ', lname) as student,name as course_name FROM users INNER JOIN course_enrollments ON users.username=course_enrollments.student_username INNER JOIN course_offering ON course_offering.idcourse_offering=id_course_offering=course_enrollments.id_course_offering INNER JOIN courses ON courses.course_code=course_offering.course_code WHERE id_course_offering=?",[course_code],callback)
    }
}

module.exports=enrollments;