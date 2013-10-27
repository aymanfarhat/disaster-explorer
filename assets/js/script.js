// Initialize the variable holding all raw data
var data = null;

// Fetch the data 
$.getJSON("data/disasters.json",function(in_data){
  data = in_data;
  fillTypes("#types-select");
  drawRegionsMap([]);
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

    //console.log(formObj);
    var map_data = getMapDataByCriteria(formObj);
    drawRegionsMap(map_data);

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
function getMapDataByCriteria(criteria){
    var results = {};

    var criteria_start = fieldStringDateToDate(criteria.from).getTime();
    var criteria_end = fieldStringDateToDate(criteria.to).getTime();
    
    // Iterate over all disasters and check if they match criteria
    $.each(data, function(index, disaster){
        var start = stringToDate(disaster.start).getTime();
        var end = stringToDate(disaster.end).getTime();
        var type = disaster.type.toLowerCase();

        if(criteria.type == type && 
           start >= criteria_start && 
           end <= criteria_end){

            var kills = (typeof disaster.killed === "string" && disaster.killed !== "null")?parseInt(disaster.killed):0;

            if(typeof results[disaster.country] === "undefined"){
                results[disaster.country] = kills;
            }
            else{
                results[disaster.country] += kills;
            }
        }
    });
    
    // Convert the object to an array of arrays
    console.log(results);
    var map_data = [];
    for(var key in results){
        if(results.hasOwnProperty(key)){
            map_data.push([key,results[key]]);
        }
    }

    return map_data;
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
