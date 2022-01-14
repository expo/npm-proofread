# proofread [![CI](https://github.com/expo/npm-proofread/actions/workflows/ci.yml/badge.svg)](https://github.com/expo/npm-proofread/actions/workflows/ci.yml)

This package prevents publishing a prerelease version of a library without an explicit dist-tag. You can still publish to `latest` -- you just need to be explicit about it with `npm publish --tag=latest`.
    
## Usage:

Install `@expo/npm-proofread` and in package.json add a "prepublishOnly" script that calls just `proofread`.
