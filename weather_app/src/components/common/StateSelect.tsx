import { SyntheticEvent } from 'react';
import { Grid, Autocomplete, TextField } from '@mui/material';
import { US_STATES } from 'types/Base';

interface StateSelectProps {
    onChange?: (event: SyntheticEvent, value: {label: string, id: string} | null) => void
}

const StateSelect = (props: StateSelectProps) => {
    const {onChange} = props
    return (<Grid container>
        <Grid xs={4}>
            <Autocomplete
                autoComplete={true}
                onChange={onChange} 
                size="small"
                options={Object.entries(US_STATES).map(([k, v]) => ({label: v, id: k}))}
                isOptionEqualToValue={(o, v) => o.id === v.id}
                renderInput={(props) => <TextField {...props} placeholder="Select an area..." />}
            />
        </Grid>
    </Grid>)
}

export default StateSelect;