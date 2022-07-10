#!/bin/sh

# Author : OpenMRS
#Purpose : Take a dump from the database
# Script follows here:

mysqldump -u openmrs -p openmrs > openmrs.sql;
echo "Success"
