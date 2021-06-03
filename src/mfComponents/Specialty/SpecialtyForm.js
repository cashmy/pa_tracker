import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';

const initialFValues = {
    treatmentCode: '',
    treatmentName: '',
}


export default function SpecialtyCodeForm(props) {
    
    const {addOrEdit, recordForEdit} = props

    // Validation function (to be passed as a callback)
    // TODO: Consider/research using a Switch/Case statement instead
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if('treatmentCode' in fieldValues) 
            temp.treatmentCode = fieldValues.treatmentCode ? "" : "This field is required."
        if('treatmentName' in fieldValues)
            temp.treatmentName = fieldValues.treatmentName ? "" : "This field is required."             

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
    },[recordForEdit],setValues)

    return(
        <Form>
            <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                    <Controls.Input
                        name="treatmentCode" 
                        label="Specialty Code"
                        fullWidth="false"
                        value={values.treatmentCode}
                        onChange={handleInputChange}
                        error={errors.treatmentCode}
                    />
                    <Controls.Input
                        name="treatmentName" 
                        label="Specialty Name"
                        value={values.treatmentName}
                        onChange={handleInputChange}
                        error={errors.treatmentName}
                    />
                        <Grid styles={{display: "flex"}}>
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
            </Grid>
        </Form>
    )
}