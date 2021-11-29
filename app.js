require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

var usersRouter = require('./routes/users');
var clientRouter = require('./routes/client');
var produitRouter = require('./routes/produit');
var societeRouter = require('./routes/societe');
var fournisseurRouter = require('./routes/fournisseur')
var factureRouter = require('./routes/facture');
var stockRouter = require('./routes/stocks');
var commandesRouter = require('./routes/commandes');
var authentificationRouter = require('./routes/authentification')


var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//connection to data base
mongoose.connect('mongodb://localhost/peddler', { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DataBase"));

app.use('/client', clientRouter);
app.use('/users', usersRouter);
app.use('/produit', produitRouter);
app.use('/societe', societeRouter);
app.use('/fournisseur', fournisseurRouter);
app.use('/facture', factureRouter);
app.use('/stock', stockRouter);
app.use('/commandes', commandesRouter);
app.use('/authentification', authentificationRouter);
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
