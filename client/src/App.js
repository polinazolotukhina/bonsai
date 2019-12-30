import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import apolloClient from "./createApolloClient";
import {
  Badge,
  Button,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink
} from "reactstrap";
import Products from "./components/Products";
import CartLink from "./components/CartLink";
import Cart from "./components/Cart";
import { useQuery } from "@apollo/react-hooks";
import { GET_CART } from "./quaries/quaries";

function App({ children }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <Link to="/cart">
            <CartLink />
          </Link>
        </Navbar>

        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
