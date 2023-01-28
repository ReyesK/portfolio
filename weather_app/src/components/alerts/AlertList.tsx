import React, { useState, useEffect, useCallback } from "react";

import WeatherService from "services/WeatherService";
import { NWSFeature } from "types/Weather";
import { AlertFilterType } from "types/Weather";
import { JoyUIEvent, US_STATES } from "types/Base";
import Alert from "components/alerts/Alert";
import style from 'styles/alerts.module.css';

import { Select, Option, Grid } from "@mui/joy";



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

    const handleSelectedAreaChange = (e: JoyUIEvent, v: string | null) => {
        setSelectedArea(v)
    }

    const noAlerts: JSX.Element = <>All clear!</>;

    const alertList: JSX.Element = alerts.length ? <>{alerts.map((alert, idx) => {
        return <Alert alert={alert} key={idx}/>
    })}</> : noAlerts;

    const alertHeader: JSX.Element = <>
        <Grid container>
            <Grid xs={4} className={style.alertSelectContainer}>
                <Select
                    placeholder="Select an area..."
                    onChange={handleSelectedAreaChange}>
                    <>{
                        Object.entries(US_STATES).map(([k, v]) => {
                            return <Option value={k}>{v}</Option>
                        })
                    }</>
                </Select>
            </Grid>
        </Grid>
    </>

    return (
        <div>
            <h1>Alert List</h1>
                {alertHeader}
            <div>
                {alertList}
            </div>
        </div>
    );
}

export default AlertList;