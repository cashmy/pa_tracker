import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
// import ServiceLayer from '../../services/ServiceLayer';

const initialFValues = {
    statusId: 0,
    statusName: '',
    statusColor : '',
    statusTextColor : '',
    displayOnSummary: false,
}


export default function StatusForm(props) {
    
    const {addOrEdit, recordForEdit} = props

    // Validation function (to be passed as a callback)
    // TODO: Consider/research using a Switch/Case statement instead
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if('statusName' in fieldValues) 
            temp.statusName = fieldValues.statusName ? "" : "This field is required."
        if('statusColor' in fieldValues)
            temp.statusColor = fieldValues.statusColor ? "" : "This field is required."        
        if('statusTextColor' in fieldValues)
            temp.statusTextColor = fieldValues.statusTextColor ? "" :  "This field is required."       

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
                        name="statusName" 
                        label="Name"
                        value={values.statusName}
                        onChange={handleInputChange}
                        error={errors.statusName}
                    />
                    <Controls.Input
                        name="statusColor" 
                        label="Color (Background)"
                        value={values.statusColor}
                        onChange={handleInputChange}
                        error={errors.statusColor}
                    />
                    <Controls.Input 
                        name="statusTextColor"
                        label="Text Color"
                        value={values.statusTextColor}
                        onChange={handleInputChange}
                        error={errors.statusTextColor}
                    />
                    <Controls.Checkbox 
                        name="displayOnSummary"
                        label="Display on Dashboard"
                        value={values.displayOnSummary}
                        onChange={handleInputChange}
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