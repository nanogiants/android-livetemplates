#!/bin/bash
# Installs NanoGiants live template configuration

echo "Installing NanoGiants live templates configuration..."

TEMPLATES="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/templates"

for i in $HOME/Library/Preferences/AndroidStudio*
do
  if [[ -d $i ]]; then
    # Installing live templates
    mkdir -p $i/templates
    cp -frv "$TEMPLATES"/* $i/templates
  fi
done

IFS=$(echo -en "\n\b")
dirs="${HOME}/Library/Application Support/Google/AndroidStudio*"
for i in $dirs
do
  echo $i
  if [[ -d $i ]]; then
    # Installing live templates
    mkdir -p $i/templates
    cp -frv "$TEMPLATES"/* $i/templates
  fi
done

echo "Done."
echo ""
echo "Restart AndroidStudio and enjoy your livetemplates"