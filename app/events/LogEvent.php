<?php

/**
 * LogEvent.php
 * Use this file to listen to certain events and do stuff 
 *
 * @author Sebastiano Mariani <mariani.sebastiano@gmail.com>
 */

/**
 * save the error into database
 * @param type $code //http code
 */
function logError($code, $error){
     DB::connection('mysql')->table('error_log')->insert(
            array(
                'code' => $code,                
                'url' => URL::full(), 
		'host' => parse_url(Request::root())['host'],
		'method' => Request::method(),
                'description' => $error,
                'user_agent' => Helper::getUA(),
                'ip' => Helper::getIp(),
                'created_at' => new DateTime('now')
                )
        );
}

//log 404 errors
Event::listen('404', function($error)
{
    logError('404', $error); 
});

//log 500 errors
Event::listen('500', function($error)
{
    logError('500', $error);
});


