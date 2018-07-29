#! /bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

ROOT_DIR="$(dirname "$SCRIPT_DIR")"

mkdir -p "$ROOT_DIR/tmp"

# Packaging
sam package --template-file "$ROOT_DIR/build/stack/backend_cfn_template.yaml" --output-template-file "$ROOT_DIR/tmp/serverless-output-backend.yaml" --s3-bucket hello-world-kuoxin

# Deploying To Lambda Function
sam deploy --template-file "$ROOT_DIR/tmp/serverless-output-backend.yaml" --stack-name serverless-react-example --capabilities CAPABILITY_IAM
