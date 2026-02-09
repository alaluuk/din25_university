const db=require('../database');
const bcrypt=require('bcryptjs');
const saltrounds=12;

const users={
    getAll(callback){
        return db.query("SELECT * FROM users",callback);

    },
    getOne(uname, callback){
        return db.query("SELECT * FROM users WHERE username=?",[uname], callback);
    },
    addUser(newUser, callback){
        bcrypt.hash(newUser.password, saltrounds, function(err, hashedPassword){
            if(err){
                return err;
            }
            else {
                return db.query("INSERT INTO users VALUES(?,?,?,?,?,?)",[newUser.username, newUser.fname, newUser.lname, newUser.email, newUser.role, hashedPassword],callback);
            }

        });
    },
    editUser(uname, newData, callback){
        bcrypt.hash(newData.password, saltrounds, function(err, hashedPassword){
            if(err){
                return err;
            }
            else {
                return db.query("UPDATE users SET fname=?, lname=?, email=?,role=?,password=? WHERE username=?",[newData.fname, newData.lname, newData.email, newData.role, hashedPassword, uname],callback);
            }
        });
    },
    checkPassword(uname, callback){
        return db.query("SELECT password, role FROM users WHERE username=?",[uname],callback);
    }
}

module.exports=users;