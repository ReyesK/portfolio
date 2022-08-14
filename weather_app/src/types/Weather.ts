/* TODOS
    add enums for zoneIds, areas, regions?? need to find all possible values.. maybe there's a library for the types?
    figure out optional types vs always available
    fill enums
    refactor into separate files

    more types: zones, offices, stations, 
    https://api.weather.gov/zones/forecast/IDZ060
    https://api.weather.gov/zones/county/IDC007
    https://api.weather.gov/offices/PIH
    https://api.weather.gov/stations/ITD35
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
    WXZone = 'wx:Zone'
}


export enum NWSAlertStatus {
    Actual = 'Actual',
    Test = 'Test'
}

export enum NWSAlertMessageType {
    Alert = 'Alert',
}

export enum NWSCategory { 
    Met = 'Met',
    Unknown = 'Unknown'
}

export enum NWSSeverity {
    Minor = 'Minor',
    Severe = 'Severe',
    Unknown = 'Unknown'
}

export enum NWSCertainty {
    Observed = 'Observed',
    Unknown = 'Unknown'
}

export enum NWSUrgency {
    Expected = 'Expected',
    Immediate = 'Immediate',
    Unknown = 'Unknown'
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

// @context data
export interface NWSContextData {
    '@version': string
    wx: string
    '@vocab': string
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
    response: string // possible type?, so far 'Monitor' | 'Execute' | 'Avoid' | 'None'
    parameters: NWSFeatureParameters
}

export interface NWSGeometry {
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