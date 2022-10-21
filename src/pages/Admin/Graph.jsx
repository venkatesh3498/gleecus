import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Typography,
  Link,
  IconButton,
  Select,
  MenuItem,
  InputBase,
} from "@mui/material";
import { BsArrowRight } from "react-icons/bs";
import {
  AiTwotoneCalendar,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { styled } from "@mui/material/styles";
import { FiRefreshCw } from "react-icons/fi";
import RevenueCard from "../../components/RevenueCard";
import Plot from "react-plotly.js";
import axios from "axios";
export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  outline: "none",
  width: "155px",
  "& .MuiInputBase-input": {
    borderRadius: "8px",
    border: "1px solid #E1E1E1",
    position: "relative",
    backgroundColor: "#f8f8f8",
    fontSize: 16,
    padding: "5px 26px 5px 12px",
    "&:active": {
      borderColor: "#E1E1E1",
    },
    "&:focus": {
      borderColor: "#E1E1E1",
    },
  },
}));
const useGraphData = () => {
  const [xAxis, setXAxis] = useState(null);
  const [yAxis, setYAxis] = useState(null);
  async function getData() {
    try {
      setXAxis(null)
      setYAxis(null)
      const ApiData = await axios.get(
        "https://5b9f8640f5036f00142e4a2c.mockapi.io/v1/users-count"
      );
      const ValuesObjets = Object.values(ApiData.data);
      setXAxis(ValuesObjets.map((obj) => obj.counts));
      setYAxis(
        ValuesObjets.map((val) => val.CLINICIAN_NAME.replace(" ", "<br />"))
      );
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return { yAxis, getData, xAxis };
};

const Graph = () => {
  const { yAxis, getData, xAxis } = useGraphData();
  const [value, setValue] = useState("Histogram");
  const [showGraph, setShowGraph] = useState(true);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="section"
      sx={{
        p: "20px 40px 30px 40px",
        boxSizing: "border-box",
        height: "calc(100% - 65px)",
      }}
    >
      <Breadcrumbs separator={<BsArrowRight />} aria-label="breadcrumb">
        <Link
          underline="hover"
          key="1"
          color="inherit"
          href="/"
          // onClick={handleClick}
        >
          Admin
        </Link>
        <Typography key="3" sx={{ color: "#036ED2" }}>
          Pending Orders
        </Typography>
      </Breadcrumbs>
      <Typography
        sx={{ pt: "20px", pb: "30px", fontWeight: "bold" }}
        variant="h5"
        component="h5"
      >
        Pending Orders
      </Typography>
      <Box
        display="flex"
        sx={{ height: "calc(100% - 98px)" }}
        justifyContent="space-between"
      >
        <Box
          sx={{
            width: "49%",
            height: "100%",
            overflow: "auto",
            p: "10px 20px",
            boxSizing: "border-box",
            bgcolor: "#fff",
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => setShowGraph(false)}>
              <AiOutlineEyeInvisible />
            </IconButton>
            <IconButton onClick={() => setShowGraph(true)}>
              <AiOutlineEye />
            </IconButton>
            <IconButton onClick={() => getData()}>
              <FiRefreshCw />
            </IconButton>
            <Select
              inputProps={{ "aria-label": "Without label" }}
              input={<BootstrapInput />}
              value={value}
              displayEmpty
              onChange={handleChange}
              defaultValue=" "
            >
              <MenuItem value="Histogram">Histogram</MenuItem>
            </Select>
          </Box>
          {showGraph && xAxis && yAxis && (
            <Plot
              data={[
                {
                  type: "bar",
                  x: [...xAxis],
                  y: [...yAxis],
                  orientation: "h",
                  width: 0.7,
                  marker: {
                    color: "#4C78A8",
                  },
                },
              ]}
              layout={{
                width: "100%",
                height: 50 * yAxis.length,
                bargap: 0.7,
                barmode: "stack",
                xaxis: {
                  tickmode: "linear",
                  tick0: 0,
                  dtick: 1,
                  title: {
                    text: value,
                    font: {
                      size: 18,
                      color: "black",
                    },
                  },
                },
                yaxis: {
                  ticksuffix: " ",
                },
              }}
              config={{ displayModeBar: false }}
            />
          )}
        </Box>
        <Box
          sx={{
            width: "49%",
            height: "100%",
            overflow: "auto",
            p: "20px 15px",
            boxSizing: "border-box",
            bgcolor: "#fff",
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              sx={{
                width: "49%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>Start Date</Typography>
              <Box
                sx={{
                  background: "#f8f8f8",
                  height: "48px",
                  boxSizing: "border-box",
                  flexGrow: "1",
                  borderRadius: "5px",
                  padding: "10px 15px",
                  display: "flex",
                  ml: "20px",
                }}
              >
                <AiTwotoneCalendar
                  style={{ width: "24px", height: "24px", color: "#036ED2" }}
                />
                <Typography ml="10px">1st Jan, 2021</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "49%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>End Date</Typography>
              <Box
                sx={{
                  background: "#f8f8f8",
                  height: "48px",
                  boxSizing: "border-box",
                  flexGrow: "1",
                  borderRadius: "5px",
                  padding: "10px 15px",
                  display: "flex",
                  ml: "20px",
                }}
              >
                <AiTwotoneCalendar
                  style={{ width: "24px", height: "24px", color: "#036ED2" }}
                />
                <Typography ml="10px">9th Jan, 2021</Typography>
              </Box>
            </Box>
          </Box>
          <Box mt="20px" display="flex">
            <Box mr="50px">
              <Typography>Pending Orders</Typography>
              <Typography fontSize="22px" fontWeight="bold">
                90
              </Typography>
            </Box>
            <Box>
              <Typography>Revenue On Hold</Typography>
              <Typography fontSize="22px" fontWeight="bold">
                $3000
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            {cardData.map((card) => (
              <RevenueCard {...card} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Graph;
const cardData = [
  {
    cardTitle: "Inhouse Processing",
    listItem: [
      { name: "Orders", value: "10" },
      { name: "Episodes", value: "10" },
      { name: "Revenue on Hold", value: "$1000" },
    ],
    LinkText: "View Details",
    LinkUrl: "/",
  },
  {
    cardTitle: "Pending Signatures",
    listItem: [
      { name: "Orders", value: "15" },
      { name: "Episodes", value: "15" },
      { name: "Revenue on Hold", value: "$1000" },
    ],
    LinkText: "View Details",
    LinkUrl: "/",
  },
  {
    cardTitle: "To Be Sent",
    listItem: [
      { name: "Orders", value: "20" },
      { name: "Episodes", value: "20" },
      { name: "Revenue on Hold", value: "$1000" },
    ],
    LinkText: "View Details",
    LinkUrl: "/",
  },
  {
    cardTitle: "Recieved Orders",
    listItem: [
      { name: "Orders", value: "15" },
      { name: "Episodes", value: "15" },
      { name: "Revenue on Hold", value: "$1000" },
    ],
    LinkText: "View Details",
    LinkUrl: "/",
  },
];
