import { OpenStreetMapProvider } from 'leaflet-geosearch';
import leaflet, { marker } from 'leaflet';
import * as data from '../static/data.json';

var map = leaflet.map('mapid').setView([42.698334, 23.318841], 13);
const provider = new OpenStreetMapProvider();

leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

async function getResult(location: string) {
    const results = await provider.search({ query: location });
    if(!results.length){
        return [0,0];
    }
    const lat = Number(results[0].y);
    const lon = Number(results[0].x);
    return [lat, lon];

}

async function getCoords(){
    let coordinates = [];
    for(let x in data) {
        coordinates.push(await getResult(data[x].location))
    }
    return coordinates;
}

async function main(){
    const coordinates = (await getCoords());
    //don't dos leaflet :(
    coordinates.forEach(c => leaflet.marker([c[0], c[1]]).addTo(map).bindPopup('asdf').openPopup());
}

main();