import React from "react";
//import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link, Route, useHistory } from "react-router-dom";
import { useWordContext } from "../context/WordContext";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});
const gameRoutes = [
  {
    name: "Savannah",
    route: "/games/savanna",
  },
  {
    name: "Audio Challenge",
    route: "/games/audio",
  },
  {
    name: "English for Kids",
    route: "/games/forkids",
  },
  {
    name: "Sprint",
    route: "/games/sprint",
  },
];
const studyBookRoutes = [
  {
    name: "Главная страница",
    route: "/",
  },
  {
    name: "Учебник",
    route: "/classbook",
  },

  {
    name: "Словарь",
    route: "/vocabulary/learned/1/1",
  },
];
export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const wordCntx = useWordContext();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const settingsHandler = () => {
    wordCntx.setSettings(true);
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {studyBookRoutes.map((elem, index) => (
          <Link to={elem.route} exact>
            <ListItem button key={elem.name}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={elem.name} />
            </ListItem>
          </Link>
        ))}
        <ListItem button key={"elem.name"} onClick={settingsHandler}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"Настройки"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {gameRoutes.map((elem, index) => (
          <Link to={elem.route} exact>
            <ListItem button key={elem.name}>
              <ListItemIcon>
                <SportsEsportsIcon />
              </ListItemIcon>
              <ListItemText primary={elem.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon color="secondary" />
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
