import React from "react";
import { useHistory } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton, Paper, makeStyles } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";

// Redux
import { useFetchNonApprvdCountForProvidersQuery } from "../../features/priorAuth/priorAuthSlice";

// ***** Styles *****
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  toolbar: {
    justifyContent: "flex-end",
  },
}));

export default function PAProvCountSmry() {
  const history = useHistory();
  const classes = useStyles();
  const numRcds = 20;

  const { data = [] } = useFetchNonApprvdCountForProvidersQuery(numRcds, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "providerLastName", headerName: "Last name", width: 150 },
    { field: "providerFirstName", headerName: "First name", width: 150 },
    { field: "count", headerName: "Non Apprvd", width: 175 },
    {
      field: "actions",
      headerName: "Actions",
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
    },
  ];

  const mapRecords = () => {
    let mapResult = data.map((item, i) => {
      // Need "id" only for DataGrid to work (operates as key)
      return { id: item.paProviderId, ...item };
    });
    return mapResult;
  };

  const handleClickRow = (id) => {
    history.push({
      pathname: "/priorAuthProvider",
      state: {
        workingProviderId: id,
      },
    });
  };

  return (
    <React.Fragment>
      <Paper className={classes.pageContent}>
        <div style={{ height: 350, width: "100%" }}>
          <DataGrid
            density="compact"
            classes={{
              toolbar: classes.toolbar,
            }}
            rows={mapRecords()}
            columns={columns}
            pageSize={5}
          />
        </div>
      </Paper>
    </React.Fragment>
  );
}
