import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
   <header className={classes.Toolbar}>
      <div className={classes.Logo}>
         <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
         <NavigationItems />
      </nav>
      <DrawerToggle clicked={props.drawerToggleClicked} />
   </header>
);

export default toolbar;
