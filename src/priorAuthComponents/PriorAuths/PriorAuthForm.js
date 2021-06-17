import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import ServiceLayer from '../../services/ServiceLayer'; // Users
import PriorAuthService from '../../services/priorAuth.service';
import PatientService from '../../services/patient.service';
import CarrierService from '../../services/carrier.service';
import StatusService from '../../services/status.service';
import SpecialtyService from '../../services/specialty.service';
import PlaceOfService from '../../services/placeOfService.service';
import ProviderService from '../../services/provider.service';
import ClinicService from '../../services/clinic.service';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: 880, height: 425 }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const frequency = [
    { id: '1x/week', title: '1x/week' },
    { id: '2x/week', title: '2x/week' },
    { id: '1x/month', title: '1x/month' }
]

const carrPostion = [
    { id: 'P', title: 'Primary' },
    { id: 'S', title: 'Secondary' },
    { id: 'T', title: 'Tertiary' }
]

const initialFValues = {
    id: 0,
    paPatientId : 0,
    paCarrierId: 0,
    paCarrierPosition: 'P',
    paStatus: 0,
    paTreatmentCode: '',
    paServiceCode: '',
    paProviderId: 0,
    paAssignedStaff: '',
    paClinicId: '',
    paRequestDate: new Date().toLocaleString(),
    paLastEvalDate: null,
    paLastPOCDate: null,
    PAVisitFrequency: '2x/week',
    paRqstNumbrVisits: 0,
    paStartDate: null,
    paExpireDate: null,
    paAuthId: '',
    paExpiredWarnNotification: false,
    paExpiredNotification: false,
    paArchived: false
}

