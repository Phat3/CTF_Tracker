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

function LogError($code, $error){
    $log = new ErrorLog;
    $log->saveElement($code, $error);      
}

//log 404 errors
Event::listen('404', function($error)
{
    LogError('404', $error);
});

//log 500 errors
Event::listen('500', function($error)
{
    logError('500', $error);
});


