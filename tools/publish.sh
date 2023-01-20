#!/bin/bash

# Version bump on the main package.json
echo ''
echo '> Version bump (patch)'
yarn version --patch
echo ''

# Copy package.json
echo ''
echo '> Copying package.json'
cp package.json ./dist/.build/package.json
echo ''

# Updating package.json
echo ''
echo '> Updating package.json'
node ./tools/update_package.js
echo ''

# Copying .npmrc
echo ''
echo '> Copying .npmrc'
cp .npmrc ./dist/.build/.npmrc
echo ".npmrc" >> ./dist/.build/.npmignore

# Publishing the package
echo ''
echo '> Publishing...'
cd dist/.build && yarn deploy -f
echo ''