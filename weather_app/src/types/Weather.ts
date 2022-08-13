/* TODOS
    add enums for zoneIds, areas, regions?? need to find all possible values.. maybe there's a library for the types?
    check optional types
    fill enums
    refactor into separate files
*/

/* TYPES */
export type NWSCoords = [number, number][]

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
    event: string
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
    AWIPSidentifier: string[] // possible type
    WMOidentifier: string[] // possible type
    NWSHeadline: string[] // ALL CAPS STRING ARRAY!
    BLOCKCHANNEL: string[] // possible type
}

