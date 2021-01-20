import React from "react";
import burgerLogo from "../../assests/images/burgerLogo.png";
import classes from "./Logo.module.css";

const logo = (props) => {
   return (
      <div className={classes.Logo} style={{ height: props.height }}>
         <img src={burgerLogo} alt='Burger Logo' />
      </div>
   );
};
export default logo;
