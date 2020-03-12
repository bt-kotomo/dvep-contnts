#!/bin/bash
# Genarate build configuration
# [Require environments]
# * AWS_CF_PRIVATE_CONTENTS_URL
# * BETREND_GROUP_ID
# * BETREND_APP_ID

cat << EOS
{
    "groupId": "${BETREND_GROUP_ID}",
    "applicationId": "${BETREND_APP_ID}",
    "contents": {
        "url": "${AWS_CF_PRIVATE_CONTENTS_URL}"
    }
}
EOS
