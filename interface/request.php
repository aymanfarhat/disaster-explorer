<?php
/** Object for processing HTTP requests of different types a
    and intefacing with mongo **/

class Request {
    private $mongo;
    private $host;
    private $db;
    private $collection;
    private $payload;
    private $condition;
    private $sort;

    public function __construct($params){
        $this->host = "mongodb://".$params['host']."/";
        $this->mongo = new MongoClient($this->host);

        $db_name = $params["db_name"];
        $this->db = $this->mongo->$db_name;

        $collection_name = $params["collection"];

        $this->collection = $this->db->$collection_name;
        
        // Set the payload to insert
        if(isset($params["json"]["payload"]))
            $this->payload = $params["json"]["payload"];
        else
            $this->payload = null;

        // Set the query condition 
        if(isset($params["json"]["condition"]))
            $this->condition = $params["json"]["condition"];
        else
            $this->condition = null;

        // If an _id is supplied in the condition and none in url use it 
        if(isset($params["json"]["condition"]->_id) && !isset($params["_id"])){
            $params["_id"] = $params["json"]["condition"]->_id;
        }

        // If an _id is supplied in the URL set a new Mongo ObjectID add it to the condition array
        if(isset($params["_id"])){
            try{
                if(!$this->condition)
                    $this->condition = new stdClass;
                
                $this->condition->_id = new MongoId($params["_id"]);
            }
            catch(Exception $e){
                // Catch exceptions when creating the object ID such as supplying an invalid string
                $this->condition->_id = new MongoId(); 
            }
        }

        // Set if the changes are to be applied on multiple records or not, by default false
        if(isset($params["json"]["multiple"]) && $params["json"]["multiple"])
            $this->multiple = true;
        else
            $this->multiple = false;

        // Set the sorting criteria if it exists
        if(isset($params["json"]["sort"]))
           $this->sort = $params["json"]["sort"];
        else
            $this->sort = null;
    }

    public function get(){
        // Find document by Mongo ID within the condition
        if($this->condition){
            $cursor = $this->collection->find($this->condition);
        }
        // Get all documents
        else{
            $cursor = $this->collection->find();
        }

        $data = Helpers::iteratorToDocList($cursor);

        return $data;
    }
    
    public function post(){
        /** If a condition is supplied do a search **/
        if($this->condition){
            try{
                $cursor = $this->collection->find($this->condition);

                if($this->sort)
                    $cursor->sort($this->sort);

                $reply = Helpers::iteratorToDocList($cursor);
            } 
            catch(Exception $e){
                $msg = $e->getMessage();
                $reply = array("status"=>"err", "message"=>$msg);
            }
        }
        /** If not just insert a new document **/
        else{
            $doc = $this->payload;
            try{
                $this->collection->insert($doc);
                $reply = array("status"=>"ok","_id" =>  $doc->_id->{'$id'});
            }
            catch(Exception $e){
                $msg = $e->getMessage();
                $reply = array("status"=>"err", "message"=>$msg);
            }
        }
        return $reply;
    }

    public function put(){
        if($this->condition){
            $data = array('$set' => $this->payload);
            $opt = array("multiple" => $this->multiple);

            try{
                // Update the collection
                $query = $this->collection->update($this->condition, $data, $opt);

                // Get the updated documents to return them
                $updated_docs_cursor = $this->collection->find($this->condition);
                $updated_docs = Helpers::iteratorToDocList($updated_docs_cursor);

                $reply = array("status"=>"ok", 
                                "message"=>"Document(s) updated",
                                "count"=>$query["n"],
                                "data"=>$updated_docs);
            }
            catch(Exception $e){
                $msg = $e->getMessage();
                $reply = array("status"=>"err", "message"=>$msg);
            }
        }
        else{
            $reply = array("status"=>"err", "message"=>"Empty condition");
        }

        return $reply;
    }

    public function delete(){
        if($this->condition){
            $query = $this->collection->remove($this->condition);
            $reply = array("status"=>"ok", "message"=>"Document(s) removed","count"=>$query["n"]);
        }
        else{
            $reply = array("status"=>"err", "message"=>"Empty condition");
        }

        return $reply;
    }
}
