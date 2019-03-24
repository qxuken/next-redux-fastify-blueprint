#!/bin/sh
if ! command_loc="$(type -p yarn)" || [[ -z $command_loc ]]; then
  install_command="npm i -g yarn"
  {
    echo "Yarn is not installed, trying to install..."
    eval ""$install_command" > /dev/null 2>&1"
  } || {
    echo "Retrying with sudo..."
    eval "sudo "$install_command" > /dev/null 2>&1"
  }
fi

yarn $@
