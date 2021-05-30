import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import ServiceLayer from '../../services/ServiceLayer';


const genderItems = [
    {id:'male', title:'Male'},
    {id:'female', title:'Female'},
    {id:'other', title:'Other'} ,
]

const initialFValues = {
    clinicId: 0,
    clinicName : '',
    clinicAddress1 : '',
    clinicAddress2: '',
    clinicCity: '',
    clinicState: '',
    clinicZip: '',
    clinicPhone: '',
    clinicNPI: 0,
    clinicIsAGroup: false,
}


export default function PatientForm() {
    
    // Validation function (to be passed as a callback)
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if('clinicName' in fieldValues) 
            temp.clinicName = fieldValues.clinicName ? "" : "This field is required." 
        if('clinicState' in fieldValues)
            temp.clinicState = values.clinicState.length < 2 ? "" : "Maximum of letters - use abbreviation"
        if('clinicNPI' in fieldValues)
            temp.clinicNPI = fieldValues.clinicNPI ? 0 : "This field is required."
        if('clinicNPI' in fieldValues)
            temp.clinicNPI = values.clinicNPI.length > 9 ? "" : "Minimum length of 10 digits required"
        // temp.moble = values.mobile.length > 9 ? "" : "Minimum 10 numbers required"
        // temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "Email is not a valid format"
        setErrors({
            ...temp
        })
    
        // Check that every item in the array has a blank result (no errors) else return false.
        if(fieldValues === values)
        return Object.values(temp).every(x => x === "")
    }

    // const [values, setValues ] = useState(initialFValues);
    // const classes = useStyles;

    const {
        values,
        // setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues);
    
    // SaveSubmit Callback handler - event driven
    const handleSubmit = (event) => {
        event.preventDefault();
        if(validate())
            alert("All good")
    };


    useEffect(() => {
    },[values])

    return(
        <Form>
            <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                    <Controls.Input
                        name="clinicName" 
                        label="Clinic Name"
                        value={values.clinicName}
                        onChange={handleInputChange}
                        error={errors.clinicName}
                    />
                    <Controls.Input
                        name="clinicAddress1" 
                        label="Street Address"
                        value={values.clinicAddress1}
                        onChange={handleInputChange}
                        error={errors.clinicAddress1}
                    />
                    <Controls.Input 
                        name="clinicAddress2"
                        label="PO Box, Apt, Suite"
                        value={values.clinicAddress2}
                        onChange={handleInputChange}
                        error={errors.clinicAddress2}
                    />
                    <Controls.Input
                        name="clinicCity"
                        label="City Name"
                        value={values.clinicCity}
                        onChange={handleInputChange}
                        error={errors.clinicCity}
                   />
                    <Controls.Input
                        name="clinicState"
                        label="City Name"
                        value={values.clinicState}
                        onChange={handleInputChange}
                        error={errors.clinicState}
                   />
                    <Controls.Input
                        name="clinicZip"
                        label="City Name"
                        value={values.clinicZip}
                        onChange={handleInputChange}
                        error={errors.clinicZip}
                   />                                   
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="clinicPhone"
                        label="Clinic Main Phone"
                        value={values.clinicPhone}
                        onChange={handleInputChange}
                        error={errors.clinicPhone}
                    />
                    <Controls.Input 
                        name="clinicNPI"
                        label="Has an IEP"
                        value={values.clinicNPI}
                        onChange={handleInputChange}
                        error={errors.clinicNPI}
                    />
                    <Controls.Checkbox 
                        name="clinicIsAGroup"
                        label="In ABA"
                        value={values.clinicIsAGroup}
                        onChange={handleInputChange}
                    />
                    <div styles={{display: "flex"}}>
                        <Controls.Button 
                            type="submit"
                            text="Submit"
                            onClick={handleSubmit}
                        />
                        <Controls.Button 
                            color="default"
                            text="Reset"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}