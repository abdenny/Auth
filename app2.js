let express = require('express');
let app = express();
let sessions = require('express-session');
let cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(
  sessions({
    secret: 'my puppy',
    cookie: { secure: false }
  })
);

app.get('/', (req, res) => {
  req.session.testGreeting = 'hello world';
  res.send('testing');
});

app.get('/test', (req, res) => {
  res.send(req.session.testGreeting);
});

app.listen(3001, () => {
  console.log('listening on 3001');
});
