const db = require("../models");
// const productDetailes = require("../models/productDetailes");
const { viewProducts } = require("./carts");
const Order = db.orders;
const Products = db.products;
const ProductDetailes = db.prouductDetailes;
const Cart = db.carts;

// add order
exports.addOrder = function (req, res) {

  const ProductID = req.body.ProductID;

  if (!req.body.OrderID) {
    res.status(400).send({
      message: "Order ID, Total Price, Quantity, Order Date, and status can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const order = {
    OrderID: req.body.OrderID,
    UserID: req.body.UserID,
    ProductID: req.body.ProductID,
    CartID: req.body.CartID,
    Quantity: req.body.Quantity,
    OrderDate: req.body.OrderDate,
    status: req.body.status
  };



  // Save Tutorial in the database
  Order.create(order)
    .then(data => {
      {
        const Quantity = data.Quantity
        const q = req.body.Quantity;
        const total = (Quantity - q)
        
        ProductDetailes.update({
          Quantity: total
        },
          {
            where: {
              ProductID: ProductID
            }
          })
      }
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    });
}

// get orders 
exports.getOrders = function (req, res) {

  Order.findAll({
    include: [{
      model: Cart,
      attributes: ['TotalPrice']
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

// order status
exports.changeStatus = function (req, res) {

  const OrderID = req.params.OrderID;

  // Order.create(OrderID)
  // .then(data => {
  //   res.send(data);
  Order.update({
    status: true
  },
    {
      where: {
        OrderID: OrderID
      }
    })
    // Order.update(req.body,
    //     {
    //           where: { OrderID: OrderID }
    //   })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${OrderID}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + OrderID,
      });
    });
}

exports.getTrue = function (req, res) {

  Order.findAll({
    where: {
      status: true
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

const deleteOrder = function (req, res) {
  const OrderID = req.params.OrderID

  Order.destroy({
    where: {
      OrderID: OrderID
    }
  })
    .then(num => {
      res.send({
        message: "Order with id = " + OrderID + " was deleted successfully from the cart."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Cart with id=" + OrderID
      });
    });
}
module.exports = {
  addDetails: this.addDetails,
  addOrder: this.addOrder,
  getOrders: this.getOrders,
  changeStatus: this.changeStatus,
  getTrue: this.getTrue,
  deleteOrder: deleteOrder
}