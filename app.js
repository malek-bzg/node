require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

   
var usersRouter = require('./routes/users');
var prodsRouter = require('./routes/prods');
//var produitRouter = require('./routes/produit');
//var societeRouter = require('./routes/societe');
//var fournisseurRouter = require('./routes/fournisseur')
var factureRouter = require('./routes/facture');
//var stockRouter = require('./routes/stocks');
var commandesRouter = require('./routes/commandes');
//var authentificationRouter = require('./routes/authentification')


var app = express();
//*************************   swag */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require("body-parser"),

 swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/******************************** */

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//connection to data base
mongoose.connect('mongodb+srv://admin:melek123@peddler.orfuh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DataBase"));
//*************   public folder  *************** */

app.use('/upload', express.static(path.join(__dirname, 'upload')))

/**************** */

app.use('/prod', prodsRouter);
app.use('/users', usersRouter);

//app.use('/produit', produitRouter);
//app.use('/societe', societeRouter);
//app.use('/fournisseur', fournisseurRouter);
app.use('/facture', factureRouter);
//app.use('/stock', stockRouter);
app.use('/commandes', commandesRouter);
//app.use('/authentification', authentificationRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
res.json({
  message : err.message,
error : req.app.get('env') === 'development' ? err : {}


})

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;

app.listen(3000, () => console.log('Server Strated'));
