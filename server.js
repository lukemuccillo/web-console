
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser')

var io = require('socket.io')(http);

app.set('views', __dirname + '/views');
app.set("view options", { layout: false });

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

app.get('/', function(req, res){
  res.sendfile('home.html');
});

app.post('/log', function(req, res) {

	io.emit('eventlog', req.body);
    console.log(req.body);
    res.send(null);
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function() {
	console.log("Server listening on *:3000");
});

