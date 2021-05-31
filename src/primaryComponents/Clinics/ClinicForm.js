import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
// import ServiceLayer from '../../services/ServiceLayer';

const initialFValues = {
    clinicId: 0,
    clinicName : '',
    clinicAddress1 : '',
    clinicAddress2: '',
    clinicCity: '',
    clinicState: '',
    clinicZip: '',
    clinicPhone: '',
    clinicNPI: '',
    clinicIsAGroup: false,
}


export default function ClinicForm(props) {
    
    const {addOrEdit, recordForEdit} = props

    // Validation function (to be passed as a callback)
    // TODO: Consider/research using a Switch/Case statement instead
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if('clinicName' in fieldValues) 
            temp.clinicName = fieldValues.clinicName ? "" : "This field is required." 
        if('clinicState' in fieldValues)
                temp.clinicState = fieldValues.clinicState.length ? "" : "This field is required."
        if('clinicState' in fieldValues && temp.clinicState === "")
                temp.clinicState = fieldValues.clinicState.length > 1 ? "" : "Min of 2 letters - use abbrievation."
        if('clinicState' in fieldValues && temp.clinicState === "")
                temp.clinicState = fieldValues.clinicState.length < 3 ? "" : "Max of 2 letters - use abbrievation."
        if('clinicNPI' in fieldValues)
            temp.clinicNPI = fieldValues.clinicNPI ? "" : "This field is required."
        if('clinicNPI' in fieldValues && temp.clinicNPI === "")
            temp.clinicNPI = fieldValues.clinicNPI.length > 9 ? "" : "Minimum length of 10 digits required"
        // temp.moble = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required"
        // temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not a valid format"
        setErrors({
            ...temp
        })
    
        // Check that every item in the array has a blank result (no errors) else return false.
        if(fieldValues === values)
        return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues);
    
    // SaveSubmit Callback handler - event driven
    const handleSubmit = (event) => {
        event.preventDefault();
        if(validate())
            addOrEdit(values, resetForm);
    };


    useEffect(() => {
        if(recordForEdit != null) 
        setValues({
            ...recordForEdit
        }) 
    },[recordForEdit])

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
                   <div style={{display: "flex"}} > 
                        <Controls.Input
                            name="clinicState"
                            label="State"
                            value={values.clinicState}
                            onChange={handleInputChange}
                            fullWidth={false}
                            error={errors.clinicState}
                        />
                        <Controls.Input
                            name="clinicZip"
                            label="Zip"
                            value={values.clinicZip}
                            onChange={handleInputChange}
                            fullWidth={false}
                            error={errors.clinicZip}
                        />                  
                   </div>                 
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
                        label="NPI Number"
                        value={values.clinicNPI}
                        onChange={handleInputChange}
                        error={errors.clinicNPI}
                    />
                    <Controls.Checkbox 
                        name="clinicIsAGroup"
                        label="Clinic is a Group"
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