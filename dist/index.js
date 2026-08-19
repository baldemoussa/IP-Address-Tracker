import getIpAdress from './services/apiService.js';
import IpAddress from './models/IpAdress.js';
// import * as L from 'leaflet';
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const ipAddressDisplay = document.getElementById("ip-display");
const locationDisplay = document.getElementById("location-display");
const timezoneDisplay = document.getElementById("timezone-display");
const ispDisplay = document.getElementById("isp-display");
const errorMessage = document.getElementById("error-message");
let map = null;
let defaultIp = "8.8.8.8";
let defaultQueryType = "ipAddress";
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
function renderMap(inputParameter = defaultIp, queryType = defaultQueryType) {
    getIpAdress(inputParameter, queryType).then((data) => {
        loadInfoCardData(data);
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
    const value = searchInput.value.trim();
    if (value) {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const domainRegex = /^(?!:-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/;
        const isValidIp = ipRegex.test(value);
        const isValidEmail = emailRegex.test(value);
        const isValidDomain = domainRegex.test(value);
        if (isValidIp) {
            errorMessage.innerHTML = "<span class='valid'>Valid IP Address, proceed to search</span>";
            defaultQueryType = "ipAddress";
        }
        else if (isValidEmail) {
            errorMessage.innerHTML = "<span class='valid'>Valid Email Address, proceed to search</span>";
            defaultQueryType = "email";
        }
        else if (isValidDomain) {
            errorMessage.innerHTML = "<span class='valid'>Valid Domain Name, proceed to search</span>";
            defaultQueryType = "domain";
        }
        else {
            errorMessage.innerHTML = "<span class='invalid'>Please enter a valid IP address, Email, or Domain.</span>";
        }
    }
    else {
        errorMessage.innerHTML = "";
    }
});
searchButton.addEventListener("click", () => {
    renderMap(searchInput.value, defaultQueryType);
    errorMessage.innerHTML = "";
});
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        renderMap(searchInput.value, defaultQueryType);
        errorMessage.innerHTML = "";
    }
});
//# sourceMappingURL=index.js.map