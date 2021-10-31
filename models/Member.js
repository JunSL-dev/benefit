const promise = require('promise')
const db = require('./dbConnect')

const sql = "CREATE TABLE IF NOT EXISTS Member("+
                "id int(11) not null primary key auto_increment,"+
                "name varchar(45) not null,"+
                "userId varchar(45) not null,"+
                "password varchar(100) not null,"+
                "age varchar(45) not null,"+
                "address varchar(45) not null,"+
                "sex varchar(45) not null,"+
                "ect1 varchar(45),"+
                "ect2 varchar(45),"+
                "house varchar(45)"+
                ")"

const TABLE = "Member"

db.query(sql, (err, result)=>{
    if (err) throw err
    console.log("Member table created")
})

let Member = {
    create:(info)=>{
        return new Promise((resolve,reject)=>{
            let sql = `INSERT INTO ${TABLE}(name, userId, password, age, address, sex, ect1, ect2, house) Values('${info.name}', '${info.userId}', '${info.password}', '${info.age}', '${info.address}', '${info.sex}', '${info.ect1}', '${info.ect2}', '${info.house}')`
    
            db.query(sql,(err, result)=>{
                if(err)  reject(err)
                resolve(result)
            })
        })    
    },

    select:(info)=>{
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${TABLE} WHERE userId = '${info.userId}' and password = '${info.password}'`
    
            db.query(sql, (err,result)=>{
                if(err) reject(err)
    
                resolve(result)
            })
        })
    },
    getName:(info)=>{
        return new Promise((resolve, reject) => {
            let sql = `SELECT name From ${TABLE} WHERE userId = '${info.userId}' and password ='${info.password}'`

            db.query(sql, (err, result)=>{
                if(err) reject(err)

                resolve(result)
            })
        })
    }
}

module.exports = Member