const ProductSchema = require("../product");
const Merchant = require("../merchant");
const mongoose = require("mongoose");

const Product = mongoose.model("Product", ProductSchema);

const resolvers = {
  Query: {
    // Get Merchants query
    merchants: (root, args, context, info) => {
      return Merchant.find({})

        .skip(args.offset)
        .limit(args.limit);
    },

    // Get Products query
    products: () => Product.find({})
  },

  Mutation: {
    saveProduct: async (root, args, context, info) => {
      let product = {
        belongsToBrand: args.belongsToBrand,
        id: args.id,
        name: args.name,
        price: args.price,
        description: args.description,
        color: args.color,
        size: args.size,
        image: args.image,
        $inc: {
          quantityToBuy: 0.5
        }
      };

      return Product.findOneAndUpdate(
        {
          id: args.id
        },
        product,
        { new: true, upsert: true },
        function(err, response) {
          if (err) {
            console.log(err);
            return err;
          } else {
            return response;
          }
        }
      );
    }
  }
};

module.exports = resolvers;
