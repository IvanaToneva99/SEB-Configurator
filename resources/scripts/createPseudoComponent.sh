#!/usr/bin/env bash

if [ $# -ne 1 ]; then
  echo "Wrong number of arguments";
  exit 42;
fi

mkdir "../../$1";
touch "../../$1/$1.html"
touch "../../$1/$1.css"
touch "../../$1/$1.js"