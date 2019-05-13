const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

app.use((req, res, next) => {
    res.render('maintainence.hbs');
});

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));



app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    })
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamit', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');

    var obj = {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my first node website.'
    };

    // res.send(obj);

    res.render('home.hbs', obj)
});

app.get('/about', (req, res) => {
    // res.send('About page');

    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/bad', (req, res) => {
    var obj = {
        message: 'error loading data',
        status: 'fail'
    } 
    res.send(obj);
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
});