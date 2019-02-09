const express =  require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app  = express();

//For Partial view Register
hbs.registerPartials(__dirname + '/views/partials');
//For hbs view show
app.set('view engine', 'hbs');

//Middleware 
app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    
    
    fs.appendFile('server.log', log +'\n', (err) =>{
        console.log(err);
        
    });
    next();
});

// app.use((req, res, next )=>{
//     res.render('maintenance.hbs');
// });

//For file type extension support (.html, .png, .jpg etc )
app.use(express.static(__dirname + '/public'));


//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

//Helper method
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

//Helper method
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});



app.get(['/', '/home'], (req, res) =>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website.'
    });
});


app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});


app.get('/bad', (req, res) =>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
});


//For listen port
app.listen(port, () =>{
    console.log(`Server is on post ${port}`);
    
});