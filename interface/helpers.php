<?php 
/** Collection of static re-usable helper functions for the application **/
class Helpers {

    /** Gets all the REST request parameters and parses them **/
    public function getRequestParameters($base){

        // And parse the parameters to be used
        $uri = $_SERVER['REQUEST_URI'];

        // Accept json body for creating resources and queries
        if(isset($_SERVER["HTTP_CONTENT_TYPE"]) && $_SERVER["HTTP_CONTENT_TYPE"] == "application/json")
        {
            // http_get_request_body() would have done it but needs installation of a PECL extension
            $body = @file_get_contents('php://input');
            $data["json"] = get_object_vars(json_decode($body));
        }

        return $data;
    }

    /** Converts a mongo iterator result to a list of associative arrays **/
    function iteratorToDocList($mongoCursor){
        $results = array();
        foreach($mongoCursor as $doc){
            $flatDoc = array();

            $objectId = $doc["_id"];

            unset($doc["_id"]);
            $flatDoc = $doc;
            $flatDoc["_id"] = $objectId->{'$id'};

            array_push($results, $flatDoc);
        }

        return $results;
    }

    /** Generates a simple JSON response to be returned to the client **/
    public function jsonResponse($content = '', $status = 200){
        header('Cache-Control: no-cache, must-revalidate');
        header('Content-type: application/json');
        echo $content;
        exit;
    }
}

