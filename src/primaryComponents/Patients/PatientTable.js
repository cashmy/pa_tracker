import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';
import Controls from '../../components/controls/Controls';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  toolbar: {
      justifyContent: 'flex-end',
    }
  }
))

const handleEditRow = (id) => {
  alert(`Editing Row for : ${id}`)
}

const handleDeleteRow = (id) => {
  alert(`Deleting Row for : ${id}`)
}

function getFullName(params) {
  return `${params.getValue(params.id, 'PatientLastName') || ''}, ${
    params.getValue(params.id, 'PatientFirstName') || ''
  }`;
}

const columns  = [
  { field: 'id', headerName: 'ID', width: 90, hide: true},
  { field: 'PatientLastName', headerName: 'Last name', width: 150, hide: true },
  { field: 'PatientFirstName', headerName: 'First name', width: 150, hide: true },
  { field: 'fullName',
    headerName: 'Full name',
    width: 150,
    valueGetter: getFullName,
    sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString())
  },
  { field: 'PatientDOB', headerName: 'DOB', type: 'date', width: 150},
  { field: 'PatientClass', headerName: 'Class', width: 120 },
  { field: 'PatientHaveIEP', 
    headerName: 'IEP', 
    valueGetter: (params) => {
      if (params.row.PatientHaveIEP === true) {
        return 'Y';
      } else if (params.row.PatientHaveIEP === false) {
        return 'N';
      }
    }
  },
  { field: 'PatientInABA', 
    headerName: 'ABA', 
    width: 105,
    valueGetter: (params) => {
      if (params.row.PatientInABA === true) {
        return 'Y';
      } else if (params.row.PatientInABA === false) {
        return 'N';
      }
    } 
  },
  { field: 'PatientInactive', 
    headerName: 'InActv', 
    width: 150,
    valueGetter: (params) => {
      if (params.row.PatientInactive === true) {
        return 'Y';
      } else if (params.row.PatientInactive === false) {
        return 'N';
      }
    },
  },
  { field: 'actions', 
    headerName: 'Actions', 
    width: 150, 
    renderCell: (params: GridCellParams) => (
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

const rows = [
  { id: 1, PatientLastName: 'Quest', PatientFirstName: 'Johnny', PatientDOB: 'July 15, 1961', PatientHaveIEP: false, PatientInABA: true, PatientClass: 'CO', PatientInactive: true},
  { id: 2, PatientLastName: 'Quest', PatientFirstName: 'Hadji', PatientDOB: 'September 20, 1962', PatientHaveIEP: false, PatientInABA: false, PatientClass: 'CO', PatientInactive: false},
];

export default function DataGridDemo() {
  const classes = useStyles();
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        classes={{
          toolbar: classes.toolbar,
        }}
        rows={rows} 
        columns={columns} 
        pageSize={5} 
        // checkboxSelection 
        components={{
            Toolbar: GridToolbar,
          }}
    />
    </div>
  );
}