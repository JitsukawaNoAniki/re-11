var http = require('http');
var express = require('express');
var app = express();
require('./config/express')(app);
require('./config/passport')();
require('./config/database')('mongodb://localhost/DSWA5');
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express Server escutando na porta ' + app.get('port'));
});

const url = 'mongodb://dswa5:dswa5@clusterdswa5-shard-00-00.oqbir.mongodb.net:27017,cluster0-shard-00-01.oqbir.mongodb.net:27017,cluster0-shard-00-02.oqbir.mongodb.net:27017/ifsp?ssl=true&replicaSet=atlas-rg0np8-shard-0&authSource=admin&retryWrites=true&w=majority';
require('./config/database.js')(url);
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express Server escutando na porta ' + app.get('port'));
});