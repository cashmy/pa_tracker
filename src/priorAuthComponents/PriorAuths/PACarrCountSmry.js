import React, {useEffect, useState} from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { IconButton, Paper, makeStyles } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';

// Service Layer
import PriorAuthService from '../../services/priorAuth.service';


// ***** Styles *****
const useStyles = makeStyles((theme) => ({
  pageContent: {
      margin: theme.spacing(1),
      padding: theme.spacing(1)
  },
  toolbar: {
      justifyContent: 'flex-end',
    }
  }
))

// ***** Event Handlers *****
const handleClickRow = (id) => {
  alert(`Clicked on Row for : ${id}`)
  
}

const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    { field: 'carrierName', headerName: 'Carrier', width: 150 },
    { field: 'carrierShortName', headerName: 'Short name', width: 150 },
    { field: 'count', headerName: "Non Apprvd", width: 175 },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
            <div>
                <IconButton
                    aria-label="edit"
                    onClick={() => handleClickRow(params.row.paProviderId)}
                    color="primary"
                >
                    <PublishIcon />
                </IconButton>
            </div>
        ),
    }
];

export default function PACarrCountSmry() {

    const classes = useStyles();
    const [loadData, setLoadData] = useState(true)
    const [records, setRecords] = useState([])

    useEffect(() => {
        getCarrCounts();
    }, [loadData])
    
    async function getCarrCounts() {
        try {
            const response = await PriorAuthService.getNonApprvdCountForCarriers();
            setRecords(response.data)
            console.log("Response: ". response.data)
            setLoadData(false)
        }
        catch (e) {
            console.log('Carrier Counts API call unsuccessful',e)
        }
    }

    const mapRecords = () => {
        let mapResult = records.map((item, i) => {
            // Need "id" only for DataGrid to work (operates as key)
            item.id = item.paCarrierId
            return item;
        });

        return mapResult
    }
    
    return (
        <>
            <Paper className={classes.pageContent}>
                <div style={{ height: 350, width: '100%' }}>
                    <DataGrid
                        density="compact"
                        classes={{
                            toolbar: classes.toolbar,
                        }}
                        rows={mapRecords()}
                        columns={columns}
                        pageSize={5}
                        // checkboxSelection 
                        // components={{
                        //     Toolbar: GridToolbar,
                        // }}
                    />
                </div>
            </Paper >
        </>
    );
}