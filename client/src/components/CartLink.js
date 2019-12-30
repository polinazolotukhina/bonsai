import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItemHeading,
  ListGroupItem,
  ListGroupItemText,
  Badge,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { GET_CART } from "../quaries/quaries";

function CartLink() {
  const { loading, error, data } = useQuery(GET_CART);

  if (loading) return "Cart";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      Cart{" "}
      <Badge color="secondary">
        {" "}
        $
        {Math.round(
          data.products &&
            data.products.reduce((sum, item) => {
              return sum + item.price * item.quantityToBuy;
            }, 0)
        )}
      </Badge>
    </div>
  );
}

export default CartLink;
