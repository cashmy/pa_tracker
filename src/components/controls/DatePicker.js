import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { 
    MuiPickersUtilsProvider,
    KeyboardDatePicker 
} from '@material-ui/pickers';

export default function DatePicker(props) {
    
    const { name, label, value, onChange } = props;

    const convertToDefEventParam = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker 
                disableToolbar 
                variant="inline"
                inputVariant="outlined"
                label={label}
                format="MMM/dd/yyyy"
                name={name}
                value={value}
                onChange={date => onChange(convertToDefEventParam(name.date))}
            />
        </MuiPickersUtilsProvider>
    )
}