// NOTE: This doesn't work...
// This is a massive fail


var mod_request = require('request');
var mod_os = require('os');


function CPUTask()
{
    this.color = "FFFFFF";
    this.name = "CPU";

    this.canRun = function() {
        return false;
    };

    this.cpuUsed = function() {
        var cpu = mod_os.cpus();

        var counter = 0;
        var total = 0;
        var free = 0;
        var sys = 0;
        var user = 0;

        cpuUsages = [];
        // We want the average of all CPU's
        // so we'll add the components and multiply them out.
        for (var i = 0; i < cpu.length ; i++) {

            counter++;
            total = parseFloat(cpu[i].times.idle) 
                + parseFloat(cpu[i].times.sys) 
                + parseFloat(cpu[i].times.user) 
                + parseFloat(cpu[i].times.irq) 
                + parseFloat(cpu[i].times.nice);

            the_sys = 100 * (parseFloat(cpu[i].times.sys)/total);
            the_free = 100 * (parseFloat(cpu[i].times.idle)/total);
            the_user = 100 * (parseFloat(cpu[i].times.user)/total);

            cpuUsages.push(the_sys + the_user);

            sys += the_sys;
            free += the_free;
            user += the_user;
        }

        var displayString = "";

        for (var i = 1; i < cpuUsages.length; i++) {

            displayString += " CPU(" + (i + 1).toString() + "): " + cpuUsages[i].toString(); 
        }

        return displayString;
    };

    this.run = function(url) {

        var options = {
            uri: url,
            method: 'POST',
            json: {
                Color: this.color, 
                Source: this.name,
                Message: this.cpuUsed()
            }
        };

        mod_request(options, function(error, res, body) {
            
            if (!error && res.statusCode == 200) {
            }
        });
    };
};


module.exports = function(module_holder) {

    var task = new CPUTask();
    module_holder[task.taskName] = task;
};

