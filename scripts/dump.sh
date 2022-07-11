#!/bin/sh

# Author : OpenMRS
# Purpose : Take a dump from the database and restore the databse
# Script follows here:

DUMP="openmrs.sql"

if [ -f "$DUMP" ]; then
    echo "$DUMP exists."
    mysql -u openmrs -p openmrs < openmrs.sql
      echo "Database restore successful"
else
    echo "$DUMP does not exist."
    mysqldump -u openmrs -p openmrs > openmrs.sql;
      echo "Database dump successful"
    mysql -u openmrs -p openmrs < openmrs.sql
      echo "Database restore successful"
fi