export default function PAForm(props) {
    const { addOrEdit, recordForEdit } = props
    
    const [selectPatients, setSelectPatients] = useState([])
    const [selectCarriers, setSelectCarriers] = useState([])
    const [selectStatuses, setSelectStatuses] = useState([])
    const [selectSpecialties, setSelectSpecialties] = useState([])
    const [selectPlacesOfService, setSelectPlacesOfService] = useState([])
    const [selectProviders, setSelectProviders] = useState([])
    const [selectClinics, setSelectClinics] = useState([])
    const [selectUsers, setSelectUsers] = useState([])
    const [value, setValue] = React.useState(0);

    // Handle tab change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    useEffect(() => {
        getPatientsSelect()
        getCarriersSelect()
        getStatusesSelect()
        getSpecialtiesSelect()
        getPlacesOfServiceSelect()
        getProvidersSelect()
        getClinicsSelect()
        getUsersSelect()
    },[])
    
    // Validation function (to be passed as a callback)
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if('paPatientId' in fieldValues) 
            temp.paPatientId = fieldValues.paPatientId ? "" : "This field is required." 
        if('paCarrierId' in fieldValues)
            temp.paCarrierId = fieldValues.paCarrierId ? "" : "This field is required."
        if('paCarrierPosition' in fieldValues)
            temp.paCarrierPosition = fieldValues.paCarrierPosition ? "" : "This field is required."
        if('paStatus' in fieldValues)
            temp.paStatus = fieldValues.paStatus ? "" : "This field is required."
        if('paTreatmentCode' in fieldValues)
            temp.paTreatmentCode = fieldValues.paTreatmentCode ? "" : "This field is required."
        if('paProviderId' in fieldValues)
            temp.paProviderId = fieldValues.paProviderId ? "" : "This field is required."
        if('paClinicId' in fieldValues)
            temp.paClinicId = fieldValues.paClinicId ? "" : "This field is required."
        if('paRequestDate' in fieldValues)
            temp.paRequestDate = fieldValues.paRequestDate ? "" : "This field is required."
        
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
            alert("All good")
    };

    async function getPatientsSelect(){
        try{
            const response = await PatientService.getAllPatients();
            let items = response.data
            const newItems = []
            for (const [index, item] of items.entries()) {
                newItems.push( { id: item.patientId, title: item.patientLastName + ', ' + item.patientFirstName })
            }
            setSelectPatients(newItems)
            return newItems
      } catch(e){
            console.log('Patient API call unsuccessful', e)
        }
    }

    async function getCarriersSelect() {
        try {
            const response = await CarrierService.getAllCarriers();
            let items = response.data
            const newItems = []
            for (const [index, item] of items.entries()) {
                newItems.push( { id: item.carrierId, title: item.carrierShortName + ' - ' + item.carrierName })
            }
            setSelectCarriers(newItems)
            return newItems
         }
        catch(e) {console.log('Carrier API call unsuccessful', e) }
    }

    async function getStatusesSelect() {
        try {
            const response = await StatusService.getAllStatuses();
            let items = response.data
            const newItems = []
            for (const [index, item] of items.entries()) {
                newItems.push( { id: item.statusId, title: item.statusName })
            }
            setSelectStatuses(newItems)
            return newItems
         }
        catch(e) {console.log('Status API call unsuccessful', e) }
    }

    async function getSpecialtiesSelect() {
        try {
            const response = await SpecialtyService.getAllSpecialties();
            let items = response.data
            const newItems = []
            for (const [index, item] of items.entries()) {
                newItems.push( { id: item.treatmentCode, title: item.treatmentName })
            }
            setSelectSpecialties(newItems)
            return newItems
         }
        catch(e) {console.log('Treatment/Specialty API call unsuccessful', e) }
    }
    
    async function getPlacesOfServiceSelect() {
        try {
            const response = await PlaceOfService.getAllPlacesOfService();
            let items = response.data
            const newItems = []
            for (const [index, item] of items.entries()) {
                newItems.push( { id: item.placeOfServiceCode, title: item.placeOfServiceDesc })
            }
            setSelectPlacesOfService(newItems)
            return newItems
         }
        catch(e) {console.log('Place Of Service API call unsuccessful', e) }
    }
    
    async function getProvidersSelect() {
        try {
            const response = await ProviderService.getAllProviders();
            let items = response.data
            const newItems = []
            for (const [index, item] of items.entries()) {
                newItems.push( { id: item.providerId, title: item.providerLastName + ', ' + item.providerFirstName})
            }
            setSelectProviders(newItems)
            return newItems
         }
        catch(e) {console.log('Provider API call unsuccessful', e) }
    }

     async function getClinicsSelect() {
        try {
            const response = await ClinicService.getAllClinics();
            let items = response.data
            const newItems = []
            for (const [index, item] of items.entries()) {
                newItems.push( { id: item.clinicId, title: item.clinicName })
            }
            setSelectClinics(newItems)
            return newItems
         }
        catch(e) {console.log('Clinc API call unsuccessful', e) }
    }

     async function getUsersSelect() {
        try {
            const response = await ServiceLayer.getAllUsers();
            let items = response.data
            const newItems = []
            for (const [index, item] of items.entries()) {
                newItems.push( { id: item.id, title: item.lastName + ', ' + item.firstName })
            }
            setSelectUsers(newItems)
            return newItems
         }
        catch(e) {console.log('User API call unsuccessful', e) }
    }

    useEffect(() => {
        if(recordForEdit != null) 
        setValues({
            ...recordForEdit
        }) 
    },[recordForEdit],setValues)

    return(
        <Form>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="prior auth form tabs"
                    variant="fullWidth"
                >
                    <Tab label="General" {...a11yProps(0)} />
                    <Tab label="Diagnosis" {...a11yProps(1)} />
                    <Tab label="CPT" {...a11yProps(2)} />
                    <Tab label="Notes" {...a11yProps(3)} />
                </Tabs>
            </AppBar>

            {/* General */}
            <TabPanel value={value} index={0}>
                <Grid container alignItems="flex-start" spacing={2}>

                    <Grid item xs={3}>
                        <Controls.Select
                            name="paPatientId"
                            label="Patient Name"
                            value={values.paPatientId ? values.paPatientId : ""}
                            onChange={handleInputChange}
                            options = {selectPatients }
                            error={errors.paPatientId}
                        />
                        <Controls.Select
                            name="paCarrierId"
                            label="Carrier"
                            value={values.paCarrierId ? values.paCarrierId : ""}
                            onChange={handleInputChange}
                            options = {selectCarriers }
                            error={errors.paCarrierId}
                        />
                        <Controls.Select
                            name="paCarrierPosition"
                            label="Carrier Position"
                            value={values.paCarrierPosition ? values.paCarrierPosition : ""}
                            onChange={handleInputChange}
                            options = {carrPostion}
                            error={errors.paCarrierPosition}
                        />
                        <Controls.Select
                            name="paStatus"
                            label="Status"
                            value={values.paStatus ? values.paStatus : ""}
                            onChange={handleInputChange}
                            options = {selectStatuses }
                            error={errors.paStatus}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controls.Select
                            name="paProviderId"
                            label="Provider"
                            value={values.paProviderId ? values.paProviderId : ""}
                            onChange={handleInputChange}
                            options = {selectProviders }
                            error={errors.paProviderId}
                        />
                        <Controls.Select
                            name="paTreatmentCode"
                            label="Specialty"
                            value={values.paTreatmentCode ? values.paTreatmentCode : ""}
                            onChange={handleInputChange}
                            options = {selectSpecialties }
                            error={errors.paTreatmentCode}
                        />
                        <Controls.Select
                            name="paServiceCode"
                            label="Service Location"
                            value={values.paServiceCode ? values.paServiceCode : ""}
                            onChange={handleInputChange}
                            options = {selectPlacesOfService }
                            error={errors.paServiceCode}
                        />
                        <Controls.Select
                            name="paClinicId"
                            label="Clinic"
                            value={values.paClinicId ? values.paClinicId : ""}
                            onChange={handleInputChange}
                            options = {selectClinics }
                            error={errors.paClinicId}
                        />
                    </Grid>
                    <Grid item xs={3} >
                        <Controls.DatePicker 
                            name="paRequestDate"
                            label="RequestDate"
                            value={values.paRequestDate} 
                            onChange={handleInputChange}
                            error={errors.paRequestDate}
                        />
                        <Controls.Select
                            name="paVisitFrequency"
                            label="Visit Frequency"
                            value={values.paVisitFrequency ? values.paVisitFrequency : ""}
                            onChange={handleInputChange}
                            options = {frequency}
                            error={errors.paVisitFrequency}
                        />
                        <Controls.Input
                            name="PARqstNmbrVisits" 
                            label="Reqstd # Vistis"
                            value={values.PARqstNmbrVisits}
                            onChange={handleInputChange}
                            error={errors.PARqstNmbrVisits}
                        />
                        <Controls.Input
                            name="paAuthId" 
                            variant="filled"
                            label="Auth/Ref Number"
                            value={values.paAuthId}
                            onChange={handleInputChange}
                            error={errors.paAuthId}
                        />
                    </Grid>
                    <Grid item xs={3} >
                        <Controls.DatePicker 
                            name="paLastEvalDate"
                            label="Last Eval Date"
                            value={values.paLastEvalDate}
                            onChange={handleInputChange}
                            error={errors.paLastEvalDate}
                        />
                        <Controls.DatePicker 
                            name="paLastPOCDate"
                            label="Last POC Date"
                            value={values.paLastPOCDate}
                            onChange={handleInputChange}
                            error={errors.paLastPOCDate}
                        />
                        <Controls.DatePicker 
                            name="paStartDate"
                            label="Start Date"
                            value={values.paStartDate}
                            onChange={handleInputChange}
                            error={errors.paStartDate}
                        />
                        <Controls.DatePicker 
                            name="paExpireDate"
                            label="Est Expire Date"
                            value={values.paExpireDate}
                            onChange={handleInputChange}
                            error={errors.paExpireDate}
                        />
                        <Controls.Select
                            name="paAssignedStaff"
                            label="Assigned User"
                            value={values.paAssignedStaff ? values.paAssignedStaff : ""}
                            onChange={handleInputChange}
                            options = {selectUsers }
                            error={errors.paAssignedStaff}
                        />
                    </Grid>
                </Grid>        
            </TabPanel>

            {/* Diagnosis Tab */}
            <TabPanel value={value} index={1}>
                <Grid container alignItems="flex-start" spacing={2}> 
                    <Grid item xs={12} styles={{ display: "flex" }}>
                        <Controls.Input
                            name="diagnosisCodes" 
                            variant="filled"
                            label="DiagnosisCodes"
                            value={values.paDiagCode}
                            onChange={handleInputChange}
                            error={errors.paDiagCode}
                        />
                    </Grid>
                </Grid>
            </TabPanel>

            {/* CPT Codes Tab */}
            <TabPanel value={value} index={2}>
                <Grid container alignItems="flex-start" spacing={2}>            
                    <Grid item xs={12} styles={{ display: "flex" }}>
                            <Controls.Input
                                name="cptCodes" 
                                variant="filled"
                                label="CPT Codes"
                                value={values.paCPTCode}
                                onChange={handleInputChange}
                                error={errors.paCPTCode}
                            />
                     </Grid>
                </Grid>
            </TabPanel>

            {/* Notes Tab */}
            <TabPanel value={value} index={3}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12} styles={{display: "flex"}}>
                        <Controls.Input 
                            name="patientNotes"
                            label="Notes"
                            fullWidth
                            value={values.patientNotes}
                            onChange={handleInputChange}
                            multiline
                            rowsMax={4}
                        />
                    </Grid>
                </Grid>
            </TabPanel>


             <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12} styles={{display: "flex"}}></Grid>
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

        </Form>
    )
}