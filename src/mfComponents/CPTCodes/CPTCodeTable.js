import React, { useEffect, useState } from 'react';
import { InputAdornment, Paper, makeStyles, Fab, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
// Icons
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { ReactComponent as CPTIcon } from '../../assets/svg_icons/cpt.svg'
// Wrapped Components
import Controls from '../../components/controls/Controls';
import PageHeader from '../../components/PageHeader/PageHeader';
import useTable from "../../components/useTable"
// Service Layer
import CPTCodeService from '../../services/cptCode.service';
// Primary CRUD Child Component
import CPTCodeForm from './CPTCodeForm';
// Report Items
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import CPTCodeReport from './CPTCodeReport';


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
        right: theme.spacing(1.5),
    },
    reportButton: {
        marginLeft: theme.spacing(3)
    }
}))

const columnCells = [
    { id: 'cptCodeId', label: 'CPT Code' },
    { id: 'cptDescription', label: 'Description' },
    { id: 'actions', label: 'Actions', disableSorting: true },
]

export default function CPTCodeTable() {

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
        getCPTCodes()
    }, [loadData])
        
    async function getCPTCodes() {
        try {
            const response = await CPTCodeService.getAllCPTCodes();
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
                        x.cptDescription.toLowerCase().includes(target.value.toLowerCase()) 
                    ))
            }
        })
    }

    const ReportApp = () => (
        <PDFViewer width="100%" height="1200">
            <CPTCodeReport />
        </PDFViewer>
    );
    
    const handleReport = e => {
        ReactDOM.render(<ReportApp />, document.getElementById('root'));
    }
    const addOrEdit = (cptCode, resetForm) => {
        if (mode === "ADD") {
            CPTCodeService.addCPTCode(cptCode)
            setLoadData(true); // Request reload of data
        }
        else {
            CPTCodeService.updateCPTCode(cptCode) 
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
        CPTCodeService.deleteCPTCode(id)
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
                title="CPT Codes"
                subtitle="List of Current Procedural Terminology (CPT) Codes"
                icon={<CPTIcon />}
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
                    <Controls.Button 
                        className={classes.reportButton}
                        text="Report"
                        color="primary" 
                        aria-label="report"
                        size="small"
                        onClick={handleReport}
                        >
                    </Controls.Button>
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
                                <TableRow key={item.cptCodeId}>
                                    <TableCell>{item.cptCodeId}</TableCell>
                                    <TableCell
                                        className ={classes.multiLineDesc}
                                    >{item.cptDescription}</TableCell>
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
                                                    onConfirm:() => { onDelete(item.cptCodeId) },
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
                title="CPT Code Form"
            >
                <CPTCodeForm 
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