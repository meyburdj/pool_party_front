// import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function MultiSelectForm({ label, options, select }) {
    console.log("options", options);
    const handleChange = (event) => {
        select(event.target.value);
    };

    return (
        <div>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={label}
                    onChange={handleChange}
                >
                    <MenuItem >
                        <em>Cities</em>
                    </MenuItem>
                    {options.map(option => <MenuItem key={`${option}-normal`} value={option}> {option}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    );
}

export default MultiSelectForm;