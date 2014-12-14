<?php

/**
 * Manage server's statistics and errors
 *
 * @author Sebastiano Mariani <mariani.sebastiano@gmail.com>
 */
class ApiServerController extends BaseController{
   
    public function getErrorLog(){
        return ErrorLog::orderBy('created_at', 'desc')->paginate(15);
    }
}
