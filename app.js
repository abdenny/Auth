const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
let db = require('./models');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/'));
app.use(require('./routes/blogs.js'));
app.use(require('./routes/editblogs.js'));

app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let auth = (req, res, next) => {
    // if user is logged in, execute next function. Otherwise redirect user ot /login.
  };

  db.users
    .findAll({ where: { username: username } })
    .then(results => {
      if (results.length > 0) {
        //user has been found
        //test password
        //forward to
        res.redirect('/');
      } else {
        res.redirect('/registration');
      }
    })
    .catch(err => {
      res.send(err);
    });
});
app.get('/registration', (req, res) => {
  let error = req.query.error;
  let err = 'hidden';

  if (error) {
    err = 'visible';
  }
  //encrypt the password
  //add information to database

  res.render('registration', {
    error: err
  });
});
app.post('/registration', (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);

  let passwordEncrypted = bcrypt.hashSync(password, 8);
  console.log(passwordEncrypted);
  db.users
    .create({
      username: username,
      email: email,
      password: passwordEncrypted
    })
    .then(user => {
      // res.send('post registration');
      res.redirect('/login');
    })
    .catch(err => {
      res.redirect('/registration?error=visible');
    });
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
