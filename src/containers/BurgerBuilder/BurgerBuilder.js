import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
   salad: 0.7,
   cheese: 0.6,
   meat: 1.5,
   bacon: 0.7,
};

class BurgerBuilder extends Component {
   state = {
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
   };

   componentDidMount = () => {
      axios
         .get(
            ""
         )
         .then((res) => this.setState({ ingredients: res }))
         .catch((error) => console.log(error));
   };

   updatePurchaseState(ingredients) {
      const sum = Object.keys(ingredients)
         .map((igKey) => {
            return ingredients[igKey];
         })
         .reduce((sum, el) => {
            return sum + el;
         }, 0);
      this.setState({ purchasable: sum > 0 });
   }

   addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
         ...this.state.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
   };

   removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      if (oldCount <= 0) {
         return;
      }
      const updatedIngredients = {
         ...this.state.ingredients,
      };
      const updatedCount = oldCount - 1;
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceAddition;
      this.setState({
         totalPrice: newPrice,
         ingredients: updatedIngredients,
      });
      this.updatePurchaseState(updatedIngredients);
   };

   purchaseHandler = () => {
      this.setState({ purchasing: true });
   };

   purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
   };

   continueOrderHandler = () => {
      //alert("Your order has been placed. Thank you!");
      this.setState({ loading: true });

      const order = {
         ingredients: this.state.ingredients,
         price: this.state.totalPrice,
         customer: {
            name: "Samip Koirala",
            address: {
               street: "Sukedhara",
               district: "Kathmandu",
               Province: "3",
            },
            email: "kopsubedi@gmail.com",
         },
         deliveryMethod: "fastest",
      };

      axios
         .post("/orders.json", order)
         .then((response) => {
            this.setState({ loading: false, purchasing: false });
         })
         .catch((error) => {
            console.log(error);
            this.setState({ loading: false, purchasing: false });
         });
   };

   render() {
      const disabledInfo = {
         ...this.state.ingredients,
      };
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0;
      }
      let orderSummary = null;
      let burger = <Spinner />;

      if (this.state.ingredients) {
         let burger = (
            <Aux>
               <Burger ingredients={this.state.ingredients} />
               <BuildControls
                  ingredientAdded={this.addIngredientHandler}
                  ingredientRemoved={this.removeIngredientHandler}
                  disabled={disabledInfo}
                  purchasing={this.purchaseHandler}
                  purchasable={this.state.purchasable}
                  price={this.state.totalPrice}
               />
            </Aux>
         );
         orderSummary = (
            <OrderSummary
               ingredients={this.state.ingredients}
               cancelClicked={this.purchaseCancelHandler}
               continueClicked={this.continueOrderHandler}
               totalPrice={this.state.totalPrice}
            />
         );
      }

      if (this.state.loading) {
         orderSummary = <Spinner />;
      }

      return (
         <Aux>
            <Modal
               show={this.state.purchasing}
               modalClosed={this.purchaseCancelHandler}
            >
               {OrderSummary}
            </Modal>
            {burger}
         </Aux>
      );
   }
}
export default withErrorHandler(BurgerBuilder, axios);
