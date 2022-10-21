import React from "react";
import {
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

const RevenueCard = ({
  cardTitle = "some",
  listItem = [
    { name: "Orders", value: "10" },
    { name: "Episodes", value: "10" },
    { name: "Revenue on Hold", value: "$1000" },
  ],
  LinkText = "View Details",
  LinkUrl = "/",
}) => {
  return (
    <Card
      sx={{
        width: "49%",
        mt: "20px",
        boxShadow: "none",
        background: "#f8f8f8",
        height: "49%",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {cardTitle}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          {listItem.map((item) => (
            <Box display="flex" flexDirection="column">
              <Typography>{item.name}</Typography>
              <Typography fontWeight="bold">{item.value}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "center" }}>
        <Link style={{ color: "#036ED2" }} to={LinkUrl}>
          {LinkText}
        </Link>
      </CardActions>
    </Card>
  );
};

export default RevenueCard;
