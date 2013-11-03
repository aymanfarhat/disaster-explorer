var explorer = {
    data: null,
    selectors: {
        dataLoader: $("#data-loader"),
        typesSelect: $("#types-select"),
        optionsForm: $("#options-form"),
        formLoader: $("#form-loader"),
        map: $("#the_map")
    },
    
    // Format all the object data and fill the types menu
    processRawData: function(){
        var types_list = [];
        
        $.each(explorer.data, function(index, disaster){
            var type = disaster.type.toLowerCase();
            var start = explorer.stringToDate(disaster.start).getTime();
            var end = explorer.stringToDate(disaster.end).getTime();
            var kills =  (typeof disaster.killed === "string" && disaster.killed !== "null")?parseInt(disaster.killed):0;

            // Set the formatted data 
           explorer.data[index].type = type;
           explorer.data[index].start = start;
           explorer.data[index].end = end;
           explorer.data[index].kills = kills;

            // Fill the type menu
            if(types_list.indexOf(type) == -1){
                types_list.push(type);
                explorer.selectors.typesSelect.append("<option value='"+type+"'>"+type+"</option>");
            }
        });
    },

    // Draw the map
    drawRegionsMap: function(countries) {
        countries.unshift(['Country', 'Death Toll']);
        var data = google.visualization.arrayToDataTable(countries);

        var options = {backgroundColor:"#121417",
                        colorAxis: {colors:['#FCDCDC','#FC0000']} };

        //var chart = new google.visualization.GeoChart(explorer.selectors.map);
        var chart = new google.visualization.GeoChart(explorer.selectors.map[0]);

        chart.draw(data, options);
    },

    // Get all the data that match the criteria, formatted to be thrown into the map
    // Naive linear search to compare criteria against all records
    getMapDataByCriteria: function(criteria, callback){
        var results = {};

        var criteria_start = explorer.fieldStringDateToDate(criteria.from).getTime();
        var criteria_end = explorer.fieldStringDateToDate(criteria.to).getTime();
        
        // Iterate over all disasters and check if they match criteria
        $.each(explorer.data, function(index, disaster){
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
    },

    // Convert string to date js object
    // Convert the day/month/year format to year/month/day
    stringToDate: function(str_date){
        if(str_date.indexOf("-") > -1){
            arr_date = str_date.split("-");
        }
        else if(str_date.indexOf("/") > -1){
            arr_date = str_date.split("/");
        }

        return new Date(parseInt(arr_date[2]),parseInt(arr_date[1]),parseInt(arr_date[0]));
    },

    // Convert the HTML5 fields string to date object without altering format
    fieldStringDateToDate: function(str_date){
        arr_date = str_date.split("-"); 
        return new Date(parseInt(arr_date[0]),parseInt(arr_date[1]),parseInt(arr_date[2]));
    },

    setDataLoader: function(stat){
        var disp = (stat)?"block":"none";
        explorer.selectors.dataLoader.css("display", disp);
    },

    setFormLoader: function(stat){
        var disp = (stat)?"block":"none";
        explorer.selectors.formLoader.css("display", disp);
    }
};

// Initialize the map
google.load('visualization', '1', {'packages': ['geochart']});

// Fetch the data 
explorer.setDataLoader(true);

$.getJSON("data/disasters.json",function(in_data){
  explorer.data = in_data;

  explorer.processRawData();
  explorer.drawRegionsMap([]);

  // Remove the loader
  explorer.setDataLoader(false);
 });


/** Events **/

// Refresh the options
explorer.selectors.optionsForm.submit(function(){
    var formObj = {};

    $.each($(this).serializeArray(), function(_, v){
        formObj[v.name] = v.value;
    });

    if(formObj.from.length > 0 && formObj.to.length > 0 && formObj.type.length > 0){
        explorer.setFormLoader(true);

        explorer.getMapDataByCriteria(formObj, function(map_data){
            explorer.drawRegionsMap(map_data);
            explorer.setFormLoader(false);
        });
    }
    else{
        alert("Invalid input");
    }

    return false;
});
