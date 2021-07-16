import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Fab,
  FormControlLabel,
  InputAdornment,
  Paper,
  Switch,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
// Icons
import AddIcon from "@material-ui/icons/Add";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import { ReactComponent as ProviderIcon } from "../../assets/svg_icons/provider.svg";
// Wrapped Components
import Controls from "../../components/controls/Controls";
import PageHeader from "../../components/PageHeader/PageHeader";
import useTable from "../../components/useTable";
// Service Layer
import PriorAuthService from "../../services/priorAuth.service";
import ProviderService from "../../services/provider.service";
// Primary CRUD Child Component
import PriorAuthForm from "./PriorAuthForm";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  addButton: {
    position: "absolute",
    right: "10px",
  },
  archiveSwitch: {
    marginLeft: "5px",
  },
}));

const columnCells = [
  { id: "patientFirsName", label: "First Name" },
  { id: "patientLastName", label: "Last Name" },
  { id: "carrierShortName", label: "Carrier" },
  { id: "statusName", label: "Status" },
  { id: "paTreatmentCode", label: "Specialty" },
  { id: "paRequestDate", label: "Request Date" },
  { id: "paLastPOCDate", label: "Last POC" },
  { id: "paLastEvalDate", label: "Last Eval" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function PAByProvider() {
  const location = useLocation();
  const { workingProviderId } = location.state;

  const [providerFirstName, setProviderFirstName] = useState("");
  const [providerLastName, setProviderLastName] = useState("");
  const classes = useStyles();
  const [archiveStatus, setArchiveStatus] = useState(false);
  const [loadData, setLoadData] = useState(true);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  // Initialize with a default filter of all records, bypasses initial load error
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    getProvider();
  }, [workingProviderId]);

  useEffect(() => {
    getPAs();
  }, [loadData]);

  async function getPAs() {
    try {
      const response = await PriorAuthService.getAllPAsbyProviderAndArchive(
        workingProviderId,
        archiveStatus
      );
      setRecords(response.data);
      setLoadData(false);
    } catch (e) {
      console.log("API call unsuccessful", e);
    }
  }

  async function getProvider() {
    try {
      const response = await ProviderService.getProvider(workingProviderId);
      setProviderFirstName(response.data.providerFirstName);
      setProviderLastName(response.data.providerLastName);
    } catch (e) {
      console.log("API call unsuccessful", e);
    }
  }

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, columnCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    // state can't store functions, so we are storing an object with the function internally defined.
    setFilterFn({
      fn: (items) => {
        // target.value is the search box contents
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.patient.patientFirstName
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.patient.patientLastName
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.carrier.carrierShortName
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.status.statusName
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.paTreatmentCode
                .toLowerCase()
                .includes(target.value.toLowerCase())
          );
      },
    });
  };

  const handleToggle = () => {
    setArchiveStatus(!archiveStatus);
    setLoadData(true);
  };

  const handleArchive = (priorAuth) => {
    priorAuth.PAArchived = !archiveStatus;
    PriorAuthService.updatePA(priorAuth);
    setLoadData(true); // Request reload of data
  };

  const addOrEdit = (priorAuth, resetForm) => {
    if (priorAuth.id === 0) {
      PriorAuthService.addPA(priorAuth);
      setLoadData(true); // Request reload of data
    } else {
      PriorAuthService.updatePA(priorAuth);
      setLoadData(true); // Request reload of data
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false); // Close Popup modal
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    PriorAuthService.deletePA(id);
    setLoadData(true);
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };

  return (
    <React.Fragment>
      <PageHeader
        title={`Prior Authorizations for Provider:   ${providerFirstName} ${providerLastName}`}
        subtitle="List of all PA's for a given provider. ----- (Use switch to toggle between active and archived.)"
        icon={<ProviderIcon />}
        isSvg={true}
      />

      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Patient First or Last Name, Carrier, Provider and Specialty"
            fullWidth={false}
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          {/* <Switch></Switch> */}
          <FormControlLabel
            className={classes.archiveSwitch}
            control={
              <Switch
                checked={archiveStatus}
                onChange={handleToggle}
                name="archivedStatus"
              />
            }
            label="Archived"
          />
          <Fab
            className={classes.addButton}
            color="secondary"
            aria-label="add"
            size="small"
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          >
            <AddIcon />
          </Fab>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.patient.patientFirstName}</TableCell>
                <TableCell>{item.patient.patientLastName}</TableCell>
                <TableCell>{item.carrier.carrierShortName}</TableCell>
                <TableCell>
                  <Controls.Chip label={item.status.statusName} />
                </TableCell>
                <TableCell>{item.paTreatmentCode}</TableCell>
                <TableCell>{item.paRequestDate}</TableCell>
                <TableCell>{item.paLastPOCDate}</TableCell>
                <TableCell>{item.paLastEvalDate}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    size="large"
                    onClick={() => openInPopup(item)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title:
                          "Are you sure you want to delete this Prior Authorization?",
                        subTitle: "You can't undo this action.",
                        onConfirm: () => {
                          onDelete(item.id);
                        },
                      });
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="default"
                    onClick={() => {
                      handleArchive(item);
                    }}
                  >
                    {!archiveStatus && <ArchiveIcon fontSize="small" />}
                    {archiveStatus && <UnarchiveIcon fontSize="small" />}
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Controls.Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Prior Authorization Form"
      >
        <PriorAuthForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Controls.Popup>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </React.Fragment>
  );
}
