const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
    const query=req.body.cityName;
    const apiKey="fec89a9d83efa7f9c790f3015e855075";
    const unit="metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey +"&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            
            const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp;
            const description=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
            res.write("<h2>The weather is currently "+description+".</h2>");
            res.write("<img src="+imageURL+">");
            res.send();
        })
    })

})



app.listen(3000, function(){
    console.log("Server has started.");
});