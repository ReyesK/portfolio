import axios from "http-common";
import { AlertFilterType } from "types/Weather";

interface FetchFilter {
    type: AlertFilterType
    target: string
};

/**
 * fetches active weather alerts
 * @param filter optional object for filtering active alert requests.
 * @returns Promise of JSON-LD formatted response from NWS
 * Note: NWS docs have examples of both /alerts/active/area/{area} and /alerts/active?area={area} endpoints.
 * they seem to return the same data, using the first version here.
 */
const fetchAlerts = async (filter?: FetchFilter) => {
    const endpoint = buildEndpoint(filter);
    return await axios.get<any>(endpoint);
};

const fetchAlertCounts = async () => {
    return await axios.get<any>('/alerts/count');
};

/**
 * 
 * @param filter
 * @returns string - endpoint built from type and target
 */
const buildEndpoint = (filter?: FetchFilter): string => {
    if (!filter) return `/alerts/active`;
    const { type, target } = filter;
    return `/alerts/active/${type}/${target}`;
};

const WeatherService = {
    fetchAlerts,
    fetchAlertCounts
};

export default WeatherService;