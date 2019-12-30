import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItemHeading,
  ListGroupItem,
  ListGroupItemText,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { GET_CART } from "../quaries/quaries";

function Cart() {
  const { loading, error, data } = useQuery(GET_CART);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data.products.length === 0) return `Your Cart is Empty`;

  return (
    <div>
      <ListGroup>
        <Container>
          <ListGroupItem>
            <Row xs="3">
              <Col>Quantity</Col>
              <Col>Product</Col>
              <Col>Price</Col>
            </Row>
          </ListGroupItem>
          {data.products &&
            data.products.map(item => (
              <ListGroupItem key={item.id}>
                <Row xs="3">
                  <Col>
                    <ListGroupItemText>{item.quantityToBuy}</ListGroupItemText>
                  </Col>
                  <Col>
                    <ListGroupItemText>{item.name}</ListGroupItemText>
                  </Col>
                  <Col>
                    <ListGroupItemText>${item.price}</ListGroupItemText>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          <ListGroupItem color="info">
            <Row xs="3">
              <Col>Total Price</Col>
              <Col> </Col>
              <Col>
                $
                {Math.round(
                  data.products &&
                    data.products.reduce((sum, item) => {
                      return sum + item.price * item.quantityToBuy;
                    }, 0)
                )}
              </Col>
            </Row>
          </ListGroupItem>
        </Container>
      </ListGroup>
    </div>
  );
}

export default Cart;
