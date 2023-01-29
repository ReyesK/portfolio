import React, { useState, useEffect, useCallback, SyntheticEvent } from "react";

import WeatherService from "services/WeatherService";
import { NWSFeature } from "types/Weather";
import { AlertFilterType } from "types/Weather";
import { US_STATES } from "types/Base";
import Alert from "components/alerts/Alert";
import style from 'styles/alerts.module.css';

import { Grid, Autocomplete, TextField } from "@mui/material";
import StateSelect from "components/common/StateSelect";



const AlertList: React.FC = () => {

    const [alerts, setAlerts] = useState<NWSFeature[]>([]);
    const [selectedArea, setSelectedArea] = useState<string|null|undefined>();

    const fetchData = useCallback(
        async (area: string) => {
            const alertResponse = await WeatherService.fetchAlerts({type: AlertFilterType.Area, target: area})
            if (!alertResponse) return
            const alerts = alertResponse.features        
            console.log(alerts)
            setAlerts(alerts)
        }, []
    );

    useEffect(() => {
        if (!selectedArea) return
        fetchData(selectedArea);
    }, [fetchData, selectedArea]);

    const handleSelectedAreaChange = (e: SyntheticEvent, v: {label: string, id: string} | null) => {
        setSelectedArea(v?.id)
    }

    const noAlerts: JSX.Element = selectedArea ? <>All clear!</> : <>Select an area</>;

    const alertList: JSX.Element = alerts.length ? <>{alerts.map((alert, idx) => {
        return <Alert alert={alert} key={idx}/>
    })}</> : noAlerts;



    return (
        <div>
            <h1>Alert List</h1>
                <StateSelect
                    onChange={handleSelectedAreaChange} />
            <div>
                {alertList}
            </div>
        </div>
    );
}

export default AlertList;