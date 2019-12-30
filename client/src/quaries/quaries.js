import { gql } from "apollo-boost";

const GET_PRODUCTS = gql`
  query merchants($offset: Int, $limit: Int) {
    merchants(offset: $offset, limit: $limit) {
      guid
      merchant
      products {
        id
        name
        price
        description
        color
        size
        image
      }
    }
  }
`;

const SAVE_PRODUCT = gql`
  mutation SaveProduct($name: String!, $id: String!, $price: Float) {
    saveProduct(name: $name, id: $id, price: $price) {
      name
      id
      price
    }
  }
`;
const GET_CART = gql`
  {
    products {
      id
      name
      price
      quantityToBuy
    }
  }
`;
export { GET_CART, SAVE_PRODUCT, GET_PRODUCTS };
