import React, { useEffect, useState } from 'react';
import { InputAdornment, Paper, makeStyles, Fab, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
// Icons
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { ReactComponent as SpecialtyIcon } from '../../assets/svg_icons/specialty.svg'
// Wrapped Components
import Controls from '../../components/controls/Controls';
import PageHeader from '../../components/PageHeader/PageHeader';
import useTable from "../../components/useTable"
// Service Layer
import SpecialtyService from '../../services/specialty.service';
// Primary CRUD Child Component
import SpecialtyForm from './SpecialtyForm';


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
    { id: 'treatmentCode', label: 'Specialty Code' },
    { id: 'treatmentName', label: 'Name' },
    { id: 'actions', label: 'Actions', disableSorting: true },
]

export default function SpecialtyTable() {

    const classes = useStyles();
    const [mode, setMode] = useState("");
    const [loadData, setLoadData] = useState(true)
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords] = useState([]);
    // Initialize with a default filter of all records, bypasses initial load error
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({isOpen: false, message: '', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''})


    useEffect(() => {
        getSpecialties()
    }, [loadData])
        
    async function getSpecialties() {
        try {
            const response = await SpecialtyService.getAllSpecialties();
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
                        x.treatmentName.toLowerCase().includes(target.value.toLowerCase()) 
                    ))
            }
        })
    }

    const addOrEdit = (cptCode, resetForm) => {
        if (mode === "ADD") {
            SpecialtyService.addSpecialty(cptCode)
            setLoadData(true); // Request reload of data
        }
        else {
            SpecialtyService.updateSpecialty(cptCode) 
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

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
        SpecialtyService.deleteSpecialty(id)
        setLoadData(true);
        setNotify({
            isOpen: true,
            message: 'Record deleted',
            type: 'error'
        })
    }

    return (
        <>
            <PageHeader
                title="Specialties"
                subtitle="List of available Specialties/Therapies"
                icon={<SpecialtyIcon />}
                isSvg={true}
            />

            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input 
                        label="Search Description"
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
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); setMode("ADD");}}
                        >
                        <AddIcon />
                    </Fab>   
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.treatmentCode}>
                                    <TableCell>{item.treatmentCode}</TableCell>
                                    <TableCell>{item.treatmentName}</TableCell>
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
                                                    title:"Are you sure you want to delete this Specialty?",
                                                    subTitle: "You can't undo this action.",
                                                    onConfirm:() => { onDelete(item.providerId) },
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
                title="Specialty Form"
            >
                <SpecialtyForm 
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
    )

}