#!/bin/bash

# Remove previous build
echo ''
echo '> Removing previous build (if exists)'
yarn rimraf ./dist/.build
echo ''

# Transpiling
echo ''
echo '> Transpiling'
yarn tsc --p tsconfig.webpack.json # use webpack to exclude tests directory in the build
echo ''

# Traverse alias paths and replace them
echo ''
echo '> Convert alias paths'
yarn tscpaths \
  -p tsconfig.json \
  -s ./src \
  -o ./dist/.build

# Copy assets from common package to build
cp -R node_modules/@kue-space/common/assets dist/.build

# Copy static assets
cp -R dist/assets dist/.build

# Building SCSS
echo ''
echo '> Translating *.scss to builder.min.css'
yarn node-sass src/styles/build.scss dist/.build/builder.min.css --output-style compressed
echo ''

# Removing unnecessary files
echo ''
echo '> Cleaning up'
rm -f ./dist/.build/index.*
rm -f ./dist/.build/*.test.*