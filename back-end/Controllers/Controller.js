// SQL SETUP
const dotenv=require("dotenv")
dotenv.config()


const mysql = require('mysql2');
const db = mysql.createPool({
    host : "localhost",
    user : "root",
    password :process.env.password,
    database : "crud_tasks"
});


const GetData = async (req, res) => {
    try {
        
    const sqlGet = "SELECT * FROM tasks_db";
    db.query(sqlGet , ( err, result ) => {
     if (err) {
        console.log("error" , err) 
     }
        res.send(result)
    })

    } catch (error) {
        res.status(500).send(" Error in Backend " ,error)
    }
}


const AddTask = async (req, res) => {
    try {
        
        
    const { headers , description , priority , date , time } = req.body;
    const image = req.file.filename
    const sqlInsert = "INSERT INTO tasks_db (headers,image ,priority,date,time,description) VALUES (? , ? , ? , ? , ? , ?) ";
    db.query(sqlInsert,[headers , image ,priority, date , time  , description ] , (error , result ) => {
        if (error) {
            console.log("error" , error)
        }
      res.send(result)
    })

    } catch (error) {
         res.status(500).send(" Error in Backend " ,error)
    }
}


const DeleteTask = async (req , res ) => {
    try {
        
        const {id} = req.params
        const sqlremove = " DELETE FROM tasks_db WHERE id = ? ";
        db.query(sqlremove , id , (error , result ) => {
            if (error) {
                console.log("error" , error)
            } 
        } )

    } catch (error) {
         res.status(500).send(" Error in Backend " ,error)
    }
}


const GetById = async (req , res ) => {
    try {
        
        const {id} = req.params
    const sqlGet = "SELECT * FROM tasks_db WHERE id = ? ";
    db.query(sqlGet, id , ( err, result ) => {
     if (err) {
        console.log("error" , err) 
     }
        res.send(result)
    })

    } catch (error) {
         res.status(500).send(" Error in Backend " ,error)
    }
}

const UpdateTask = async (req , res ) => {
    try {
  
        const { id } = req.params;
        const { headers, description, priority, date, time } = req.body;
        const image = req.file ? req.file.filename : ''; 
        const sqlUpdate = "UPDATE tasks_db SET headers = ?, description = ?, priority = ?, date = ?, time = ?, image = ? WHERE id = ?";
        const values = [headers, description, priority, date, time, image, id]; 
      
        db.query(sqlUpdate, values, (err, result) => {
          if (err) {
            console.log("error", err);
          
            res.status(500).send("Error updating task");
          } else {
            
            res.send(result);
          }
        });
        
    } catch (error) {
        res.status(500).send(" Error in Backend " ,error)
    }
}


const ViewTask = async (req, res) => {
    try {

        const {id} = req.params
    const { headers ,  description , priority , date , time } = req.body;
    const sqlView = "SELECT * FROM tasks_db WHERE id = ?";

    db.query(sqlView , id , (err , result) => {
        if (err) {
            console.log("error" , err)
        } else {
            res.send(result)
        }
    })

        
    } catch (error) {
        res.status(500).send(" Error in Backend " ,error)
    }
}


module.exports = {
    GetData,
    AddTask,
    DeleteTask,
    GetById,
    UpdateTask,
    ViewTask

}