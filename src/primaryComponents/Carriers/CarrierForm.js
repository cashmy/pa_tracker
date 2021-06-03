import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import ServiceLayer from '../../services/ServiceLayer';

const initialFValues = {
    carrierId: 0,
    carrierName : '',
    carrierShortName : '',
    carrierContactName: '',
    carrierContactEmail: '',
    carrierContactPhone: '',
    carrierProviderPhone: '',
    carrierNotes: '',
    carrierClass: '',
    carrierPARequired: true,
}


export default function ProviderForm(props) {
    
    const {addOrEdit, recordForEdit} = props

    // Validation function (to be passed as a callback)
    // TODO: Consider/research using a Switch/Case statement instead
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if('carrierName' in fieldValues) 
            temp.carrierName = fieldValues.carrierName ? "" : "This field is required."
        if ('carrierShortName' in fieldValues)
            temp.carrierShortName = fieldValues.carrierShortName ? "" : "This field is required."        
        if ('carrierShortName' in fieldValues && temp.carrierShortName === "")    
            temp.carrierShortName = fieldValues.carrierShortName.length < 6 ? "" : "Maximum length of 6 characters required"
        
        if ('carrierContactEmail' in fieldValues)
            temp.carrierContactEmail = (/$^|.+@.+..+/).test(fieldValues.carrierContactEmail) ? "" : "Email is not a valid format."
        if('carrierContactPhone' in fieldValues && fieldValues.carrierContactPhone !== "")
            temp.carrierContactPhone = fieldValues.carrierContactPhone.length > 9 ? "" : "Minimum length of 10 digits required" 
        if('carrierProviderPhone' in fieldValues && fieldValues.carrierProviderPhone !== "")
            temp.carrierProviderPhone = fieldValues.carrierProviderPhone.length > 9 ? "" : "Minimum length of 10 digits required"
        if('carrierClass' in fieldValues)
            temp.carrierClass = fieldValues.carrierClass ? "" : "This field is required."

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
                <Grid item xs={6}>
                    <Controls.Input
                        name="carrierName" 
                        label="Name"
                        value={values.carrierName}
                        onChange={handleInputChange}
                        error={errors.carrierName}
                    />
                    <Controls.Input
                        name="carrierShortName" 
                        label="Short Name"
                        value={values.carrierShortName}
                        onChange={handleInputChange}
                        error={errors.carrierShortName}
                        fullWidth={false}
                    />
                    <Controls.Input
                        name="carrierContactName" 
                        label="Contact Name"
                        value={values.carrierContactName}
                        onChange={handleInputChange}
                        error={errors.carrierContactName}
                    />
                    <Controls.Input 
                        name="carrierContactEmail"
                        type="email"
                        label="Contact Email"
                        value={values.carrierContactEmail}
                        onChange={handleInputChange}
                        error={errors.carrierContactEmail}
                    />
                    <Controls.Input
                        name="carrierContactPhone"
                        label="Contact Phone"
                        value={values.carrierContactPhone}
                        onChange={handleInputChange}
                        error={errors.carrierContactPhone}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="carrierProviderPhone"
                        label="Provider Phone"
                        value={values.carrierProviderPhone}
                        onChange={handleInputChange}
                        error={errors.carrierProviderPhone}
                    />
                    <Controls.Select
                        name="patientClass"
                        label="Financial Class"
                        value={values.patientClass}
                        onChange={handleInputChange}
                        options = {ServiceLayer.getAllFinancialClasses() }
                        error={errors.patientClass}
                    />
                    <Controls.Checkbox 
                        name="carrierPARequired"
                        label="Prior Authorizations Required"
                        labelPlacement="end"
                        value={values.carrierPARequired}
                        onChange={handleInputChange}
                        error={errors.carrierPARequired}
                    />
                    <Grid styles={{display: "flex"}}>
                        <Controls.Input 
                            name="providerNotes"
                            label="Notes"
                            value={values.providerNotes}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rowsMax={4}
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
            </Grid>
        </Form>
    )
}