#!/bin/bash
echo "Building API image"
docker build -t api-int:1.0.0 --compress  .
