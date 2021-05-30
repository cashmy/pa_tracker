import React, { useEffect, useState } from 'react';
import { Paper, makeStyles, TableBody, TableRow, TableCell } from '@material-ui/core';
import useTable from "../../components/useTable"
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
import ServiceLayer from '../../services/ServiceLayer';
import PageHeader from '../../components/PageHeader/PageHeader';
import { ReactComponent as ClinicIcon } from '../../assets/svg_icons/clinic.svg'

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function ClinicTable() {

    const classes = useStyles();
    const [records, setRecords] = useState([])

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
        TblContainer
    } = useTable();

    return (
        <>
            <PageHeader
                title="Clinics"
                subtitle="List of available clinics"
                icon={<ClinicIcon />}
            />

            <Paper className={classes.pageContent}>
                <TblContainer>
                    <TableBody>
                        {
                            records.map(item => (
                                <TableRow key={item.cliicId}>
                                    <TableCell>{item.clinicName}</TableCell>
                                    <TableCell>{item.clinicNPI}</TableCell>
                                    <TableCell>{item.clinicPhone }</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
            </Paper>
        </>
    )

}