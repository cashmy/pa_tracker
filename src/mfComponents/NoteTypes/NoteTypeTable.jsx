import React, { useEffect, useState } from 'react';
import { InputAdornment, Paper, makeStyles, Fab, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
// Icons
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { ReactComponent as NoteTypeIcon } from '../../assets/svg_icons/note_types.svg'
// Wrapped Components
import Controls from '../../components/controls/Controls';
import PageHeader from '../../components/PageHeader/PageHeader';
import useTable from "../../components/useTable"
// Service Layer
import NoteTypeService from '../../services/noteType.service';
// Primary CRUD Child Component
import NoteTypeForm from './NoteTypeForm';


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
    }
}))

const columnCells = [
    { id: 'noteTypeName', label: 'Description' },
    { id: 'actions', label: 'Actions', disableSorting: true },
]

export default function NoteTypeTable() {

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
        getNoteTypes()
    }, [loadData])
        
    async function getNoteTypes() {
        try {
            const response = await NoteTypeService.getAllNoteTypes();
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
                        x.noteTypeName.toLowerCase().includes(target.value.toLowerCase()) 
                    ))
            }
        })
    }

    const addOrEdit = (noteType, resetForm) => {
        if (mode === "ADD") {
            NoteTypeService.addNoteType(noteType)
            setLoadData(true); // Request reload of data
        }
        else {
            NoteTypeService.updateNoteType(noteType) 
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
        NoteTypeService.deleteNoteType(id)
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
                title="Note Types"
                subtitle="List of all descriptions to classify Prior Authorization Notes"
                icon={<NoteTypeIcon />}
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
                                <TableRow key={item.noteTypeId}>
                                    <TableCell
                                        className ={classes.multiLineDesc}
                                    >{item.noteTypeName}</TableCell>
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
                                                    title:"Are you sure you want to delete this Provider?",
                                                    subTitle: "You can't undo this action.",
                                                    onConfirm:() => { onDelete(item.noteTypeId) },
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
                title="Note Type Form"
            >
                <NoteTypeForm 
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