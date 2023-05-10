#!/bin/bash
rm -fR vendor/
rm go.sum
rm go.mod

echo "module test-go" >> go.mod
echo "go 1.17" >> go.mod
go clean -modcache
go get github.com/hyperledger/fabric@v1.4.9
go mod tidy -compat=1.17
go mod vendor
go test ./
