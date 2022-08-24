// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express")
const bodyParser = require("body-parser")
const Cors = require("cors");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(Cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000

app.listen(port, function(){
    console.log(`Server is running on localHost: ${port}`)
});

// Callback function to complete GET '/all'
app.get("/all", function(req,res){
    if(projectData){
        res.send(projectData);
        console.log(projectData)
    }
    else{
        res.send("Error!!!")
    }
})

app.post("/addToUrl", addData);

function addData(req, res){
    
    projectData.date = req.body.date;
    projectData.temperature = req.body.temperature;
    projectData.content = req.body.content
    
    
    res.send(projectData);
}
