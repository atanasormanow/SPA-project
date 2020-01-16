import leaflet, { marker } from 'leaflet';
import * as data from '../static/data.json';
import * as locations from '../static/locations.json';

var map = leaflet.map('mapid').setView([42.698334, 23.318841], 13);

leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function main() {
  let zipped: Array<any> = [];
  for (let i in data) {
    zipped.push([data[i], locations[i]]);
  }

  const filtered: Array<any> =
    zipped
      .filter(([_, l]) => l.length)
      .map(([d, l]) => [d, l[0]]);

  const pin = leaflet.icon({iconUrl: 'https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-2/512/map_marker_base-256.png',
    iconSize:     [50, 50], // size of the icon
  });
  filtered
    .forEach(([d, l]: Array<any>) => marker([l.lat, l.lon], {icon: pin})
      .addTo(map)
      .bindPopup('asdf')
      .openPopup());
}

main();
