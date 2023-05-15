import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/**
 * MultiSelectForm: Click down form for selecting different items. Used for 
 *  filtering pools by city
 * 
 * Props: 
 * - label: String that the form will be called
 * - options: Array of strings.
 * - select: Function that happens when selecting an option
 * - value:
 * 
 * State: NA
 * 
 * Component tree:
 *  PoolList -> MultiSelectForm
 * 
 */
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