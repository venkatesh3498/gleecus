import React, { useMemo, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { Avatar, Box, Typography } from "@mui/material";
import { BsFilter, BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  return (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d) + "-" + "" + y;
}
var filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};
const EmailTab = () => {
  const containerStyle = useMemo(
    () => ({ width: "100%", overflow: "auto", height: "100%" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "350px", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "id",
    },
    { field: "name" },
    { field: "email" },
    { field: "phone" },
    {
      field: "createdAt",
      filter: "agDateColumnFilter",
      filterParams: filterParams,
      cellRenderer: (props) => dateToYMD(new Date(props.value)),
    },
    {
      field: "avatar",
      cellRenderer: (props) => <Avatar src={props.value} variant="square" />,
    },
  ]);

  const onGridReady = useCallback((params) => {
    fetch("https://5b9f8640f5036f00142e4a2c.mockapi.io/v1/users")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);
  const Navigate = useNavigate();
  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      resizable: true,
      suppressMenuHide: true,
      headerComponentParams: { menuIcon: <BsFilter /> },
    };
  }, []);
  return (
    <div style={containerStyle}>
      <Box display="flex">
        {data.map((data) => {
          return (
            <Box
              display="flex"
              onClick={() => Navigate(data.link)}
              alignItems="center"
              justifyContent="space-between"
              width="147px"
              mb="20px"
              mr="20px"
              height="60px"
              p="8px 16px"
              bgcolor="#f8f8f8"
              borderRadius="4px"
              sx={{ cursor: "pointer" }}
            >
              <Box display="flex" flexDirection="column">
                <Typography>{data.name}</Typography>
                <Typography fontWeight="bold">{data.value}</Typography>
              </Box>
              <BsArrowRight />
            </Box>
          );
        })}
      </Box>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default EmailTab;
const data = [
  {
    name: "Products",
    value: "90",
    link: "/",
  },
  {
    name: "Episodes",
    value: "100",
    link: "/",
  },
  {
    name: "Followups",
    value: "25",
    link: "/",
  },
  {
    name: "Revenue",
    value: "$3000",
    link: "/",
  },
];
