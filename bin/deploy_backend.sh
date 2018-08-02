#! /bin/bash

# create a bucket if the bucket does not exist
create_bucket()
{
    BUCKET_NAME=$1
    REGION=$2
    if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
        echo "Bucket $BUCKET_NAME exist."
    else
        aws s3 mb "s3://$BUCKET_NAME" --region $REGION
    fi
}


SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

ROOT_DIR="$(dirname "$SCRIPT_DIR")"

mkdir -p "$ROOT_DIR/tmp"

REGIONS=( eu-west-1 ap-southeast-1 ap-northeast-2 us-east-1 us-west-1 us-west-2 ap-northeast-1 )

for region in "${REGIONS[@]}"
do
    echo "Start deploying for region $region"
    BUCKET_NAME="serverelss-example-lambda-function-bucket-$region"
    echo "Creating bucket $BUCKET_NAME"
    create_bucket $BUCKET_NAME $region
    # Packaging
    sam package --template-file "$ROOT_DIR/build/stack/backend_cfn_template.yaml" --output-template-file "$ROOT_DIR/tmp/serverless-output-backend.yaml" --s3-bucket $BUCKET_NAME --region $region

    # Deploying To Lambda Function
    sam deploy --template-file "$ROOT_DIR/tmp/serverless-output-backend.yaml" --stack-name serverless-react-example --capabilities CAPABILITY_IAM --region $region
done
