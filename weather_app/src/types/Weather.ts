// http://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.pdf

/* TODOS
    - refactor into separate files- possibly drop NWS prefix and put it in a NWS.ts file
*/

/* TYPES */
export type NWSCoords = [number, number][]

// W for WARNINGS
// A for WATCHES
// E for EMERGENCIES
// S for STATEMENTS
export type NWSEASCode = 
    'BZD' | 'CFA' | 'CFW' | 'DSW' | 'EWW' | 'FFA' | 'FFW' | 'FFS' | 'FLA' | 'FLW' | 'FLS' |
    'HWA' | 'HWW' | 'HUA' | 'HUW' | 'HLS' | 'SVA' | 'SVR' | 'SVS' | 'SQW' | 'SMW' | 'SPS' |
    'SSA' | 'SSW' | 'TOA' | 'TOR' | 'TRA' | 'TRW' | 'TSA' | 'TSW' | 'WSA' | 'WSW' | 'AVA' |
    'AVW' | 'BLU' | 'CAE' | 'CDW' | 'CEM' | 'EQW' | 'EVI' | 'FRW' | 'HMW' | 'LEW' | 'LAE' |
    'TOE' | 'NUW' | 'RHW' | 'SPW' | 'VOW' | 'ADR' | 'DMO' | 'RMT' | 'RWT'

export type NWSEASWeatherEvent = 
    'Blizzard Warning' |
    'Coastal Flood Watch' |
    'Coastal Flood Warning' |
    'Dust Storm Warning' |
    'Extreme Wind Warning' |
    'Flash Flood Watch' |
    'Flash Flood Warning' |
    'Flash Flood Statement' |
    'Flood Watch' |
    'Flood Warning' |
    'Flood Statement' |
    'High Wind Watch' |
    'High Wind Warning' |
    'Hurricane Watch' |
    'Hurricane Warning' |
    'Hurricane Statement' |
    'Severe Thunderstorm Watch' | 
    'Severe Thunderstorm Warning' | 
    'Severe Weather Statement' |
    'Snow Squall Warning' | 
    'Special Marine Warning' |
    'Special Weather Statement' |
    'Storm Surge Watch' |
    'Storm Surge Warning' |
    'Tornado Watch' |
    'Tornado Warning' |
    'Tropical Storm Watch' |
    'Tropical Storm Warning' |
    'Tsunami Watch' |
    'Tsunami Warning' |
    'Winter Storm Watch' |
    'Winter Storm Warning'

export type NWSEASEvent = 
    'Avalance Watch' |
    'Avalance Warning' |
    'Blue Alert' |
    'Child Abduction Emergency' |
    'Civil Danger Warning' | 
    'Civil Emergency Message' |
    'Earthquake Warning' | 
    'Evacuation Immediate' |
    'Fire Warning' |
    'Hazardous Materials Warning' |
    'Law Enforcement Warning' |
    'Local Area Emergency' |
    '911 Telephone Outage Emergency' |
    'Nuclear Power Plant Warning' |
    'Radiological Hazard Warning' |
    'Shelter in Place Warning' |
    'Volcano Warning'

export type NWSAdminEvent = 
    'Administrative Message' | 
    'Practice/Demo Warning' | 
    'Required Monthly Test' | 
    'Required Weekly Test' |
    'Test Message'

