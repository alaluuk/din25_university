const db=require('../database');

const grades={
    getAll(callback){
        return db.query("SELECT * FROM grades",callback);
    },
    getOne(idG, callback){
        return db.query("SELECT * FROM grades WHERE id_grades=?",[idG],callback);
    },
    getMyGrades(uname, callback){
        return db.query("SELECT * FROM grades WHERE username=?",[uname],callback);
    },
    add(newG, callback){
        return db.query("INSERT INTO grades(username, course_code,grade, grade_date) VALUES(?,?,?,?)",
            [
                newG.username,
                newG.course_code,
                newG.grade,
                newG.grade_date
            ],callback);
    },
    update(newG,idG, callback){
        return db.query("UPDATE grades SET username=?, course_code=?, grade=?, grade_date=? WHERE id_grades=?",
            [
                newG.username,
                newG.course_code,
                newG.grade,
                newG.grade_date,
                idG
            ],callback);
    },
    delete(idG, callback){
        return db.query("DELETE FROM grades WHERE id_grades=?",[idG],callback);
    },
    updateGrade(new_grade, idG, callback){
        return db.query("UPDATE grades SET grade=? WHERE id_grades=?",[new_grade.grade, idG],callback);
    }
}

module.exports=grades;