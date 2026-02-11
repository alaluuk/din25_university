const db=require('../database');

const courses={

    getAll(callback){
        return db.query("SELECT * FROM courses",callback);
    },
    getOne(c_code, callback){
        return db.query("SELECT * FROM courses WHERE course_code=?",[c_code],callback);
    },
    add(course, callback){
        return db.query("INSERT INTO courses VALUES(?,?,?)",
            [
                course.course_code,
                course.name,
                course.credit_points
            ], callback);
    },
    update(course,c_code,callback){
        console.log("TEST2");
        return db.query("UPDATE courses SET name=?, credit_points=? WHERE course_code=?",
            [
                course.name,
                course.credit_points,
                c_code
            ],callback);
    },
    delete(c_code, callback){
        return db.query("DELETE FROM courses WHERE course_code=?",[c_code],callback);
    }
}

module.exports=courses;

