import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
   const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
      return (
         <li key={igKey}>
            <span>{igKey}</span>: {props.ingredients[igKey]}
         </li>
      );
   });
   return (
      <Aux>
         <h3>Your Order</h3>
         <p>Your burger has following ingredients:</p>
         <ul>{ingredientSummary}</ul>
         <p>
            <strong>Total Price: ${props.totalPrice.toFixed(2)}</strong>
         </p>
         <p>Continue to Checkout?</p>
         <Button btnType='Success' clicked={props.continueClicked}>
            Continue
         </Button>
         <Button btnType='Danger' clicked={props.cancelClicked}>
            Cancel
         </Button>
      </Aux>
   );
};

export default orderSummary;
