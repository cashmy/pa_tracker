import React from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect} from '@material-ui/core'


const Select = (props) => {
    const { name, label, value, error=null, onChange, options } = props

    return (
        <FormControl variant='outlined' fullWidth
        {...(error && {error:true})}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                fullWidth
            >
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item =>(<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                     )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select