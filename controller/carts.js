const db = require("../models");
const productDetailes = require("../models/productDetailes");
const Cart = db.carts;
const Product = db.products;

//add product to cart
const addProduct = function (req, res) {
  if (!req.body.CartID) {
    res.status(400).send({
      message: "Cart ID can not be empty!"
    });
    return;
  }

  const ProductID = req.body.ProductID;
  const total = (req.body.SubTotal + req.body.ShippingPrice)

  // Create a Tutorial
  const cart = {
    CartID: req.body.CartID,
    UserID: req.body.UserID,
    ProductID: req.body.ProductID,
    SubTotal: req.body.SubTotal,
    ShippingPrice: req.body.ShippingPrice,
    TotalPrice: total
  };

  Cart.create(cart)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cart."
      });
    });
}

//remove product from cart
exports.deleteProduct = function (req, res) {

  // const CartID = req.params.CartID;
  const CartID = req.params.CartID;

  Cart.destroy(
    {
      where: { CartID: CartID },
    }
  )
    .then(num => {
      res.send({
        message: "Cart with id = " + CartID + " was deleted successfully from the cart."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Cart with id=" + CartID
      });
    });

}

//view all products in cart
exports.viewProductsByUser = function (req, res) {

  const UserID = req.params.UserID;

  Cart.findAll({
    where: {
      UserID: UserID
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

}

exports.searchForProduct = function (req, res) {

  const ProductID = req.params.ProductID;

  Cart.findAll({
    where: {
      ProductID: ProductID
    },
    includes: [{
      model: Product,
      attributes: ['Discount']
    }]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

}

exports.viewProducts = function (req, res) {

  Cart.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

}
module.exports = {
  addProduct: addProduct,
  deleteProduct: this.deleteProduct,
  viewProducts: this.viewProducts,
  searchForProduct: this.searchForProduct,
  viewProductsByUser: this.viewProductsByUser
  // calcQuantity: calcQuantity
};
