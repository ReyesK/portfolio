import React, { useState, useEffect, useCallback, useMemo } from "react";
import WeatherService from "../services/WeatherService";
import { AlertFilterType } from "../types/Weather";

const AlertList: React.FC = () => {

    const [alerts, setAlerts] = useState({});

    const fetchData = useCallback(
        async () => {
            const res = await WeatherService.fetchAlerts()
            setAlerts(res)
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