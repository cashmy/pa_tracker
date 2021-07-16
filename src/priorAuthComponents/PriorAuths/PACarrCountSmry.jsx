import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton, Paper, makeStyles } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";

// Redux
import { useFetchNonApprvdCountForCarriersQuery } from "../../features/priorAuth/priorAuthSlice";

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

export default function PACarrCountSmry() {
  const history = useHistory();
  const classes = useStyles();
  const numRcds = 20;

  const { data = [] } = useFetchNonApprvdCountForCarriersQuery(numRcds, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "carrierName", headerName: "Carrier", width: 150 },
    { field: "carrierShortName", headerName: "Short name", width: 150 },
    { field: "count", headerName: "Non Apprvd", width: 175 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            onClick={() => handleClickRow(params.row.paCarrierId)}
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
      return { id: item.paCarrierId, ...item };
    });

    return mapResult;
  };

  const handleClickRow = (id) => {
    history.push({
      pathname: "/priorAuthCarrier",
      state: {
        workingCarrierId: id,
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
            // checkboxSelection
            // components={{
            //     Toolbar: GridToolbar,
            // }}
          />
        </div>
      </Paper>
    </React.Fragment>
  );
}
