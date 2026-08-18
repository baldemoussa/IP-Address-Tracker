import getIpAdress from './services/apiService.js';
import IpAddress from './models/IpAdress.js';
// import * as L from 'leaflet';
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-btn");
let ipAddressDisplay = document.getElementById("ip-display");
let locationDisplay = document.getElementById("location-display");
let timezoneDisplay = document.getElementById("timezone-display");
let ispDisplay = document.getElementById("isp-display");
let errorMessage = document.getElementById("error-message");
let map = null;
const defaultIp = "8.8.8.8";
function loadInfoCardData(dataResponse) {
    ipAddressDisplay.innerHTML = dataResponse.ip;
    locationDisplay.innerHTML = `${dataResponse.location.region}, ${dataResponse.location.country}, <br>${dataResponse.location.city} ${dataResponse.location.postalCode}`;
    timezoneDisplay.innerHTML = `UTC ${dataResponse.location.timezone}`;
    ispDisplay.innerHTML = dataResponse.isp;
}
async function loadMap(location, lat, lng) {
    try {
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
    }
    catch (error) {
        console.error('Error geocoding location:', error);
        return null;
    }
}
function renderMap(ip = defaultIp) {
    getIpAdress(ip).then((data) => {
        loadInfoCardData(new IpAddress(data.ip, data.location.country, data.location.region, data.location.city, data.location.lat, data.location.lng, data.location.postalCode, data.location.timezone, data.location.geonameId, data.domains, data.as.asn, data.as.name, data.as.route, data.as.domain, data.as.type, data.isp));
        loadMap(`${data.location.region}, 
                ${data.location.country}, 
                ${data.location.city}  
                ${data.location.postalCode}`, data.location.lat, data.location.lng);
    });
}
window.addEventListener('load', function () {
    renderMap();
});
searchInput.addEventListener("input", () => {
    if (searchInput.value) {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        const isValidIp = ipRegex.test(searchInput.value);
        errorMessage.innerHTML = isValidIp ? "<span class='valid'>Your IP Address is valid, proceed to search</span>" : "<span class='invalid'>Please enter a valid IP address.</span>";
    }
    else {
        errorMessage.innerHTML = "";
    }
});
searchButton.addEventListener("click", () => {
    renderMap(searchInput.value);
    errorMessage.innerHTML = "";
});
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        renderMap(searchInput.value);
        errorMessage.innerHTML = "";
    }
});
//# sourceMappingURL=index.js.map