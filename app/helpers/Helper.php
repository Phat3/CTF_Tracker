<?php

/**
 * Some useful static function
 *
 * @author Sebastiano Mariani <mariani.sebastiano@gmail.com>
 */
class Helper {
    
    /**
     * 
     * return the IP address of the user
     * @return String IP
     */
    static public function getIp() {
        if(isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
            return $_SERVER["HTTP_CF_CONNECTING_IP"];
        } else {
            return isset($_SERVER["REMOTE_ADDR"]) ? $_SERVER['REMOTE_ADDR'] : '';
        }
    }
    
    /**
     * return the User Agent of the user
     * @return String User Agent
     */
    static public function getUA() {
        return isset($_SERVER['HTTP_USER_AGENT'])?  $_SERVER['HTTP_USER_AGENT'] : '';
    }
    
    
}


