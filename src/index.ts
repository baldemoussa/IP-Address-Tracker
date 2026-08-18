import getIpAdress from './services/apiService.js';
import IpAddress from './models/IpAdress.js';
// import * as L from 'leaflet';

let searchInput = document.getElementById("search-input") as HTMLInputElement;
let searchButton = document.getElementById("search-btn") as HTMLButtonElement;
let ipAddressDisplay = document.getElementById("ip-display") as HTMLInputElement;
let locationDisplay = document.getElementById("location-display") as HTMLInputElement;
let timezoneDisplay = document.getElementById("timezone-display") as HTMLInputElement;
let ispDisplay = document.getElementById("isp-display") as HTMLInputElement;
let errorMessage = document.getElementById("error-message") as HTMLMessage

let map: L.Map | null = null;
const defaultIp = "73.165.75.209";


function loadInfoCardData(dataResponse: IpAddress) {
    ipAddressDisplay.innerHTML = dataResponse.ip;
    locationDisplay.innerHTML = `${dataResponse.location.region}, <br>${dataResponse.location.country}`;
    timezoneDisplay.innerHTML = `UTC ${dataResponse.location.timezone}`;
    ispDisplay.innerHTML = dataResponse.isp;
}


async function loadMap(location: string): Promise<L.Map | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'LeafletApp/1.0' }
        });
        const data = await response.json();
        if (!data || data.length === 0) {
            console.error('Location not found:', location);
            return null;
        }
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        if (map) {
            map.remove();
        }
        map = L.map('map').setView([lat, lng], 12);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<b>${location}</b>`)
            .openPopup();
        return map;

    } catch (error) {
        console.error('Error geocoding location:', error);
        return null;
    }
}

function renderMap(ip: string = defaultIp) {
    getIpAdress(ip).then((data) => {
        loadInfoCardData(new IpAddress(data.ip, data.location.country, data.location.region, data.location.timezone, data.domains, data.as.asn, data.as.name, data.as.route, data.as.domain, data.as.type, data.isp))
        loadMap(`${data.location.region}, ${data.location.country}`);
    });
}

//set default data
window.addEventListener('load', function () {
    renderMap();
});

//real time validation ip adress before proceding the search
searchInput.addEventListener("input", () => {
    if (searchInput.value) {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        const isValidIp = ipRegex.test(searchInput.value);
        errorMessage.innerHTML = isValidIp ? "<span class='valid'>Your IP Address is valid, proceed to search</span>" : "<span class='invalid'>Please enter a valid IP address.</span>";
    } else {
        errorMessage.innerHTML = "";
    }   
})

searchButton.addEventListener("click", () => {
    renderMap(searchInput.value);
});


searchInput.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        renderMap(searchInput.value);
    }
});


