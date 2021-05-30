import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { 
    MuiPickersUtilsProvider,
    KeyboardDatePicker 
} from '@material-ui/pickers';

export default function DatePicker(props) {
    
    const { name, label, value, error=null, onChange } = props;

     // Converts the "Date" value to the Default Event parameter alleviating an error messag
    const convertToDefEventParam = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker 
                // disableToolbar 
                variant="inline"
                inputVariant="outlined"
                label={label}   
                format="mm/dd/yyyy"
                name={name}
                value={value}
                onChange={date => onChange(convertToDefEventParam(name, date))}
                {...(error && {error:true, helperText:error})}
            />
        </MuiPickersUtilsProvider>
    )
}