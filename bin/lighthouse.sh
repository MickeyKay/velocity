#!/bin/bash

TESTS_DIR=./tests

echo "Enter URLs you wish to test separated by spaces:"
read -a urls

mkdir -p $TESTS_DIR

for url in "${urls[@]}"
do
	file="${TESTS_DIR}/$(date +"%y-%m-%d-%H-%M-%S").html"

	echo "Running lighthouse test for $url. . ."
	if lighthouse --output html --output-path=$file --quiet $url; then
		echo "Results saved to ${file}"
	else
		echo "Test failed :("
	fi

done
