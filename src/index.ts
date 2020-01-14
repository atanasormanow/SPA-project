import { OpenStreetMapProvider } from 'leaflet-geosearch';
import leaflet from 'leaflet';
import * as data from '../static/data.json';

var map = leaflet.map('mapid').setView([42.698334, 23.318841], 13);
const provider = new OpenStreetMapProvider();

async function getResult() {
    const results = await provider.search({ query: "Sofia Airport" });
    const lat = Number(results[0].y);
    const lon = Number(results[0].x);
    leaflet.marker([lat, lon]).addTo(map);
}

getResult();
leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

leaflet.marker([42.698334, 23.318841]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();