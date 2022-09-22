const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
//----------------------------------

//necessary for parsing from post request
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req,res) { 
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    //METHOD I
    //https.get("https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=634e33791e8d31ed24c7e6a73adc202e&units=metric");
    
    //METHOD II
    const query = req.body.cityName;
    const apiKey = "634e33791e8d31ed24c7e6a73adc202e";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey + "&units=" + units;
    
    https.get(url,function(response){
        console.log(response.statusMessage);
        
    response.on("data", function(data){
        // to change data from hex to json obj
        const weatherData = JSON.parse(data);
        // JSON.stringify(obj) does the opposite

        // for fetching data and writing it in html
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const id = weatherData.weather[0].icon;
        const icon = "https://openweathermap.org/img/wn/"+id+"@2x.png";
        res.write("<h1>The temperature in " +query+ " is " + temp + " C.</h1>"+desc);
        res.write("<p><img src='" + icon + "'></p>");
        
        // to send the data from client server to browser
        res.send();
    })
});

})

//---------------------------------------------



//---------------------------------------------
app.listen(port, function(req,res)
{
    console.log("Server is working on:"+ port);
})