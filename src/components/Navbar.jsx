import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { styled } from "@mui/material/styles";
import { FaUserAlt, FaBell } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { Button, Typography, Popover, MenuItem } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
const StyledButton = styled((props) => (
  <Button {...props} disableRipple disableTouchRipple disableFocusRipple />
))(() => ({
  textTransform: "none",
  color: "black",
  marginRight: "25px",
  fontWeight: "bold",
  ["&:hover"]: {
    backgroundColor: "transparent",
  },
}));
const Navbar = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.logo}></div>
          <StyledButton>
            <Typography fontWeight="bold" mr={1.5}>
              Clinical
            </Typography>
            <AiFillCaretDown />
          </StyledButton>
          <StyledButton>
            <Typography fontWeight="bold" mr={1.5}>
              Business Development
            </Typography>
            <AiFillCaretDown />
          </StyledButton>
          <StyledButton
            aria-describedby={id}
            onClick={handleClick}
            sx={{
              ...(location.pathname.includes("/admin") && {
                color: "#036ED2",
              }),
            }}
          >
            <Typography fontWeight="bold" mr={1.5}>
              Admin
            </Typography>
            <AiFillCaretDown />
          </StyledButton>
        </div>
        <div className={styles.right}>
          <div className={styles.logo}></div>
          <div data-count={22} className={styles.notify}>
            <FaBell />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaUserAlt className={styles.profile} />
            <AiFillCaretDown />
          </div>
        </div>
      </nav>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem component={Link} onClick={handleClose} to="/admin/graph">
          Graph Page
        </MenuItem>
        <MenuItem component={Link} onClick={handleClose} to="/admin/grid">
          Grid Page
        </MenuItem>
      </Popover>
    </header>
  );
};

export default Navbar;
