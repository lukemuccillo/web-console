var DEBUG = false;
var INTERVAL = 5000;
var SCRIPT_DIRECTORY = __dirname + '/utils/javascript/';
// Important, ensure that a trailing slash exists here.

var mod_express = require('express');
var mod_bodyParser = require('body-parser')

var express_app = mod_express();
var mod_http = require('http').Server(express_app);
var mod_io = require('socket.io')(mod_http);
var mod_path = require('path');
var mod_fs = require('fs');

var module_holder = {};

function LoadModules(path) {

    mod_fs.lstat(path, function(err, stat) {

        if (stat.isDirectory()) {

            // we have a directory: do a tree walk
            mod_fs.readdir(path, function(err, files) {
            
                var f, l = files.length;

                for (var i = 0; i < l; i++) {

                    f = mod_path.join(path, files[i]);
                    LoadModules(f);
                }
            });
        } else {
            // we have a file: load it
            console.log("Loading Module: " + path);
            require(path)(module_holder);
        }
    });
};

console.log("[+] Loading Modules in " + SCRIPT_DIRECTORY);
LoadModules(SCRIPT_DIRECTORY);

var logUrl = "http://localhost:3000/log";

var interval = setInterval(function() {

    for (var k in module_holder) {
        
        var task = module_holder[k];

        if (task.canRun()) {

            console.log("[+] Running Task: " + task.name);
            task.run(logUrl);
        }
    }   
}, INTERVAL);


express_app.set('views', __dirname + '/views');
express_app.set("view options", { layout: false });
express_app.use(mod_express.static(__dirname + '/public'));
express_app.use(mod_bodyParser.json())

express_app.get('/', function(req, res){

    res.sendfile('home.html');
});

// the log method is used to push messages
// THrough the socket
express_app.post('/log', function(req, res) {

    mod_io.emit('eventlog', req.body);
    res.send(null);
});

mod_io.on('connection', function(socket){

    console.log('[i] Received a new connection from a user');
});


mod_http.listen(3000, function() {

    console.log("[+] Server listening on *:3000");
});

