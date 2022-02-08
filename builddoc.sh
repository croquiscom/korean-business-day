#!/bin/bash

git clone -b gh-pages `git remote get-url origin` gh-pages

./node_modules/.bin/typedoc src

cd gh-pages
git rm -rf .
mv ../docs/* .
mv ../docs/.* .
rmdir ../docs
git add --all
git commit -m 'publish documentation'
git push
cd ..

rm -rf gh-pages
