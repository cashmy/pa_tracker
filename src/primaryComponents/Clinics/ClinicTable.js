import React, { useEffect, useState } from 'react';
import { InputAdornment, Paper, makeStyles, Fab, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
import useTable from "../../components/useTable"
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ServiceLayer from '../../services/ServiceLayer';
import PageHeader from '../../components/PageHeader/PageHeader';
import { ReactComponent as ClinicIcon } from '../../assets/svg_icons/clinic.svg'
import Controls from '../../components/controls/Controls';
import ClinicForm from '../../primaryComponents/Clinics/ClinicForm'; 

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
    {id: 'clinicName', label: 'Clinic Name'},
    {id:' clinicNPI', label: 'NPI'},
    {id: 'clinicPhone', label: 'Main Phone', disableSorting: true },
]

export default function ClinicTable() {

    const classes = useStyles();
    const [records, setRecords] = useState([]);
    // Initialize with a default filter of all records, bypasses initial load error
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openPopup, setOpenPopup] = useState(false)

    useEffect(() => {
        getClinics();
      },[])

      // TODO: Swap this out with Redux Actions/Reducers
    async function getClinics(e){
        try{
            const response = await ServiceLayer.getAllClinics();
            setRecords(response.data);
        }
        catch(e){
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
                    return items.filter(x => x.clinicName.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <>
            <PageHeader
                title="Clinics"
                subtitle="List of available clinics"
                icon={<ClinicIcon />}
                isSvg={true}
            />

            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input 
                        label="Search Clincs"
                        fullWidth={false}
                        className ={classes.searchInput}
                        InputProps={{
                            startAdornment:(<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment> )
                        }}
                        onChange={handleSearch}
                    />
                    <Fab 
                        className={classes.addButton}
                        color="secondary" 
                        aria-label="add"
                        size="small"
                        onClick={() => setOpenPopup(true)}
                        >
                        <AddIcon />
                    </Fab>   
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.cliicId}>
                                    <TableCell>{item.clinicName}</TableCell>
                                    <TableCell>{item.clinicNPI}</TableCell>
                                    <TableCell>{item.clinicPhone }</TableCell>
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
                title="Clinic Form"
            >
                <ClinicForm />
            </Controls.Popup>
        </>
    )

}