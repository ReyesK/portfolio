import { useState, useEffect, useCallback } from "react";
import WeatherService from "services/WeatherService";
// import { AlertFilterType } from "types/Weather";

const AlertList: React.FC = () => {

    const [alerts, setAlerts] = useState({});

    const fetchData = useCallback(
        async () => {
            // TODO type for response 
            const res = await WeatherService.fetchAlerts()
            console.log(res)
            setAlerts(res)
            // setAlerts((res.data as any)['@context']) // save context somewhere.
            // setAlerts(res.data.features[0].properties.instruction as any)
        }, []
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <h1>Alert List</h1>
            <div>
                { JSON.stringify(alerts) }
            </div>
        </div>
    );
}

export default AlertList