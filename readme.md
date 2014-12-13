#Introduction

This is a website to track down the progress, achivements and interests of BullCantShit CTF Team members

It is made with:

1 - Laravel (Server Side)

2 - Mysql (Database)

3 - HTML5 + AngularJS + Less (Client Side)

#Members

- Sebastiano Mariani (Phat3)

- Fabio Gritti (degrigis)

- Lorenzo Fontana (r0rshark)

#Setup 

1. Install composer

2. Install laravel as global requirerment through composer with 

	```composer global require "laravel/installer=~1.1"```

3. Setup Apache:
	
	1. Create virtual host with

		  serverName : local.ctftracker.com

		  documentRoot : your_www_directory/CTF_Tracker/public/

	2. Make sure that your php has Mcrypt extension enabled

		  try to run: ```php artisan``` in the app folder

4. Generate key with
	
	```php artisan key generate```

	**DO THIS STEP ONLY ONCE!! (I have already done that)** 

5. Insert your hostname in the local group

	1. Go to bootstrap/start.php

	2. Insert your hostname in the array parameter of the detectEnvironment method

        3. verify that you are in the local group with 

           ```php artisan env```

6. Create in the root folder a file named .env.local.php with this structure

    ```php
    return array(
    
    	'MYSQL_USER' => '<your_username>',
    	'MYSQL_PASSWD' => '<your_password>',

    );
    ```

7. Install Bower

8. Install npm

9. run ```sudo npm install```

10. run ```bower install```

11. run ```./deploy.sh (coming soon....)```

12. Enjoy!

#How to extend the project

####Write new Css

All common files (file common for every pages) are included into a single global file called common.less, then this file is compiled and minified with less compiler and the result is copied into public/css/common.min.css file.

If you want to create a stand alone file just not include it in the common.less file, but you have to add it in the html page with this name <name_of_your_less_file>.min.css 

######Steps:

1. Write the new file .less in assets

2. Include it in the main.less file

3. launch grunt:<your_env>

####Write new Javascript

---- to be defined ( we have to decide a directory organisation for our angular project )----

