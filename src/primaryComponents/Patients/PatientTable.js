import React, {useEffect, useState} from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { IconButton, InputAdornment, Paper, makeStyles, Fab } from '@material-ui/core';
// Icons
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { ReactComponent as PatientIcon } from '../../assets/svg_icons/patient.svg'
// Wrapped Components
import Controls from '../../components/controls/Controls';
import PageHeader from '../../components/PageHeader/PageHeader';
// Service Layer
import PatientService from '../../services/patient.service';
// Primary CRUD Child Component
import PatientForm from './PatientForm';


// ***** Styles *****
const useStyles = makeStyles((theme) => ({
  pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
  },
  searchInput: {
      width: '75%',
  },
  multiLineDesc: {
      width: '50%',
  },
  addButton: {
      position: 'absolute',
      right: '10px',
  },
  toolbar: {
      justifyContent: 'flex-end',
    }
  }
))



// ***** Event Handlers *****
const handleEditRow = (id) => {
  alert(`Editing Row for : ${id}`)
  
}

const handleDeleteRow = (id) => {
  alert(`Deleting Row for : ${id}`)
}

// ***** Table Header Declarations & Helper Functions *****
function getFullName(params) {
  return `${params.getValue(params.id, 'patientLastName') || ''}, ${
    params.getValue(params.id, 'patientFirstName') || ''
  }`;
}

const columns  = [
  { field: 'id', headerName: 'ID', width: 90, hide: true},
  { field: 'patientLastName', headerName: 'Last name', width: 150, hide: true },
  { field: 'patientFirstName', headerName: 'First name', width: 150, hide: true },
  { field: 'fullName',
    headerName: 'Full name',
    width: 150,
    valueGetter: getFullName,
    sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString())
  },
  { field: 'patientDOB', 
    headerName: 'DOB', 
    type: 'date', 
    width: 150,
    // valueFormatter: (params) => params.value.getFullYear(),
    valueFormatter: (params) => {return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(params.value)} 
  },
  { field: 'patientClass', headerName: 'Class', width: 120 },
  { field: 'patientHaveIEP', 
    headerName: 'IEP', 
    valueGetter: (params) => {
      if (params.row.patientHaveIEP === true) {
        return 'Y';
      } else if (params.row.patientHaveIEP === false) {
        return 'N';
      }
    }
  },
  { field: 'patientInABA', 
    headerName: 'ABA', 
    width: 105,
    valueGetter: (params) => {
      if (params.row.patientInABA === true) {
        return 'Y';
      } else if (params.row.patientInABA === false) {
        return 'N';
      }
    } 
  },
  { field: 'patientInactive', 
    headerName: 'InActv', 
    width: 150,
    valueGetter: (params) => {
      if (params.row.patientInactive === true) {
        return 'Y';
      } else if (params.row.patientInactive === false) {
        return 'N';
      }
    },
  },
  { field: 'actions', 
    headerName: 'Actions', 
    width: 150, 
    renderCell: (params) => (
      <div>
      <IconButton
        aria-label="delete"
        onClick={() => handleEditRow(params.row.id)}
        color="primary"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        onClick={() => handleDeleteRow(params.row.id)}
        color="secondary"
      >
        <DeleteIcon />
    </IconButton>
    </div>

    ),
  }
];


// ***** Main Function *****
export default function DataGridDemo() {
  const classes = useStyles();
  const [mode, setMode] = useState("");
  const [patients, setPatients] = useState([])
  const [loadData, setLoadData] = useState(true)
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false)
  const [notify, setNotify] = useState({isOpen: false, message: '', type:''})
  const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''})


  useEffect(() => {
    getPatients();
  },[loadData])
  
  async function getPatients(e){
    try{
        const response = await PatientService.getAllPatients();
        setPatients(response.data);
        setLoadData(false)
    }
    catch(e){
        console.log('API call unsuccessful', e)
    }
  }
  
  const mapPatients = () => {
    let mapResult = patients.map((patient, i) => {
        // Need "id" only for DataGrid to work (operates as key)
        patient.id = patient.patientId
        // Transmute date to ISO Long date for JS
        patient.patientDOB = new Date(patient.patientDOB) 
        return patient;
    });
    return mapResult
  }
  
  // const openInPopup = item => {
  //     setRecordForEdit(item)
  //     setOpenPopup(true)
  // }
  
  
  const addOrEdit = (patient, resetForm) => {
      if (mode === "ADD") {
          PatientService.addPatient(patient)
          setLoadData(true); // Request reload of data
      }
      else {
          PatientService.updatePatient(patient) 
          setLoadData(true); // Request reload of data
      }
      resetForm()
      setMode("")
      setRecordForEdit(null)
      setOpenPopup(false) // Close Popup modal
      setNotify({
          isOpen: true,
          message: 'Submitted Successfully',
          type: 'success'
      })
  }

  return (
    <>
      <PageHeader
        title="Patients"
        subtitle="List of patients"
        icon={<PatientIcon />}
        isSvg={true}
        />
      <Paper className={classes.pageContent}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid 
            classes={{
              toolbar: classes.toolbar,
            }}
            rows={mapPatients()}
            columns={columns} 
            pageSize={5} 
            // checkboxSelection 
            components={{
                Toolbar: GridToolbar,
              }}
          />
        </div>
      </Paper >
      <Controls.Popup
          openPopup = {openPopup}
          setOpenPopup = {setOpenPopup}
          title="Patient Form"
      >
          <PatientForm 
              recordForEdit={recordForEdit}
              addOrEdit={addOrEdit}
          />
      </Controls.Popup>
      <Controls.Notification
          notify={notify}
          setNotify={setNotify}
      />
      <Controls.ConfirmDialog 
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}