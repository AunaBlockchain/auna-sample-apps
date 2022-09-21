#!/bin/bash
echo "Building API image"
docker build -t api-ext:1.0.0 --compress  .
