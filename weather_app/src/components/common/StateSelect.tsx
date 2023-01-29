import { SyntheticEvent } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { US_STATES } from 'types/Base';

interface StateSelectProps {
    onChange?: (event: SyntheticEvent, value: {label: string, id: string} | null) => void
}

const StateSelect = (props: StateSelectProps) => {
    const {onChange} = props
    return (
        <Autocomplete
            autoComplete={true}
            onChange={onChange} 
            size="small"
            options={Object.entries(US_STATES).map(([k, v]) => ({label: v, id: k}))}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            renderInput={(props) => <TextField {...props} placeholder="Select an area..." />}
        />)
}

export default StateSelect;