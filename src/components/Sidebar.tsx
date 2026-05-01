import TaskIcon from "@mui/icons-material/Checklist";
import PeopleIcon from "@mui/icons-material/People";

import { PackageSearch as StockIcon } from "lucide-react";
import { Notebook as DeptIcon } from "lucide-react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import logo from "../image/logo/logo.png";
import { Users as PersonnelIcon } from "lucide-react";
import { Settings as SettingsIcon } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const { companyLogo, companyName } = useSelector(
    (state: RootState) => state.settings,
  );

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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 90,
          py: 2,
        }}
      >
        <Box
          component="img"
          src={companyLogo || logo}
          alt=""
          sx={{ width: 120 }}
        />

        {companyName && (
          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {companyName}
          </Typography>
        )}
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/home"
              selected={location.pathname === "/home"}
            >
              <ListItemText primary="İş-Takip" />
              <ListItemIcon>
                <TaskIcon fontSize="large" />
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

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/dept"
              selected={location.pathname === "/dept"}
            >
              <ListItemText primary="Veresiye-Takip" />
              <ListItemIcon>
                <DeptIcon size={30} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/customers"
              selected={location.pathname === "/customers"}
            >
              <ListItemText primary="Müşteriler" />
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/personnel"
              selected={location.pathname === "/personnel"}
            >
              <ListItemText primary="Personel" />
              <ListItemIcon>
                <PersonnelIcon size={30} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/settings"
              selected={location.pathname === "/settings"}
            >
              <ListItemText primary="Ayarlar" />
              <ListItemIcon>
                <SettingsIcon size={30} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
