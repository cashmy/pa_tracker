import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Controls from '../../components/controls/Controls';

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

    useEffect(() => {
    },[values])

    return(
        <form>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="patientFirstName" 
                        label="FirstName"
                        value={values.patientFirstName}
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