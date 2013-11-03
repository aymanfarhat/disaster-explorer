// Initialize the variable holding all raw data
var data = null;

// Fetch the data 
$("#data-loader").css("display","block");

$.getJSON("data/disasters.json",function(in_data){
  data = in_data;

  processRawData("#types-select");
  drawRegionsMap([]);

  // Remove the loader
  $("#data-loader").css("display","none");
 });

// Initialize the map
google.load('visualization', '1', {'packages': ['geochart']});

/** Events **/

// Refresh the options
$("#options-form").submit(function(){
    var formObj = {};

    $.each($(this).serializeArray(), function(_, v){
        formObj[v.name] = v.value;
    });

    if(formObj.from.length > 0 && formObj.to.length > 0 && formObj.type.length > 0){
        $("#form-loader").css("display","block");

        getMapDataByCriteria(formObj, function(map_data){
            drawRegionsMap(map_data);
            $("#form-loader").css("display","none");
        });
    }
    else{
        alert("Invalid input");
    }

    return false;
});

/** Utility functions **/

// Draw the map
function drawRegionsMap(countries) {
    countries.unshift(['Country', 'Death Toll']);
    var data = google.visualization.arrayToDataTable(countries);

    var options = {backgroundColor:"#121417",
                    colorAxis: {colors:['#FCDCDC','#FC0000']} };

    var chart = new google.visualization.GeoChart(document.getElementById('the_map'));
    chart.draw(data, options);
};

// Get all the data that match the criteria, formatted to be thrown into the map
// Naive linear search to compare criteria against all records
function getMapDataByCriteria(criteria, callback){
    var results = {};

    var criteria_start = fieldStringDateToDate(criteria.from).getTime();
    var criteria_end = fieldStringDateToDate(criteria.to).getTime();
    
    // Iterate over all disasters and check if they match criteria
    $.each(data, function(index, disaster){
        if(criteria.type == disaster.type && disaster.start >= criteria_start && disaster.end <= criteria_end){
            if(typeof results[disaster.country] === "undefined"){
                results[disaster.country] = disaster.kills;
            }
            else{
                results[disaster.country] += disaster.kills;
            }
        }
    });
    
    // Convert the object to an array of arrays
    var map_data = [];
    for(var key in results){
        if(results.hasOwnProperty(key)){
            map_data.push([key,results[key]]);
        }
    }

    callback.call(null, map_data);
}

// Format all the object data and fill the types menu
function processRawData(elStr){
    var types_list = [];
    var select = $(elStr);
    
    $.each(data, function(index, disaster){
        var type = disaster.type.toLowerCase();
        var start = stringToDate(disaster.start).getTime();
        var end = stringToDate(disaster.end).getTime();
        var kills =  (typeof disaster.killed === "string" && disaster.killed !== "null")?parseInt(disaster.killed):0;

        // Set the formatted data 
        data[index].type = type;
        data[index].start = start;
        data[index].end = end;
        data[index].kills = kills;

        // Fill the type menu
        if(types_list.indexOf(type) == -1){
            types_list.push(type);
            select.append("<option value='"+type+"'>"+type+"</option>");
        }
    });
}

// Populate subtype list with values
function fillTypes(elStr){
    var types_list = [];
    var select = $(elStr);
    
    $.each(data, function(index, disaster){
        var type = disaster.type.toLowerCase();
        if(types_list.indexOf(type) == -1){
            types_list.push(type);
            select.append("<option value='"+type+"'>"+type+"</option>");
        }
    });
}

// Convert string to date js object
// Convert the day/month/year format to year/month/day
function stringToDate(str_date){
    if(str_date.indexOf("-") > -1){
        arr_date = str_date.split("-");
    }
    else if(str_date.indexOf("/") > -1){
        arr_date = str_date.split("/");
    }

    return new Date(parseInt(arr_date[2]),parseInt(arr_date[1]),parseInt(arr_date[0]));
}

// Convert the HTML5 fields string to date object without altering format
function fieldStringDateToDate(str_date){
    arr_date = str_date.split("-"); 
    return new Date(parseInt(arr_date[0]),parseInt(arr_date[1]),parseInt(arr_date[2]));
}
