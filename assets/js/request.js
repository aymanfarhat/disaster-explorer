/** Simple request object for abstracting all XMLHttpRequests **/
function request(params){
    var dataObj = params.dataObj;
    var xhr = new XMLHttpRequest();

    xhr.open(params.type, params.url,params.async);

    if(typeof params.contentType !== "undefined")
        xhr.setRequestHeader("Content-Type", params.contentType);

    xhr.onload = function(e){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                params.success(JSON.parse(xhr.responseText));
            }
        }
    }

    xhr.onerror = function(e){
        params.error(xhr.statusText);
    }

    this.send = function(){ 
        var data_str = null;

        if(typeof dataObj !== "undefined")
            data_str = JSON.stringify(dataObj);

        xhr.send(data_str); 
    };
}
