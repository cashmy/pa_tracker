import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
// import ServiceLayer from '../../services/ServiceLayer';

const initialFValues = {
    providerId: 0,
    providerUserId: '',
    providerFirstName : '',
    providerLastName : '',
    providerEmail: '',
    providerPhone: '',
    providerRcvEmails: false,
    providerRcvNotifications: false,
    providerNPI: '',
    providerTaxonomy: '',
    AssignedStaffUserId: '',
    providerNotes: '',
    providerInactive: false,
}


export default function ProviderForm(props) {
    
    const {addOrEdit, recordForEdit} = props

    // Validation function (to be passed as a callback)
    // TODO: Consider/research using a Switch/Case statement instead
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if('providerFirstName' in fieldValues) 
            temp.providerFirstName = fieldValues.providerFirstName ? "" : "This field is required."
        if('providerLastName' in fieldValues)
            temp.providerLastName = fieldValues.providerLastName ? "" : "This field is required."        
        if('providerPhone' in fieldValues && fieldValues.providerPhone !== "")
            temp.providerPhone = fieldValues.providerPhone.length > 9 ? "" : "Minimum length of 10 digits required" 
        
            // Email validation rules
        if ('providerEmail' in fieldValues && fieldValues.providerRcvEmails === false)
            temp.providerEmail = ""
        if ('providerEmail' in fieldValues && fieldValues.providerRcvEmails === true)
            temp.providerEmail = fieldValues.providerEmail ? "" : "This field is required." 
        if ('providerEmail' in fieldValues && temp.providerEmail === "")
            temp.providerEmail = (/$^|.+@.+..+/).test(fieldValues.providerEmail) ? "" : "Email is not a valid format."
        
        // NPI validation rules
        if ('providerNPI' in fieldValues)
            temp.providerNPI = fieldValues.providerNPI ? "" : "This field is required."        
        if('providerNPI' in fieldValues && temp.providerNPI === "")
            temp.providerNPI = fieldValues.providerNPI.length > 9 ? "" : "Minimum length of 10 digits required"
    

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
        console.log("Provider table load")
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
                        name="providerFirstName" 
                        label="First Name"
                        value={values.providerFirstName}
                        onChange={handleInputChange}
                        error={errors.providerFirstName}
                    />
                    <Controls.Input
                        name="providerLastName" 
                        label="Last Name"
                        value={values.providerLastName}
                        onChange={handleInputChange}
                        error={errors.providerLastName}
                    />
                    <Controls.Input 
                        name="providerEmail"
                        type="email"
                        label="Email"
                        value={values.providerEmail}
                        onChange={handleInputChange}
                        error={errors.providerEmail}
                    />
                    <Controls.Input
                        name="providerPhone"
                        label="Phone"
                        value={values.providerPhone}
                        onChange={handleInputChange}
                        error={errors.providerPhone}
                    />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display: "flex"}} > 
                        <Controls.Input 
                            name="providerNPI"
                            label="NPI Number"
                            value={values.providerNPI}
                            onChange={handleInputChange}
                            fullWidth={false}
                            error={errors.providerNPI}
                        />
                        <Controls.Input
                            name="providerTaxonomy"
                            label="Taxonomy"
                            value={values.providerTaxonomy}
                            onChange={handleInputChange}
                            fullWidth={false}
                            error={errors.providerTaxonomy}
                        />
                    </div>
                    <div style={{display: "flex"}} >
                        <Grid item xs={6}>
                            <Controls.Checkbox 
                                name="providerRcvEmails"
                                label="Rcv Emails"s
                                value={values.providerRcvEmails}
                                onChange={handleInputChange}
                                />
                        </Grid>
                        <Grid item xs={6} >
                            <Controls.Checkbox 
                                name="providerRcvNotifications"
                                label="Rcv Notifications"
                                value={values.providerRcvNotifications}
                                onChange={handleInputChange}
                                />
                        </Grid>
                    </div>

                    <Grid>
                        <Controls.Input
                            name="providerUserId"
                            label="User Name"
                            value={values.providerUserId}
                            onChange={handleInputChange}
                            error={errors.providerUserId}
                        />
                        <Controls.Checkbox 
                            name="providerInactive"
                            label="Inactive"
                            labelPlacement="end"
                            value={values.providerInactive}
                            onChange={handleInputChange}
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
            </Grid>
        </Form>
    )
}