import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { RemoveUser, useAppContext } from "../providers/context";
import { LocalStorage } from "../utils/localStorage";

export default function Header() {
  const { state, dispatch } = useAppContext();
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    dispatch(RemoveUser());
    LocalStorage.remove("id");
    LocalStorage.remove("role");
    LocalStorage.remove("username");
    LocalStorage.remove("token");
    LocalStorage.add("isAuth", false);
    handleClose();
    return;
  };

  const navList = [
    { id: 1, route: "/myaccount", text: "My account" },
    { id: 2, route: "/universities", text: "Universities" },
    { id: 3, route: "/subjects", text: "Subjects" },
  ];

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container" style={{ display: "flex" }}>
        <React.Fragment>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "justify",
              width: "100%",
            }}
          >
            <Link className="navbar-brand" to="/mainpage">
              StudRate
            </Link>
            <ul className="navbar-nav">
              {windowWidth > 1001 &&
                navList.map((nav) => (
                  <Typography className="nav-item" key={nav.id}>
                    <Link className="nav-link" to={nav.route}>
                      {nav.text}
                    </Link>
                  </Typography>
                ))}
            </ul>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {state.isAuth ? state.username.at(0) : null}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
                padding: "5px 10px",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {windowWidth < 1000 &&
              navList.map((nav) => (
                <MenuItem>
                  <Link
                    to={nav.route}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    onClick={handleClose}
                  >
                    {nav.text}
                  </Link>
                </MenuItem>
              ))}
            {state.isAuth ? (
              <>
                <MenuItem>
                  <Typography className="nav-item">
                    <Link
                      className="nav-link"
                      to="/chat"
                      style={{ color: "black" }}
                    >
                      Chat
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography className="nav-item">
                    <Link
                      className="nav-link"
                      to="/mainpage"
                      onClick={Logout}
                      style={{ color: "black" }}
                    >
                      Log out
                    </Link>
                  </Typography>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleClose}>
                  <Typography className="nav-item" color="black">
                    <Link to="/login" style={{ color: "black" }}>
                      Log in
                    </Link>
                  </Typography>
                </MenuItem>
              </>
            )}
          </Menu>
        </React.Fragment>
      </div>
    </nav>
  );
}
