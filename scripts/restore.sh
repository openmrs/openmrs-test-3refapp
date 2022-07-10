#!/bin/sh

# Author : OpenMRS
#Purpose : Restore the clear version of database
# Script follows here:

mysql -u openmrs -p openmrs < openmrs.sql
echo "Success"
