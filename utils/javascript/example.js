var mod_request = require('request');


function ExampleTask()
{
    this.color = "FFFFFF";
    this.name = "EXAMPLE";

    this.canRun = function() {
        return true;
    };

    this.run = function(url) {

        var options = {
            uri: url,
            method: 'POST',
            json: {
                Color: this.color, 
                Source: this.name,
                Message: "This is a test message"
            }
        };

        mod_request(options, function(error, res, body) {
            
            if (!error && res.statusCode == 200) {
            }
        });
    };
};


module.exports = function(module_holder) {

    var task = new ExampleTask();
    module_holder[task.name] = task;
};

