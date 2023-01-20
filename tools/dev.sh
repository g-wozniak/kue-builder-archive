#!/bin/bash

# Copy assets from common package to local
echo ''
echo '> Copying common package assets to .local'
cp -R node_modules/@kue-space/common/assets dist/.local
echo ''

# Copy static assets
echo ''
echo '> Copying local assets to .local'
cp -R dist/assets dist/.local
echo ''

# Launching webpack
echo ''
echo '> Launching application'
yarn webpack --progress
echo ''