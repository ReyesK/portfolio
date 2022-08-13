/* TODOS
    add enums for zoneIds, areas, regions?? need to find all possible values.. maybe there's a library for the types?
    figure out optional types vs always available
    fill enums
    refactor into separate files
    event -> code mapping https://www.weather.gov/nwr/eventcodes
*/

/* TYPES */
export type NWSCoords = [number, number][]

// SQW has subscript 2?? handle that?

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
    'Required Weekly Test'

export type NWSEASEventMap = {
    [key in NWSEASCode]: NWSEASWeatherEvent | NWSEASEvent | NWSAdminEvent
}

/* ENUMS */
// Type to pass to WeatherService for fetching alerts from different endpoints
export enum AlertFilterType {
    Area = 'area',
    Zone = 'zone',
    Region = 'region'
}

export enum NWSResponseType {
    FeatureCollection = 'FeatureCollection',
    Feature = 'Feature',
}

export enum NWSGeometryType {
    Polygon = 'Polygon',
}

export enum NWSPropertyType {
    WXAlert = 'wx:Alert'
}


export enum NWSAlertStatus {
    Actual = 'Actual',
}

export enum NWSAlertMessageType {
    Alert = 'Alert',
}

export enum NWSCategory { 
    Met = 'Met',
}

export enum NWSSeverity {
    Minor = 'Minor',
}

export enum NWSCertainty {
    Observed = 'Observed'
}

export enum NWSUrgency {
    Expected = 'Expected'
}



/* INTERFACES */
export interface AlertResponse {
    '@context': Array<string | NWSContextData>
    type: NWSResponseType
    features: NWSFeature[]
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
    references: string[] // TODO see what this is
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
    event: NWSEASEvent
    sender: string // email address?
    senderName: string
    headline: string
    description: string
    instruction: string
    response: string // possible type?, so far 'Monitor'
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
    NWSHeadline?: string[] // ALL CAPS STRING ARRAY!
    BLOCKCHANNEL?: string[] // possible type
    eventMotionDescription?: string[]
    maxWindGust?: string[]
    maxHailSize?: string[]
    'EAS-ORG'?: string[]
    VTEC: string[]
    eventEndingTime: string[]
}
