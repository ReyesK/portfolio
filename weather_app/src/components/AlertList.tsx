import { useState, useEffect, useCallback } from "react";

import WeatherService from "services/WeatherService";
import { NWSFeature } from "types/Weather";
import { AlertFilterType } from "types/Weather";
import 'styles/main.css';

interface AlertProps {
    alert: NWSFeature
}

const AlertList: React.FC = () => {

    const [alerts, setAlerts] = useState<NWSFeature[]>([]);

    const fetchData = useCallback(
        async () => {
            const alertResponse = await WeatherService.fetchAlerts({type: AlertFilterType.Area, target: 'CO'})
            if (!alertResponse) return
            const alerts = alertResponse.features        
            console.log(alerts)
            setAlerts(alerts)
        }, []
    );

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // TODO move to component
    const Alert = ({alert}: AlertProps): JSX.Element => {
        if (!alert) return <></>
        return <>
            <div className="alert-container alert-text">
                <div style={{}}><b>{alert.properties.areaDesc}</b></div>
                <div>{alert.properties.description}</div>
                <div>{alert.properties.instruction}</div>
            </div>
        </>
    }

    const alertList: JSX.Element[] = alerts.map((alert, idx) => {
        return <Alert alert={alert} key={idx}/>
    });

    return (
        <div>
            <h1>Alert List</h1>
            <div>
                {alertList}
            </div>
        </div>
    );
}

export default AlertList