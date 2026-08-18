import IpAddress from "../models/IpAdress.js";
const API_KEY = "at_cc4VlfzpyO613DEh0VJwE6H11baOL";
const BASE_URL = "https://geo.ipify.org/api/v2/country,city?apiKey=";
export default async function getIpAdress(ipParameter) {
    try {
        const url = `${BASE_URL}${API_KEY}&ipAddress=${ipParameter}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        const ipAdress = new IpAddress(data.ip, data.location.country, data.location.region, data.location.city, data.location.lat, data.location.lng, data.location.postalCode, data.location.timezone, data.location.geonameId, data.domains, data.as.asn, data.as.name, data.as.route, data.as.domain, data.as.type, data.isp);
        return ipAdress;
    }
    catch (error) {
        console.error("Error fetching IP address:", error);
        throw error;
    }
}
//# sourceMappingURL=apiService.js.map