export default class IpAddress {
    _ip;
    _location;
    _domains;
    _as;
    _isp;
    constructor(ip, country, region, city, lat, lng, postalCode, timezone, geonameId, domains, asn, name, route, domain, type, isp) {
        this._ip = ip;
        this._location = {
            country,
            region,
            city,
            lat,
            lng,
            postalCode,
            timezone,
            geonameId
        };
        this._domains = domains;
        this._as = {
            asn,
            name,
            route,
            domain,
            type,
        };
        this._isp = isp;
    }
    get ip() {
        return this._ip;
    }
    set ip(ip) {
        this._ip = ip;
    }
    get location() {
        return this._location;
    }
    set location(location) {
        this._location = location;
    }
    get domains() {
        return this._domains;
    }
    set domains(domains) {
        this._domains = domains;
    }
    get as() {
        return this._as;
    }
    set as(as) {
        this._as = as;
    }
    get isp() {
        return this._isp;
    }
    set isp(isp) {
        this._isp = isp;
    }
}
//# sourceMappingURL=IpAdress.js.map