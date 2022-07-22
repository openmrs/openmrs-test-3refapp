#!/bin/sh

# Author : OpenMRS
# Purpose : Take a dump from the database and restore the databse
# Script follows here:

DUMP="openmrs.sql"

if [ -f "$DUMP" ]; then
    echo "$DUMP exists."
    mysql -h localhost -P 3306 --protocol=tcp -u openmrs -popenmrs openmrs < openmrs.sql
    echo "Database restore successful"
else
    echo "$DUMP does not exist."
    mysqldump --no-tablespaces --column-statistics=0 -h localhost -P 3306 --protocol=tcp -u openmrs -popenmrs openmrs > openmrs.sql
    echo "Database dump successful"
fi
