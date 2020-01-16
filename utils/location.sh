#!/bin/bash

grep location data.json | cut -d \" -f 4 \
| xargs -I @ http https://nominatim.openstreetmap.org/search?q=Бургас,@\&format=json >> results.txt
