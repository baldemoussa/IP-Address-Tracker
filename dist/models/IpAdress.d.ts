interface location {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
}
interface as {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
}
export default class IpAddress {
    private _ip;
    private _location;
    private _domains;
    private _as;
    private _isp;
    constructor(ip: string, country: string, region: string, city: string, lat: number, lng: number, postalCode: string, timezone: string, geonameId: number, domains: string[], asn: number, name: string, route: string, domain: string, type: string, isp: string);
    get ip(): string;
    set ip(ip: string);
    get location(): location;
    set location(location: location);
    get domains(): string[];
    set domains(domains: string[]);
    get as(): as;
    set as(as: as);
    get isp(): string;
    set isp(isp: string);
}
export {};
//# sourceMappingURL=IpAdress.d.ts.map