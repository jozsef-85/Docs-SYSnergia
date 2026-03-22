#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

./venv/bin/mkdocs build --strict --clean

# Clean previously generated public artifacts from the Nginx-served docs root
rm -f docs/index.html docs/404.html docs/sitemap.xml docs/sitemap.xml.gz
find docs -mindepth 2 -maxdepth 2 -name index.html -delete
rm -rf docs/search docs/assets/images docs/assets/javascripts docs/assets/stylesheets

# Recreate directories required by the static build
mkdir -p \
  docs/assets \
  docs/centos \
  docs/debian \
  docs/rocky \
  docs/search \
  docs/ubuntu \
  docs/windows

# Copy rendered pages and static artifacts into the directory currently served by Nginx
cp site/index.html docs/index.html
cp site/404.html docs/404.html
cp site/sitemap.xml docs/sitemap.xml
cp site/sitemap.xml.gz docs/sitemap.xml.gz
cp site/centos/index.html docs/centos/index.html
cp site/debian/index.html docs/debian/index.html
cp site/rocky/index.html docs/rocky/index.html
cp site/ubuntu/index.html docs/ubuntu/index.html
cp site/windows/index.html docs/windows/index.html
cp -a site/search/. docs/search/
mkdir -p docs/assets-build
cp -a site/assets/. docs/assets-build/

# Merge generated Material assets without disturbing source-owned docs/assets/logo.svg
mkdir -p docs/assets/images docs/assets/javascripts docs/assets/stylesheets
cp -a docs/assets-build/images/. docs/assets/images/
cp -a docs/assets-build/javascripts/. docs/assets/javascripts/
cp -a docs/assets-build/stylesheets/. docs/assets/stylesheets/
cp docs/assets-build/logo.svg docs/assets/logo.svg
rm -rf docs/assets-build
