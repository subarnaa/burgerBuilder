import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
   let transformedIngredients = Object.keys(props.ingredients)
      .map((ignKey) => {
         return [...Array(props.ingredients[ignKey])].map((_, i) => {
            return <BurgerIngredient key={ignKey + i} type={ignKey} />;
         });
      })
      .reduce((arr, el) => {
         return arr.concat(el);
      }, []);
   if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please Start Adding Ingredients!</p>;
   }
   return (
      <div className={classes.Burger}>
         <BurgerIngredient type='bread-top' />
         {transformedIngredients}
         <BurgerIngredient type='bread-bottom' />
      </div>
   );
};

export default burger;
