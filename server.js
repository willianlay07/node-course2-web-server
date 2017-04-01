const express     = require('express');
const hbs         = require('hbs');     // Handlebarjs
const fs          = require('fs');

const port        = process.env.PORT || 3000;

var app           = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// Middleware
app.use((req, res, next) => {
    var now   = new Date().toString();
    var log   = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
      if(err) {
        console.log('Unable to append to server.log.');
      }
    });
    next();
});

// app.use((req, res, next) => {
//       res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
      //res.send('<h1>Hello Express!</h1>');
      // res.send({
      //       name: 'Wai',
      //       likes: [
      //         'Biking',
      //         'Reading'
      //       ]
      // });
      res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Website'
      });
});

app.get('/about', (req, res) => {
    //res.send('About Us');
    res.render('about.hbs', {
      pageTitle: 'About Page'
    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Project Page',
        porfolio: 'Porfolio here'
    });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMsg: 'Unable to browser!'
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
