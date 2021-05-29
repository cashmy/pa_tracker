import React, { useState, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Controls from '../../components/controls/Controls';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    }
}))

const initialFValues = {
    patientId: 0,
    patientFirstName : '',
    patientLastName : '',
    patientDOB: '',
    patientHaveIEP: false,
    patientInABA: false,
    patientClass: '',
    patientNotes: '',
    patientInactive: false
}

export default function PatientForm() {

    const [values, setValues ] = useState(initialFValues);
    const classes = useStyles;
    
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    useEffect(() => {
    },[values])

    return(
        <form>
            <Grid container className={classes.root}>
                <Grid item xs={6}>
                    <Controls.Input
                        name="patientFirstName" 
                        label="FirstName"
                        value={values.patientFirstName}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="patientLastName" 
                        label="LastName"
                        value={values.patientLastName}
                    />
                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>
        </form>
    )
}