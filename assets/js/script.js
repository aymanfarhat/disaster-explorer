// Initialize the variable holding all raw data
var data = null;

// Fetch the data 
$.getJSON("data.json",function(in_data){
  data = in_data;
  fillTypes("#types-select");
  //drawRegionsMap();
 });

// Initialize the map
google.load('visualization', '1', {'packages': ['geochart']});
//google.setOnLoadCallback(drawRegionsMap);

// Draw the map
function drawRegionsMap(countries) {
    var data = google.visualization.arrayToDataTable([
      ['Country', 'Popularity'],
      ['Germany', 200],
      ['United States', 300],
      ['Brazil', 400],
      ['Canada', 500],
      ['France', 600],
      ['RU', 700]
    ]);

    var options = {backgroundColor:"#121417",
                    colorAxis: {colors:['#FCDCDC','#FC0000']} };

    var chart = new google.visualization.GeoChart(document.getElementById('the_map'));
    chart.draw(data, options);
};


// Get all the data that match the criteria, formatted to be thrown into the map
function getMapDataByCriteria(from, to, subtype){
    var results = {};
    $.each(data, function(index, disaster){
        var start = stringToDate(disaster.start);
        var end = stringToDate(disaster.end);
    });
}

// Populate subtype list with values
function fillTypes(elStr){
    var types_list = [];
    var select = $(elStr);

    $.each(data, function(index, disaster){
        if(types_list.indexOf(disaster.type) == -1){
            types_list.push(disaster.type);
            select.append("<option>"+disaster.type+"</option>");
        }
    });
}

// Convert string to date js object
function stringToDate(str_date){
    if(str_date.indexOf("-") > -1){
        arr_date = str_date.split("-");
    }
    else if(str_date.indexOf("/") > -1){
        arr_date = str_date.split("/");
    }
    
    return new Date(parseInt(arr_date[2]),parseInt(arr_date[1]),parseInt(arr_date[0]));
}
