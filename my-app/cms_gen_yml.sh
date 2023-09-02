#!/bin/bash

# Generate CMS yaml file from individual schemas
ADMIN="./public/admin"
DATA="$ADMIN/data"

# Add the general config information
cat $DATA/_backend.yml > $ADMIN/config.yml

# Add data from each yaml schema
for schema in $DATA/*; do
  if [ $schema != $DATA/_backend.yml ]
  then
    cat $schema | sed -e 's/^/  /' >> $ADMIN/config.yml
  fi
done

echo "CMS Schema Generated!"