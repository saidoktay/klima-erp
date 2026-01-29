import ChecklistIcon from '@mui/icons-material/Checklist';

import { PackageSearch as StockIcon} from 'lucide-react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import logo from "../image/Logo/logo.png";

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 64,
        }}
      >
        <Box component="img" src={logo} alt="" sx={{ width: 120 }} />
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/home"
              selected={location.pathname === "/home"}
            >
              <ListItemText primary="İş Takip" />
              <ListItemIcon>
                <ChecklistIcon fontSize="large" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/stock"
              selected={location.pathname === "/stock"}
            >
              <ListItemText primary="Stok-Takip" />
              <ListItemIcon>
                <StockIcon size={30} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
