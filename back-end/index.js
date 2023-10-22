const express = require("express")
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./Routes/router')




app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))


app.use('/api', routes)

app.get("/" , (req , res) => {
    res.send("hello")
})

app.listen(5000 ,()=>{
    console.log("Listening on port");
})
 