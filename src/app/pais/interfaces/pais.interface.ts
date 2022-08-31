export interface Country {
    name:         Name;
    tld:          string[];
    cca2:         string;
    ccn3:         string;
    cca3:         string;
    cioc?:        string;
    independent:  boolean;
    status:       Status;
    unMember:     boolean;
    currencies?:  Currencies;
    idd:          Idd;
    capital?:     string[];
    altSpellings: string[];
    region:       Region;
    subregion?:   string;
    languages:    { [key: string]: string };
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    borders?:     string[];
    area:         number;
    demonyms:     Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    gini?:        { [key: string]: number };
    fifa?:        string;
    car:          Car;
    timezones:    string[];
    continents:   Continent[];
    flags:        CoatOfArms;
    coatOfArms:   CoatOfArms;
    startOfWeek:  StartOfWeek;
    capitalInfo:  CapitalInfo;
    postalCode?:  PostalCode;
}

export interface CapitalInfo {
    latlng?: number[];
}

export interface Car {
    signs: string[];
    side:  Side;
}

export enum Side {
    Left = "left",
    Right = "right",
}

export interface CoatOfArms {
    png?: string;
    svg?: string;
}

export enum Continent {
    Africa = "Africa",
    Antarctica = "Antarctica",
    Asia = "Asia",
    Europe = "Europe",
    NorthAmerica = "North America",
    Oceania = "Oceania",
    SouthAmerica = "South America",
}

export interface Currencies {
    zar?: Afn;
    syp?: Afn;
    clp?: Afn;
    bnd?: Afn;
    sgd?: Afn;
    ssp?: Afn;
    eur?: Afn;
    iqd?: Afn;
    krw?: Afn;
    all?: Afn;
    ugx?: Afn;
    btn?: Afn;
    inr?: Afn;
    xpf?: Afn;
    mkd?: Afn;
    xcd?: Afn;
    bdt?: Afn;
    djf?: Afn;
    twd?: Afn;
    thb?: Afn;
    hnl?: Afn;
    try?: Afn;
    tjs?: Afn;
    sos?: Afn;
    aud?: Afn;
    gbp?: Afn;
    shp?: Afn;
    pkr?: Afn;
    usd?: Afn;
    bsd?: Afn;
    sar?: Afn;
    chf?: Afn;
    bwp?: Afn;
    kpw?: Afn;
    xaf?: Afn;
    php?: Afn;
    tnd?: Afn;
    sdg?: BAM;
    mmk?: Afn;
    irr?: Afn;
    kmf?: Afn;
    mop?: Afn;
    jpy?: Afn;
    lsl?: Afn;
    bhd?: Afn;
    amd?: Afn;
    mvr?: Afn;
    lak?: Afn;
    cdf?: Afn;
    khr?: Afn;
    yer?: Afn;
    cny?: Afn;
    vnd?: Afn;
    dzd?: Afn;
    mad?: Afn;
    mru?: Afn;
    nzd?: Afn;
    afn?: Afn;
    huf?: Afn;
    gmd?: Afn;
    ang?: Afn;
    jod?: Afn;
    lbp?: Afn;
    ghs?: Afn;
    hrk?: Afn;
    czk?: Afn;
    bam?: BAM;
    kes?: Afn;
    kzt?: Afn;
    hkd?: Afn;
    htg?: Afn;
    scr?: Afn;
    tzs?: Afn;
    etb?: Afn;
    bmd?: Afn;
}

export interface Afn {
    name:   string;
    symbol: string;
}

export interface BAM {
    name: string;
}

export interface Demonyms {
    eng:  Eng;
    fra?: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Idd {
    root?:     string;
    suffixes?: string[];
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: Translation };
}

export interface Translation {
    official: string;
    common:   string;
}

export interface PostalCode {
    format: string;
    regex?: string;
}

export enum Region {
    Africa = "Africa",
    Americas = "Americas",
    Antarctic = "Antarctic",
    Asia = "Asia",
    Europe = "Europe",
    Oceania = "Oceania",
}

export enum StartOfWeek {
    Monday = "monday",
    Sunday = "sunday",
    Turday = "turday",
}

export enum Status {
    OfficiallyAssigned = "officially-assigned",
}
