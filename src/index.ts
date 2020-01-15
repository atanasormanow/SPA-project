import { OpenStreetMapProvider } from 'leaflet-geosearch';
import leaflet, { marker } from 'leaflet';
import * as data from '../static/data.json';
import * as locations from '../static/locations.json';

type Data = {
  operator: string;
  object: string;
  location: string;
  safeRadius: string;
  IMFProtocol: string;
  buildAllowance: string;
};

type Location = {
  lat: number,
  lon: number,
  icon: string,
}

var map = leaflet.map('mapid').setView([42.698334, 23.318841], 13);
const provider = new OpenStreetMapProvider();

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
      .filter(([d, l]) => l.length)
      .map(([d, l]) => [d, l[0]]);

  // Doesn't work
  const pin = leaflet.icon({iconUrl: '../static/pin.png'})
  filtered
    .forEach(([d, l]: Array<any>) => marker([l.lat, l.lon], {icon: pin})
      .addTo(map)
      .bindPopup('asdf')
      .openPopup());
}

main();