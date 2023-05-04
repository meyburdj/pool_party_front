import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function MultiSelectForm({ label, options, select, value }) {
    const handleChange = (event) => {
        select(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} variant="filled">
            <InputLabel>{label}</InputLabel>
            <Select value={value} onChange={handleChange}>
                {options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default MultiSelectForm;