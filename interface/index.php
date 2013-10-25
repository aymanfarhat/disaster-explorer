<?php
require_once('settings.php');
require_once('helpers.php');
require_once('request.php');

$request = $_SERVER['REQUEST_METHOD'];

$processRequest = array("GET" => new ReflectionMethod("Request", "get"),
                        "POST" => new ReflectionMethod("Request", "post"),
                        "PUT" => new ReflectionMethod("Request", "put"),
                        "DELETE" => new ReflectionMethod("Request", "delete"));

if(isset($processRequest[$request])){
      /** Select the appropriate function to execute based on the request method **/
      $method = $processRequest[$request]; 

      /** Extract and parse all the input **/
      $args = Helpers::getRequestParameters($settings["base_name"]);
      $args["db_name"] = $settings["dbname"];
      $args["host"] = $settings["host"];
      $args["collection"] = $settings["collection"];

      if(isset($_GET["collection"]))
        $args["collection"] = $_GET["collection"];
      if(isset($_GET["db_name"]))
        $args["db_name"] = $_GET["db_name"];

      /** And away we go... **/
      $request = new Request($args);

      $output = $method->invoke($request);
      
      Helpers::jsonResponse(json_encode($output));
}
else{
    Helpers::jsonResponse("Unknown request type");
}
?>
