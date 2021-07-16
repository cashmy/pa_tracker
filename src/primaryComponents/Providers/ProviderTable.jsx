import React, { useEffect, useState } from "react";
import {
  InputAdornment,
  Paper,
  makeStyles,
  Fab,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
} from "@material-ui/core";
// Icons
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import { ReactComponent as ProviderIcon } from "../../assets/svg_icons/provider.svg";
// Wrapped Components
import Controls from "../../components/controls/Controls";
import PageHeader from "../../components/PageHeader/PageHeader";
import useTable from "../../components/useTable";
// Service Layer
import ProviderService from "../../services/provider.service";
// Primary CRUD Child Component
import ProviderForm from "./ProviderForm";

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
}));

const columnCells = [
  { id: "providerFirstName", label: "First Name" },
  { id: "providerLastName", label: "Last Name" },
  { id: "providerEmail", label: "Email" },
  { id: "providerPhone", label: "Phone", disableSorting: true },
  { id: "providerNPI", label: "NPI", disableSorting: true },
  { id: "providerTaxonomy", label: "Taxonomy", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function ProviderTable() {
  const classes = useStyles();
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
    getProviders();
  }, [loadData]);

  async function getProviders() {
    try {
      const response = await ProviderService.getAllProviders();
      setRecords(response.data);
      setLoadData(false);
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
              x.providerFirstName
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.providerLastName
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.providerNPI
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              x.providerEmail.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const addOrEdit = (provider, resetForm) => {
    if (provider.providerId === 0) {
      console.log("Provider data to add: ", provider);
      ProviderService.addProvider(provider);
      setLoadData(true); // Request reload of data
    } else {
      ProviderService.updateProvider(provider);
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
    ProviderService.deleteProvider(id);
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
        title="Providers"
        subtitle="List of available Provider/Therapists"
        icon={<ProviderIcon />}
        isSvg={true}
      />

      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search First Name, Last Name, Email, and NPI's"
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
              <TableRow key={item.providerId}>
                <TableCell>{item.providerFirstName}</TableCell>
                <TableCell>{item.providerLastName}</TableCell>
                <TableCell>{item.providerEmail}</TableCell>
                <TableCell>{item.providerPhone}</TableCell>
                <TableCell>{item.providerNPI}</TableCell>
                <TableCell>{item.providerTaxonomy}</TableCell>
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
                        title: "Are you sure you want to delete this Provider?",
                        subTitle: "You can't undo this action.",
                        onConfirm: () => {
                          onDelete(item.providerId);
                        },
                      });
                    }}
                  >
                    <DeleteIcon fontSize="small" />
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
        title="Provider Form"
      >
        <ProviderForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Controls.Popup>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </React.Fragment>
  );
}
