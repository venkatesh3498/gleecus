import React from "react";
import { Box, Breadcrumbs, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BsArrowRight } from "react-icons/bs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EmailTab from "./Components/EmailTab";
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    height: "5px",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 100,
    borderTopRightRadius: "4px",
    borderTopLeftRadius: "4px",
    width: "100%",
    backgroundColor: "#036ED2",
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, overflow: "auto" }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Grid = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      component="section"
      sx={{
        p: "20px 40px 30px 40px",
        boxSizing: "border-box",
        bgcolor: '#ffffff',
        height: "calc(100% - 65px)",
      }}
    >
      <Breadcrumbs separator={<BsArrowRight />} aria-label="breadcrumb">
        <Link
          fontWeight="bold"
          underline="hover"
          key="1"
          color="inherit"
          href="/"
        >
          Admin
        </Link>
        <Link
          underline="hover"
          fontWeight="bold"
          key="1"
          color="inherit"
          href="/"
        >
          Pending Orders
        </Link>
        <Typography key="3" fontWeight="bold" sx={{ color: "#036ED2" }}>
          To Be Sent
        </Typography>
      </Breadcrumbs>
      <Typography
        sx={{ pt: "20px", pb: "30px", fontWeight: "bold" }}
        variant="h5"
        component="h5"
      >
        To Be Sent
      </Typography>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Email" {...a11yProps(0)} />
            <Tab label="Fax" {...a11yProps(1)} />
            <Tab label="Portal" {...a11yProps(2)} />
            <Tab label="Hand Carried" {...a11yProps(3)} />
          </StyledTabs>
        </Box>
        <TabPanel sx={{ height: "100%" }} value={value} index={0}>
          <EmailTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Fax
        </TabPanel>
        <TabPanel value={value} index={2}>
          Portal
        </TabPanel>
        <TabPanel value={value} index={3}>
          Hand Carried
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Grid;
