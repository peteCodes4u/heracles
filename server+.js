require("dotenv").config();
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 5000;

const app = express();


const sess = {
  secret: process.env.SESSIONSECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(express.static('public'));

// Add express-session and store as Express.js middleware
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// get route
app.get('/', async(req,res) =>{
  await res.sendFile(path.join(__dirname, './public/index.html'))
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`😊 App listening on port ${PORT}`));
});
