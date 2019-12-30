const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Merchant {
    index: Int
    guid: String
    logo: String
    dateCreated: String
    publishedState: Boolean
    brands: [String]
    merchant: String
    products: [Product]
    commissionFee: String
    contactEmail: String
    phone: String
    address: String
    publishedDate: String
    publishedBy: User
    companyDescription: String
  }
  type Product {
    belongsToBrand: Int
    id: String
    name: String
    price: Float
    description: String
    color: String
    size: String
    quantity: Int
    image: String
    quantityToBuy: Int
  }
  type User {
    userId: String
  }
  type Query {
    merchants(offset: Int, limit: Int): [Merchant!]!
    products: [Product!]
  }
  type Mutation {
    editMerchant(publishedState: Boolean!): Merchant
    saveProduct(
      id: String
      name: String
      quantityToBuy: Int
      price: Float
    ): Product
  }
`;

module.exports = typeDefs;
