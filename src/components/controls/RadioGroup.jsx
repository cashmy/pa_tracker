import React from 'react';
import { FormControl, FormControlLabel, FormLabel, FormHelperText, Radio, RadioGroup as MuiRadioGroup } from '@material-ui/core';

export default function RadioGroup(props) {

    const { name, label, value, error=null, onChange, color, items } = props;

        return (
            <FormControl
            {...(error && {error:true})}
            >
                <FormLabel>{label}</FormLabel>
                <MuiRadioGroup row
                    name={name}
                    value={value}
                    onChange={onChange}
                    >
                    {
                        items.map(
                            (item) =>  (
                                <FormControlLabel 
                                    key={item.id} 
                                    value={item.id} 
                                    control={<Radio color={color || "secondary"} />} 
                                    label={item.title} 
                                />
                            )
                        )
                    }
                </MuiRadioGroup>
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        )
}