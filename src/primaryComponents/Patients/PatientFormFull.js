import React, { useEffect } from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import ServiceLayer from '../../services/ServiceLayer';
import PageHeader from '../../components/PageHeader/PageHeader';
import { ReactComponent as PatientIcon } from '../../assets/svg_icons/patient.svg'

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        maxWidth: '1200px',
        alignContent: 'center',
        justifyContent: 'center'
    },
}))

const genderItems = [
    {id:'male', title:'Male'},
    {id:'female', title:'Female'},
    {id:'other', title:'Other'} ,
]

const initialFValues = {
    patientId: 0,
    patientFirstName : '',
    patientLastName : '',
    patientDOB: null,
    patientGender: '',
    patientClass: '',
    patientHaveIEP: false,
    patientInABA: false,
    patientNotes: '',
    patientInactive: false
}

export default function PatientForm(props) {
    
    const classes = useStyles()
    const {addOrEdit, recordForEdit} = props

    // Validation function (to be passed as a callback)
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if('patientFirstName' in fieldValues) 
            temp.patientFirstName = fieldValues.patientFirstName ? "" : "This field is required." 
        if('patientLastName' in fieldValues)
            temp.patientLastName = fieldValues.patientLastName ? "" : "This field is required."
        if('patientDOB' in fieldValues)
            temp.patientDOB = fieldValues.patientDOB ? "" : "This field is required."
        if('patientClass' in fieldValues)
            temp.patientClass = fieldValues.patientClass ? "" : "This field is required."
        if('patientGender' in fieldValues)
            temp.patientGender = fieldValues.patientGender ? "" : "This field is required."
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
     }, [recordForEdit], setValues)
    
    return (
        <>
            <PageHeader
                title="Patient"
                subtitle="Add/Edit Patient Information"
                icon={<PatientIcon />}
                isSvg={true}
            />
            <Paper className={classes.pageContent}>
                <Form>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item xs={6}>
                            <Controls.Input
                                name="patientFirstName" 
                                label="FirstName"
                                value={values.patientFirstName}
                                onChange={handleInputChange}
                                error={errors.patientFirstName}
                            />
                            <Controls.Input
                                name="patientLastName" 
                                label="LastName"
                                value={values.patientLastName}
                                onChange={handleInputChange}
                                error={errors.patientLastName}
                            />
                            <Controls.DatePicker 
                                name="patientDOB"
                                label="Date of Birth"
                                value={values.patientDOB}
                                onChange={handleInputChange}
                                error={errors.patientDOB}
                            />
                            <Controls.RadioGroup
                                name="patientGender"
                                label="Gender"
                                value={values.patientGender}
                                onChange={handleInputChange}
                                items={genderItems}
                                error={errors.patientGender}
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <Controls.Select
                                name="patientClass"
                                label="Financial Class"
                                value={values.patientClass}
                                onChange={handleInputChange}
                                options = {ServiceLayer.getAllFinancialClasses() }
                                error={errors.patientClass}
                            />
                            <Controls.Checkbox 
                                name="patientHaveIEP"
                                label="Has an IEP"
                                value={values.patientHaveIEP}
                                onChange={handleInputChange}
                            />
                            <Controls.Checkbox 
                                name="patientInABA"
                                label="In ABA"
                                value={values.patientInIEP}
                                onChange={handleInputChange}
                            />
                            <Controls.Checkbox 
                                name="patientInactive"
                                label="InActive"
                                value={values.patientInactive}
                                onChange={handleInputChange}
                                color="secondary"
                            />
                        </Grid>
                        <Grid item xs={12} styles={{display: "flex"}}>
                            <Controls.Input 
                                name="patientNotes"
                                label="Notes"
                                value={values.patientNotes}
                                onChange={handleInputChange}
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
                </Form>
            </Paper>
        </>
    )
}