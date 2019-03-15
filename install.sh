#!/bin/bash
# Installs appcom interactive live template configuration

echo "Installing appcom interactive live templates configuration..."

TEMPLATES="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/templates"

for i in $HOME/Library/Preferences/AndroidStudio*

do
  if [[ -d $i ]]; then

    # Installing live templates
    mkdir -p $i/templates
    cp -frv "$TEMPLATES"/* $i/templates
  fi
done

echo "Done."
echo ""
echo "Restart AndroidStudio and enjoy your livetemplates"