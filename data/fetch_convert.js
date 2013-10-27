var fs = require('fs');
var http = require('http');
var querystring = require('querystring');
var cheerio = require("cheerio");

// Load the parameters to be sent with the http request
var file = __dirname + '/params.json';

fs.readFile(file, 'utf8', function (err, params) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    params_data = JSON.parse(params);
     
    // Make the request and fetch the output html
    var post_data = querystring.stringify(params_data);

    var post_options = {
        host:'www.emdat.be',
        path:'/search-details-disaster-list',
        port:80,
        method:'POST',
        headers:{
            'Content-Length': post_data.length,
            'Connection':'keep-alive',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    
    // Issue the request
    responseChunks = [];

    var request = http.request(post_options, function(res){
        res.setEncoding('utf8'); 

        res.on('data', function(chunk){
            responseChunks.push(chunk);
        });

        res.on("end", function(){
            // Get the full body and process the html 
            var html_body = responseChunks.join('');
            $ = cheerio.load(html_body);
            
            var disasters = [];

            // Iterate through the rows and create objects to be pushed
            $("#sortableTable100").find("tbody tr").each(function(index, tr){
                var row = $(this).children();
                var cols = ["start", "end", "country", "location", "type", "subType", "name", "killed", "affected", "damage"];
                
                // Build a new object
                var rowObj = {};
                cols.forEach(function(column, index, array){
                   var el = row[index].children[0];

                   if(typeof  el !== "undefined" && el.data != "&nbsp;")
                      rowObj[column] = el.data;
                   else
                      rowObj[column] = null;
                });

                disasters.push(rowObj);
            });
            
            // Write JSON to file
            var disasters_json = JSON.stringify(disasters);
            
            fs.writeFile("disasters.json",disasters_json, function(err){
                if(err){
                    console.log(err);
                }
                else {
                    console.log("Saved to disasters.json");
                }
            });
        });
    });

    request.on('error', function(err){
        console.log(err); 
    });

    request.write(post_data);
    request.end();
});

