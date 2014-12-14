<?php

/**
 * ErrorLog model 
 * 
 * @author Sebastiano Mariani <mariani.sebastiano@gmail.com>
 */
class ErrorLog extends BaseModel{

    protected $table = 'error_log';
    protected $connection = 'mysql';
    protected $primaryKey = 'id';
    //rule for the this model
    protected static $rules = array();
    //custom error messages for this model
    protected static $messages = array();
    
    /**
     * instantiate the object, set the field and try to save the 
     * object into database if it follows the rules
     * @param type $code HTTP Code
     * @param type $error Error description
     * @return type
     */
    public function saveElement($code, $error){
        $this->code = $code;                
        $this->url = URL::full();
	$this->host = parse_url(Request::root())['host'];
	$this->method = Request::method();
        $this->description = $error;
        $this->user_agent = Helper::getUA();
        $this->ip = Helper::getIp();         
        return $this->save();
    }

}
