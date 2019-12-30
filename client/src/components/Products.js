import React, { Component, useState, useEffect } from "react";
import {
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody,
  Media,
  Alert
} from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_PRODUCTS, SAVE_PRODUCT, GET_CART } from "../quaries/quaries";

import "./styles.css";

function ProductsList() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const { data, fetchMore, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      offset: 0,
      limit: 2
    },
    fetchPolicy: "cache-and-network"
  });
  const [alert, setAlert] = useState({ isAlert: false, itemName: "" });

  const [saveProduct, { productData }] = useMutation(SAVE_PRODUCT, {
    refetchQueries: [{ query: GET_CART }],
    onCompleted({ saveProduct }) {
      setAlert({ isAlert: true, itemName: saveProduct.name });
      setTimeout(() => {
        setAlert({ isAlert: false });
      }, 3000);
    }
  });

  if (error) return `Error! ${error.message}`;

  return (
    <div>
      {data &&
        data.merchants.map(item =>
          item.products.map(i => (
            <div>
              <Media key={i.id} className="product-card">
                <Media left href="#">
                  <Media object src={i.image} alt="Product image cap" />
                </Media>
                <CardBody>
                  <CardTitle style={{ fontWeight: 600 }}>{i.name}</CardTitle>
                  <CardTitle>Price: {i.price}</CardTitle>
                  <CardSubtitle>Color: {i.color}</CardSubtitle>
                  <CardSubtitle>Size: {i.size}</CardSubtitle>
                  <CardText>Details: {i.description}</CardText>
                  <Button
                    color="primary"
                    size="lg"
                    block
                    onClick={() => {
                      saveProduct({ variables: i });
                    }}
                  >
                    Buy
                  </Button>
                </CardBody>
              </Media>{" "}
            </div>
          ))
        )}
      {alert.isAlert && (
        <Alert style={{ position: "fixed", bottom: "20px" }} color="success">
          The {alert.itemName} is in your basket!
        </Alert>
      )}
      <Button
        color="primary"
        size="lg"
        block
        onClick={() =>
          fetchMore({
            variables: {
              offset: data.merchants.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, prev, {
                merchants: [...prev.merchants, ...fetchMoreResult.merchants]
              });
            }
          })
        }
      >
        More
      </Button>
    </div>
  );
}

export default ProductsList;
