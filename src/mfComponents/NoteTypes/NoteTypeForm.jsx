import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';

const initialFValues = {
    noteTypeId: 0,
    noteTypeName: '',
}


export default function CPTCodeForm(props) {
    
    const {addOrEdit, recordForEdit} = props

    // Validation function (to be passed as a callback)
    // TODO: Consider/research using a Switch/Case statement instead
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if('noteTypeName' in fieldValues)
            temp.noteTypeName = fieldValues.noteTypeName ? "" : "This field is required."             

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
        console.log("CPT table load")
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
                        name="noteTypeName" 
                        label="Description"
                        value={values.noteTypeName}
                        onChange={handleInputChange}
                        error={errors.noteTypeName}
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