<?php

use Illuminate\Database\Migrations\Migration;

class CreateTableErrorLog extends Migration {

	public function up()
	{
            Schema::create('error_log', function($table)
                {
                    $table->increments('id');
                    $table->integer('code');
                    $table->string('url');
                    $table->string('user_agent');
                    $table->string('ip');
                    $table->string('host')->nullable();
		    $table->string('method')->nullable();
                    $table->text('description');
                    $table->timestamp('created_at');
                });
	}


	public function down()
	{
            Schema::drop('error_log');
	}

}
