<?php

/**
 * Extend eloquent with new useful functions
 * 
 * @author Sebastiano Mariani <mariani.sebastiano@gmail.com>
 */
class BaseModel extends Eloquent{

    /**
     * Extend save function of eloquent.
     * Now the object validates itself before the save operation
     * 
     * If the models that extends BaseModel have the "rules" attribute that specify the rules to wich the model must
     * follow
     * 
     * The model can have also sn attribute "messages" that specify some custom error messages
     * @return type
     * 
     */    
    public function save(array $options = array()) {
        
        //if the model hasn't the "rules" attribute save without check anything 
        if (count(static::$rules) == 0) {
            parent::save();
            return array('response' => TRUE);
        }
        //if the model has the "messages" attribute create the validator with these messages
        if (count(static::$messages) != 0) {
            $validator = Validator::make(get_object_vars($this)['attributes'], static::$rules, static::$messages);
        } else {
            $validator = Validator::make(get_object_vars($this)['attributes'], static::$rules);
        }
        //if the validator fails return False as response and the error messages
        if ($validator->fails()) {
            return array('response' => FALSE, 'messages' => $validator->messages()->all());
        } 
        else {
            parent::save();
            return array('response' => TRUE);
        }
                    
    }

}
