#! /bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ARTISAN="artisan";

echo -e "CTF_Tracker DEPLOY"

echo -e "COMPOSER"

composer update

composer dump-autoload

echo -e "ARTISAN INIT"

php $DIR/$ARTISAN dump-autoload

echo -e "MIGRATION"

php $DIR/$ARTISAN migrate