type NWSEventMap = {
    [key in NWSEASCode]: NWSEASWeatherEvent | NWSEASEvent | NWSAdminEvent
}
// event -> code mapping https://www.weather.gov/nwr/eventcodes
export const NWSEvents: NWSEventMap = {
    BZD: 'Blizzard Warning', 
    CFA: 'Coastal Flood Watch',
    CFW: 'Coastal Flood Warning',
    DSW: 'Dust Storm Warning',
    EWW: 'Extreme Wind Warning',
    FFA: 'Flash Flood Watch',
    FFW: 'Flash Flood Warning',
    FFS: 'Flash Flood Statement',
    FLA: 'Flood Watch',
    FLW: 'Flood Warning',
    FLS: 'Flood Statement',
    HWA: 'High Wind Watch',
    HWW: 'High Wind Warning',
    HUA: 'Hurricane Watch',
    HUW: 'Hurricane Warning',
    HLS: 'Hurricane Statement',
    SVA: 'Severe Thunderstorm Watch',
    SVR: 'Severe Thunderstorm Warning',
    SVS: 'Severe Weather Statement',
    SQW: 'Snow Squall Warning',
    SMW: 'Special Marine Warning',
    SPS: 'Special Weather Statement',
    SSA: 'Storm Surge Watch',
    SSW: 'Storm Surge Warning',
    TOA: 'Tornado Watch',
    TOR: 'Tornado Warning',
    TRA: 'Tropical Storm Watch',
    TRW: 'Tropical Storm Warning',
    TSA: 'Tsunami Watch',
    TSW: 'Tsunami Warning',
    WSA: 'Winter Storm Watch',
    WSW: 'Winter Storm Warning',
    AVA: 'Avalance Watch',
    AVW: 'Avalance Warning',
    BLU: 'Blue Alert',
    CAE: 'Child Abduction Emergency',
    CDW: 'Civil Danger Warning',
    CEM: 'Civil Emergency Message',
    EQW: 'Earthquake Warning',
    EVI: 'Evacuation Immediate',
    FRW: 'Fire Warning',
    HMW: 'Hazardous Materials Warning',
    LEW: 'Law Enforcement Warning',
    LAE: 'Local Area Emergency',
    TOE: '911 Telephone Outage Emergency',
    NUW: 'Nuclear Power Plant Warning',
    RHW: 'Radiological Hazard Warning',
    SPW: 'Shelter in Place Warning',
    VOW: 'Volcano Warning',
    ADR: 'Administrative Message',
    DMO: 'Practice/Demo Warning',
    RMT: 'Required Monthly Test',
    RWT: 'Required Weekly Test'
}

/* ENUMS */
// Type to pass to WeatherService for fetching alerts from different endpoints
export enum AlertFilterType {
    Area = 'area',
    Zone = 'zone',
    Region = 'region',
}

export enum NWSResponseType {
    FeatureCollection = 'FeatureCollection',
    Feature = 'Feature',
}

export enum NWSGeometryType {
    Polygon = 'Polygon',
    Point = 'Point',
}

export enum NWSPropertyType {
    WXAlert = 'wx:Alert',
    WXZone = 'wx:Zone',
    WXObservationStation = 'wx:ObservationStation'
}


export enum NWSAlertStatus {
    Actual = 'Actual',
    Exercise = 'Exercise',
    System = 'System',
    Test = 'Test',
    Draft = 'Draft'
}

export enum NWSAlertMessageType {
    Alert = 'Alert',
    Update = 'Update',
    Cancel = 'Cancel',
    Ack = 'Ack', // not currently used
    Error = 'Error' // not currently used
}

export enum NWSCategory { 
    Get = 'Geo', // geophysical
    Met = 'Met', // meteorological
    Saftey = 'Saftey',
    Security = 'Security',
    Rescue = 'Rescue',
    Fire = 'Fire',
    Health = 'Health',
    Env = 'Env', // pollution and other environmental
    Transport = 'Transport',
    Infra = 'Infra', //Utility, telecommunication, other non-transport infrastructure
    CBRNE = 'CBRNE', // – Chemical, Biological, Radiological, Nuclear or High-Yield Explosive threat or attack
    Other = 'Other',
    Unknown = 'Unknown'
}

export enum NWSSeverity {
    Extreme = 'Extreme',
    Severe = 'Severe',
    Moderate = 'Moderate',
    Minor = 'Minor',
    Unknown = 'Unknown'
}

export enum NWSCertainty {
    Observed = 'Observed',
    Likely = 'Likely',
    Possible = 'Possible',
    Unlikely = 'Unlikely',
    Unknown = 'Unknown'
}

export enum NWSUrgency {
    Immediate = 'Immediate',
    Expected = 'Expected',
    Future = 'Future',
    Past = 'Past',
    Unknown = 'Unknown'
}

export enum NWSAlertResponseType {
    Shelter = 'Shelter',
    Evacuate = 'Evacuate',
    Prepare = 'Prepare',
    Execute = 'Execute', 
    Avoid = 'Avoid', 
    Monitor = 'Monitor', 
    Assess = 'Assess',
    AllClear = 'AllClear',
    None = 'None'
}

export enum NWSAlertScope {
    Public = 'Public',
    Restricted = 'Restricted',
    Private = 'Private'
}

type NWSContext = Array<string | NWSContextData>

/* INTERFACES */

export interface AlertResponse {
    data: AlertResponseData
    status: number
    statusText: string
    headers: Map<string, string>
    config: NWSResponseConfig
    request: any
}

