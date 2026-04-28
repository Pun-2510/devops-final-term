#!/bin/bash

OUTPUT_FILE="../ansible/inventory.ini"

echo "Generating Ansible inventory.ini file at $OUTPUT_FILE"

CLUSTER_NAME=$(terraform output -raw cluster_name)
REGION=$(terraform output -raw region)

cat <<EOF > $OUTPUT_FILE
[eks]
localhost ansible_connection=local

[eks:vars]
cluster_name=$CLUSTER_NAME
region=$REGION
EOF

echo "Inventory file generated successfully: $OUTPUT_FILE"