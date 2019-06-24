const hbs = require('hbs');
const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');


// setup express
const app = express();

//define paths for express configs
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../src/templates/views');
const partialsPath = path.join(__dirname,'../src/templates/partials');

//setup handle bars engine and views location
app.set('view engine','hbs'); 
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({"error":"Please enter an address"});
    }
    
    geocode(req.query.address, (err,coordinates)=>
    {   
        if(err)
        {
            res.send({"error": err});
        }
        else
        {
            weather(coordinates,(err,weather)=>
            {
                if(err)
                {
                    res.send({"error": err});
                }
                else
                {
                    res.send({"temp":weather.temp, "summary":weather.summary, "location" : req.query.address })
                }
            });
        }
    });
});

app.get('',(req,res)=>
{
    res.render('index',
    {
        title : "Weather App"
        ,name : "Des"
    });
})

app.get('/about',(req,res)=>
{
    res.render('about',
    {
        title : "About",
        name : "Des"
    });
})

app.get('/help',(req,res)=>
{
    res.render('help',
    {
        title: "Help",
        name : "Des",
        helpMessage : "Have you tried switching it off and on again"
    });
})

app.get('/help/*',(req,res)=>
{
    res.render('notFoundError',
    {
        title: "404: ",
        message : "Help article does not exist",
        name: "Des",
       
    });
})

app.get('*',(req,res)=>
{
    res.render('notFoundError',
    {
        title: "404: ",
        message : "Page not found",
        name: "Des",
       
    });
})

app.listen(3000, ()=>
{
    console.log("Server is running");
});

