import React, { useState, useEffect, useCallback, SyntheticEvent } from "react";

import WeatherService from "services/WeatherService";
import { NWSFeature } from "types/Weather";
import { AlertFilterType } from "types/Weather";
import Alert from "components/alerts/Alert";

import { Grid } from "@mui/material";
import StateSelect from "components/common/StateSelect";

const AlertList: React.FC = () => {

    const [alerts, setAlerts] = useState<NWSFeature[]>([]);
    const [selectedArea, setSelectedArea] = useState<string|null|undefined>();
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(
        async (area: string) => {
            setLoading(true)
            const alertResponse = await WeatherService.fetchAlerts({type: AlertFilterType.Area, target: area})
            setLoading(false)
            if (!alertResponse) return
            const alerts = alertResponse.features        
            console.log(alerts)
            setAlerts(alerts)
        }, []
    );

    useEffect(() => {
        setAlerts([]) // reset alerts when selection changes
        if (!selectedArea) return // don't fetch if area unselected
        fetchData(selectedArea);
    }, [fetchData, setAlerts, selectedArea]);

    const handleSelectedAreaChange = (e: SyntheticEvent, v: {label: string, id: string} | null) => {
        setSelectedArea(v?.id)
    }

    const getMessage = () => {
        if (loading) return <>Loading...</>
        if (selectedArea) return <>All clear!</>
        return <>Select an area</>
    }
    
    const alertList: JSX.Element = alerts.length ? <>{alerts.map((alert, idx) => {
        return <Alert alert={alert} key={idx}/>
    })}</> : getMessage();

    return (
        <Grid container>
            <Grid xs={12}>
                <h1>Alert List</h1>
            </Grid>
            {/* Render State Select */}
            <Grid xs={4}>
                <StateSelect
                    onChange={handleSelectedAreaChange} />
            </Grid>
            {/* Render Alert List */}
            <Grid xs={12}>
                {alertList}
            </Grid>
        </Grid>
    );
}

export default AlertList;