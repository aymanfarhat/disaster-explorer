/**
 * @author George Zakhour
 * @author Ayman Farhat
 *
 * A javascript API that wraps the API of APIGEE
*/

/**
 * API class, that wraps all the available APIs
 *
 * @constructor takes an object
 * @param data  data.server         location of the API server
 *              data.key            JSESSIONID cookie value
 *
 * @return all the methods (Instagram, Twitter...)
 *
 * @example
 * 
 * var API = new API({
 *     server: "http://localhost:5000/",
 *     key: "<KEY GOES HERE>"
 * });
 * API.Twitter("search/tweets.json?q=1337", function(data) {
 *      // Perform computation on data
 * });
 * API.Instagram("users/search?q=AlloGeorge", function(data) {
 *      // Perform computation on data
 * });
 *
*/
function API(data) {

    /**
     * A function that performs a JSONP request
     *
     * @param url       the url of the API
     * @param callback  the callback used to fill the data with
    */
    function json(url, callback) {
        var funcName = "json"+Math.round(10000*Math.random());
        window[funcName] = function(data) {
            callback(data);
        }
        var script = document.createElement("script");
        script.src = url+"?callback="+funcName;
        document.body.appendChild(script);
    }

    /**
     * A function that generates the URL to send the
     * request to
     *
     * @param data      an Object similar to the one given to API()
     * @param service   the service of the API
     * @param provider  the network's name
     *
     * @return String   the URL of the location of the API
    */
    function construct_url(data, service, provider) {
        return data.server+data.key+"/"+provider+"/"+encodeURIComponent(service);
    }

    // Set up the default values and check if the values given are
    // ok or not
    if(typeof data != "object") {
        if(typeof data === "string") {
            var m    = {};
            m.server = data;
            m.key    = "NA";
        } else {
            data        = {};
            data.server = "http://localhost:5000/";
            data.key    = "NA";
        }
    } else {
        if (typeof data.server === "undefined")
            data.server = "http://localhost:5000/";
        if (typeof data.key === "undefined")
            data.key    = "NA";
    }

    // Append the / if it does not exist
    if(data.server.charAt(data.server.length-1) != '/')
        data.server += '/';

    /* fill the methods of the class API */
    return {
        Twitter: function(service, callback) {
            var url = construct_url(data, service, "twitter");
            json(url, function(data) { callback(data); });
        },
        Instagram: function(service, callback) {
            var url = construct_url(data, service, "instagram");
            json(url, function(data) { callback(data); });
        },
        Github: function(service, callback) {
            var url = construct_url(data, service, "github");
            json(url, function(data) { callback(data); });
        },
        Foursquare: function(service, callback) {
            var url = construct_url(data, service, "foursquare");
            json(url, function(data) { callback(data); });
        },
        Youtube: function(service, callback) {
            var url = construct_url(data, service, "youtube");
            json(url, function(data) { callback(data); });
        },
        SoundCloud: function(service, callback) {
            var url = construct_url(data, service, "soundCloud");
            json(url, function(data) { callback(data); });
        },
        Flickr: function(service, callback) {
            var url = construct_url(data, service, "flickr");
            json(url, function(data) { callback(data); });
        }
    }
    
}
