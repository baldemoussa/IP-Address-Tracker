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
  private _ip: string;
  private _location: location;
  private _domains: string[];
  private _as: as;
  private _isp: string;

  constructor(
    ip: string,
    country: string,
    region: string,
    city: string,
    lat: number,
    lng: number,
    postalCode: string,
    timezone: string,
    geonameId: number,
    domains: string[],
    asn: number,
    name: string,
    route: string,
    domain: string,
    type: string,
    isp: string
  ) {
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

  get ip(): string {
    return this._ip;
  }

  set ip(ip: string) {
    this._ip = ip;
  }

  get location(): location {
    return this._location;
  }

  set location(location: location) {
    this._location = location;
  }

  get domains(): string[] {
    return this._domains;
  }

  set domains(domains: string[]) {
    this._domains = domains;
  }

  get as(): as {
    return this._as;
  }

  set as(as: as) {
    this._as = as;
  }

  get isp(): string {
    return this._isp;
  }

  set isp(isp: string) {
    this._isp = isp;
  }
}