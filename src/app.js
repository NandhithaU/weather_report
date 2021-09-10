const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();


//Define Path for express config
const publicDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials' );


// setup static directory to serve
app.use(express.static(publicDirPath));
app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialPath);

app.use(bodyParser.urlencoded({ extended: false }))
// parse application json
app.use(bodyParser.json())

app.get("/home", function(req, res){
    res.render("home", {
        title: "Weather",
        createdBy: "Nandhitha"
    })
})

app.get("/about", function(req, res){
    res.render("about",{
        title: "About",
        createdBy: "Nandhitha"
    })
})

app.get("/help", function(req, res){
    res.render("help",{
        title: "Help",
        createdBy: "Nandhitha"
    })
})

app.get("/weather", function(req, res){
    geocode(req.query.city, function(error, geocodeResult){
        if(error){
            res.status(500).send(error);
            return;
        }
        console.log(geocodeResult);
        
        forecast(geocodeResult, function(error, forecastResult){
            if(error){
                res.status(500).send(error);
                return;
            }
            // res.status(200)
            res.status(200).send(`The weather of given city ${forecastResult}` )
        })
    })
})


app.get("", function(req, res){
    res.render("login")
})

app.get("/register", function(req, res){
    res.render("register")
})

app.get("/*", function(req, res){
    res.render("404")
})

app.listen(4000, function(){
    console.log("The server runs at port 4000")
})