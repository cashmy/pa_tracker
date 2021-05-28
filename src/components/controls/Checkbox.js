import React from 'react'
import { FormControl, FormControlLabel, FormHelperText, Checkbox as MuiCheckBox } from '@material-ui/core'


const Select = (props) => {
    const { name, label, value, error=null, onChange, ...options } = props


    return (
        <FormControl variant='outlined' fullWidth
        {...(error && {error:true})}
        >
            <FormControlLabel
                control={
                <MuiCheckBox 
                    name = {name}
                    color = "primary" 
                    checked = {value}
                    onChange = {onChange}
                    {...options}
                />}
                label={label}
            ></FormControlLabel>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select