export interface NWSResponseConfig {
    transitional: Map<string, boolean>
    transformREquest: any[]
    transformResponse: any[]
    timeout: number
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    env: Map<string, any>
    headers: Map<string, string>
    baseUrl: string
    method: string // request method
    url: string
}

export interface AlertResponseData {
    '@context': NWSContext
    type: NWSResponseType
    features: NWSFeature[]
    title: string
    updated: string // timestamp
}

export interface ContextObject {
    '@id'?: string
    '@type'?: string
}

// @context data
export interface NWSContextData {
    '@version': string
    wx?: string
    '@vocab'?: string
    s?: string
    geo?: string
    unit?: string
    geometry?: NWSGeometry
    city?: string
    state?: string
    distance?: ContextObject
    bearing?: ContextObject
    value?: ContextObject
    unitCode?: ContextObject
    forecastOffice?: ContextObject
    forecastGridData?: ContextObject
    publicZone?: ContextObject
    county?: ContextObject
}

export interface NWSFeature {
    id: string
    type: NWSResponseType.Feature
    geometry: NWSGeometry
    properties: NWSFeatureProperties
}

export interface NWSFeatureProperties {
    '@id': string
    '@type': NWSPropertyType
    id: string
    areaDesc: string
    geocode: NWSGeocode
    affectedZones: string[]
    references: NWSFeatureReference[]
    sent?: string // timestamp
    effective?: string // timestamp
    onset?: string // timestamp
    expires?: string // timestamp
    ends?: string // timestamp
    status: NWSAlertStatus
    messageType: NWSAlertMessageType
    category: NWSCategory
    severity: NWSSeverity
    certainty: NWSCertainty
    urgency: NWSUrgency
    event: NWSEASEvent | NWSAdminEvent | NWSEASWeatherEvent
    sender: string // email address?
    senderName: string
    headline: string
    description: string
    instruction: string | null
    response: NWSAlertResponseType | NWSAlertResponseType[]
    parameters: NWSFeatureParameters
}

export interface NWSGeometry {
    '@id'?: string
    type: NWSGeometryType
    coordinates: NWSCoords[]
}

export interface NWSGeocode {
    SAME: string[]
    UGC: string[]
}

export interface NWSFeatureParameters {
    AWIPSidentifier?: string[] // possible type
    WMOidentifier?: string[] // possible type
    NWSHeadline?: string[]
    BLOCKCHANNEL?: string[] // possible type
    eventMotionDescription?: string[]
    maxWindGust?: string[]
    maxHailSize?: string[]
    'EAS-ORG'?: string[]
    VTEC: string[]
    eventEndingTime: string[]
}

export interface NWSFeatureReference {
    '@id': string
    identifier: string
    sender: string
    sent: string // timestamp
}

export interface NWSForecastResponse {
    '@context': NWSContextData
    id: string
    type: NWSResponseType.Feature
    geometry: NWSGeometry
    properties: NWSZone[]
}

export interface NWSZone {
    '@id': string
    '@type': NWSPropertyType
    id: string
    type: string
    name: string
    effectiveDate: string
    expirationDate: string
    state: string // state abbreviation
    cwa: string[] // figure out what this is. office ids?
    forecastOffices: string[] // array of forecast office ids (urls)
    timeZone: string[]
    observationStations: string[]
    radarStation: string | null
}

export interface NWSOffice {
    '@context': NWSContextData
    '@type': string // possible type so far 'GovernmentOrganization'
    '@id': string
    name: string
    address: NWSAddress
    telephone: string
    faxNumber: string
    email: string
    sameAs: string
    nwsRegion: string
    parentOrganization: string
    responsibleCounties: string[]
    responsibleForecastZones: string[]
    responsibleFireZones: string[]
    approvedObservationStations: string[]
}

export interface NWSAddress {
    '@type': string // possible type so far 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
}

export interface NWSStationResponse {
    '@context': NWSContext
    id: string
    type: NWSResponseType
    gemoetry: NWSGeometry
    properties: NWSStation[]
}

export interface NWSStation {
    '@id': string
    '@type': NWSPropertyType
    elevation: NWSElevation
    stationIdentifier: string
    name: string
    timeZone: string
    forecast: string
    county: string
    fireWeatherZone: string

}

export interface NWSElevation {
    unitCode: string
    value: number
}