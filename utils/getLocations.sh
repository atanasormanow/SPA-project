#!/bin/bash

# $1 input data.json file
# $2 output file to append

grep location $1 | cut -d \" -f 4 \
| xargs -I @ http https://nominatim.openstreetmap.org/search?q=Бургас,@\&format=json >> $2
