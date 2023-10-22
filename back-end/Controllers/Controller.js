// SQL SETUP

const mysql = require('mysql2');
const db = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "rashid813895",
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
        
        
    const { heading , description , priority , date , time } = req.body;
    const image = req.file.filename
    const sqlInsert = "INSERT INTO tasks_db (heading,description,date,time,priority,image) VALUES (? , ? , ? , ? , ? , ?) ";
    db.query(sqlInsert,[heading , description , date , time , priority , image ] , (error , result ) => {
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
  console.log(req.params)
        const { id } = req.params;
        const { heading, description, priority, date, time } = req.body;
        const image = req.file ? req.file.filename : ''; 
        const sqlUpdate = "UPDATE tasks_db SET heading = ?, description = ?, priority = ?, date = ?, time = ?, image = ? WHERE id = ?";
        const values = [heading, description, priority, date, time, image, id]; 
      
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
    const { heading ,  description , priority , date , time } = req.body;
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