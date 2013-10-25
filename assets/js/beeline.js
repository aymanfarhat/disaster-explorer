/**
 * Beeline client object for abstracting data access to MongoDB
 * @param string db_name
 */
function BeelineClient(db_name, base_uri){
    this.db = db_name;
    this.base =  base_uri || "interface";
}

/**
 * Find document(s) in a collection
 * @param  object options
 */
BeelineClient.prototype.find = function(options){
    // Any condition object exists
    if((typeof options.condition !== "undefined") || (typeof options.sort !== "undefined")){
        // Query by sending the full condition via POST
        var sendObj = {};

        // Set the condition value
        if(typeof options.condition !== "undefined")
            sendObj.condition = options.condition;
        else
            sendObj.condition = {};

        // Set the sort if it exists
        if(typeof options.sort !== "undefined")
            sendObj.sort = options.sort;

        var req = new request({
            type: "POST",
            url: "/"+this.base+"?db_name="+this.db+"&collection="+options.collection,
            async: true,
            contentType: "application/json",
            dataObj:sendObj,
            success:options.success,
            error:options.error
        });

        req.send();
    }
    // No condition object nor object id so just get everything
    else {
        var req = new request({
            type: "GET",
            url: "/"+this.base+"?db_name="+this.db+"&collection="+options.collection,
            async: true,
            success:options.success,
            error:options.error
        });

        req.send();
    }
};

/**
 * Insert a new document into a collection
 * @param object options
 */
BeelineClient.prototype.insert = function(options){
      var req = new request({
        type:"POST",
        url: "/"+this.base+"?db_name="+this.db+"&collection="+options.collection,
        async: true,
        contentType:"application/json",
        dataObj: {"payload":options.payload},
        success:options.success,
        error:options.error
      }); 

      req.send();
};

/**
 * Update document(s) in a collection
 * @param object options
 */
BeelineClient.prototype.update = function(options){
      var req = new request({
        type:"PUT",
        url: "/"+this.base+"?db_name="+this.db+"&collection="+options.collection,
        async: true,
        contentType:"application/json",
        dataObj: {"condition":options.condition,"payload":options.payload,"multiple":options.multiple},
        success:options.success,
        error:options.error
      }); 

      req.send();
};

/**
 * Delete document(s) in a collection
 * @param object options
 */
BeelineClient.prototype.remove = function(options){
    var req = new request({
       type:"DELETE",
       url: "/"+this.base+"?db_name="+this.db+"&collection="+options.collection,
       async: true,
       contentType:"application/json",
       dataObj: {"condition":options.condition},
       success:options.success,
       error:options.error
    });

    req.send();
};
