#!/bin/sh

# Author : OpenMRS
# Purpose : Take a dump from the database and restore the databse
# Script follows here:

DUMP="openmrs.sql"

if [ -f "$DUMP" ]; then
    echo "$DUMP exists."
    mysql -h 127.0.0.1 -P 3306 -u openmrs -popenmrs openmrs < openmrs.sql
    echo "Database restore successful"
else
    echo "$DUMP does not exist."
    mysqldump -h 127.0.0.1 -P 3306 -u openmrs -popenmrs openmrs > openmrs.sql
    echo "Database dump successful"
fi
