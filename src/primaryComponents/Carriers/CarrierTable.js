import React, { useEffect, useState } from 'react';
import { InputAdornment, Paper, makeStyles, Fab, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
// Icons
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People'; // Carriers

// Wrapped Components
import Controls from '../../components/controls/Controls';
import PageHeader from '../../components/PageHeader/PageHeader';
import useTable from "../../components/useTable"
// Service Layer
import CarrierService from '../../services/carrier.service';
// Primary CRUD Child Component
import CarrierForm from '../../primaryComponents/Carriers/CarrierForm';



const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%',
    },
    addButton: {
        position: 'absolute',
        right: '10px',
    }
}))

const columnCells = [
    { id: 'carrierName', label: 'Name' },
    { id: 'carrierShortName', label: 'Short Name' },
    { id: 'carrierContactName', label: 'Contact' },
    { id: 'carrierEmail', label: 'Email'},
    { id: 'carrierContactPhone', label: 'Contact Phone', disableSorting: true },
    { id: 'carrierProviderPhone', label: 'Provider Phone', disableSorting: true },
    { id: 'carrierClass', label: 'Class' },
    { id: 'actions', label: 'Actions', disableSorting: true },
]

export default function CarrierTable() {

    const classes = useStyles();
    const [loadData, setLoadData] = useState(true)
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords] = useState([]);
    // Initialize with a default filter of all records, bypasses initial load error
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({isOpen: false, message: '', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''})


    useEffect(() => {
        getCarriers()
    }, [loadData])
        
    async function getCarriers() {
        try {
            const response = await CarrierService.getAllCarriers();
            setRecords(response.data);
            setLoadData(false)
        }
        catch (e) {
            console.log('API call unsuccessful', e)
        }
    }
    
    const { 
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, columnCells, filterFn );

    const handleSearch = e => {
        let target = e.target;
        // state can't store functions, so we are storing an object with the function internally defined.
        setFilterFn({
            fn: items => {
                // target.value is the search box contents
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => (
                        x.carrierName.toLowerCase().includes(target.value.toLowerCase()) 
                        || x.carrierShortName.toLowerCase().includes(target.value.toLowerCase())
                        || x.carrierContactName.toLowerCase().includes(target.value.toLowerCase())
                        || x.carrierContactEmail.toLowerCase().includes(target.value.toLowerCase())
                        || x.carrierClass.toLowerCase().includes(target.value.toLowerCase())
                    ))
            }
        })
    }

    const addOrEdit = (carrier, resetForm) => {
        if (carrier.carrierId === 0) {
            CarrierService.addCarrier(carrier)
            setLoadData(true); // Request reload of data
        }
        else {
            CarrierService.updateCarrier(carrier) 
            setLoadData(true); // Request reload of data
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false) // Close Popup modal
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        CarrierService.deleteCarrier(id)
        setLoadData(true);
        setNotify({
            isOpen: true,
            message: 'Record deleted',
            type: 'error'
        })
    }

    return (
        <React.Fragment>
            <PageHeader
                title="Carriers"
                subtitle="List of available Insurance Carrier"
                icon={<PeopleIcon />}
                isSvg={true}
            />

            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input 
                        label="Search Name, Short Name, Contact, Email, and Class"
                        fullWidth={false}
                        className ={classes.searchInput}
                        InputProps={{
                            startAdornment:(<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment> )
                        }}
                        onChange={handleSearch}
                    />
                    {/* <Switch></Switch> */}
                    <Fab 
                        className={classes.addButton}
                        color="secondary" 
                        aria-label="add"
                        size="small"
                        onClick={() => {setOpenPopup(true); setRecordForEdit(null);}}
                        >
                        <AddIcon />
                    </Fab>   
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.carrierId}>
                                    <TableCell>{item.carrierName}</TableCell>
                                    <TableCell>{item.carrierShortName}</TableCell>
                                    <TableCell>{item.carrierContactName}</TableCell>
                                    <TableCell>{item.carrierContactEmail}</TableCell>
                                    <TableCell>{item.carrierContactPhone}</TableCell>
                                    <TableCell>{item.carrierProviderPhone}</TableCell>
                                    <TableCell>{item.carrierClass}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            size="large"
                                            onClick = {() => openInPopup(item)}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen:true,
                                                    title:"Are you sure you want to delete this Carrier?",
                                                    subTitle: "You can't undo this action.",
                                                    onConfirm:() => { onDelete(item.carrierId) },
                                                })
                                            }}>
                                            <DeleteIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Controls.Popup
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                title="Carrier Form"
            >
                <CarrierForm 
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
        </React.Fragment>
    )

}