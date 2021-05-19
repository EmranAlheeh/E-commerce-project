const db = require("../models");
var Sequelize = require("sequelize");
const { prouductDetailes } = require("../models");
const Op = Sequelize.Op;
const Prouduct = db.products;
const Category = db.categories;
const Brand = db.brands;
const ProductDetailes = db.prouductDetailes;
const Image = db.image;
exports.addProduct = function (req, res) {
  // Validate request
  if (
    !req.body.ProductID ||
    !req.body.CategoryID ||
    !req.body.ProductName ||
    !req.body.ProductType ||
    !req.body.Price  ||
    !req.body.is_bublished
  ) {
    res.status(400).send({
      message:
        "ProductID, CategoryID, ProductName,ProductType , can not be empty!",
    });
    return;
  }
const total = (req.body.Price - (req.body.Discount*req.body.Price));
  // Create a Tutorial
  const products = {
    ProductID: req.body.ProductID,
    CategoryID: req.body.Category,
    BrandName:req.body.BrandName,
    ProductName: req.body.ProductName,
    ProductType: req.body.ProductType,
    Price: req.body.Price,
    Discount: req.body.Discount,
    TotalPrice:total ,

    is_bublished: req.body.is_bublished,
    status: req.body.status ? req.body.status : false,
  };

  // Save Tutorial in the database
  Prouduct.create(products)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};
exports.addProductDetailes = function (req, res) {
  // Validate request
  if (
    !req.body.DetailesID ||
    !req.body.ProductID ||
    !req.body.Size ||
    !req.body.Color ||
    !req.body.Quantity
  ) {
    res.status(400).send({
      message:
        "DetailesID, ProductID, Size,Color, and Quantity can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const productDetailes = {
    DetailesID: req.body.DetailesID,
    ProductID: req.body.ProductID,
    Size: req.body.Size,
    Color: req.body.Color,
    Quantity: req.body.Quantity,
    status: req.body.status ? req.body.status : false,
  };

  // Save Tutorial in the database
  ProductDetailes.create(productDetailes)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the detailes.",
      });
    });
};
exports.addProductImage = function (req, res) {
  // Validate request
  if (!req.body.ImageID || !req.body.ProductID || !req.body.ImageSource) {
    res.status(400).send({
      message: "ImageID, ProductID, and ImageSource can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const image = {
    ImageID: req.body.ImageID,
    ProductID: req.body.ProductID,
    ImageSource: req.body.ImageSource,

    status: req.body.status ? req.body.status : false,
  };

  // Save Tutorial in the database
  Image.create(image)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the detailes.",
      });
    });
};

exports.getAllProduct = function (req, res) {
  Prouduct.findAll({
    where: { is_bublished: true },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
exports.findById = function (req, res) {
  Prouduct.findByPk(req.params.id)
    .then((data) => {
      res.send({
        data: data,
        msg: "This is the find by pk",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Product.",
      });
    });
};

exports.getAllProductWithDetailes = function (req, res) {
  Prouduct.findAll({
    where: { is_bublished: true },
    include: [
      {
        model: ProductDetailes,
      },
      {
        model: Image,
      },
    ],
  }) 
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
exports.findById = function (req, res) {
  Prouduct.findByPk(req.params.id)
    .then((data) => {
      res.send({
        data: data,
        msg: "This is the find by pk",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    });
};
exports.updateProductInfo = function (req, res) {
  const ProductID = req.params.ProductID;
   
  Prouduct.update(req.body, {
    where: { ProductID: ProductID },
  })

    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${ProductID}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + ProductID,
      });
    });
};

exports.deleteProduct = function (req, res) {
  const ProductID = req.params.ProductID;

  Prouduct.destroy(
    {
      where: { ProductID: ProductID },
    },
    ProductDetailes.destroy({
      where: { ProductID: ProductID },
    }),
    Image.destroy({
      where: { ProductID: ProductID },
    })
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Prouduct was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Prouduct with id=${ProductID}. Maybe Prouduct was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Prouduct with id=" + ProductID,
      });
    });
};
exports.searchProduct = (req, res) => {
  const CName = req.params.id;
  const BrandName = req.params.id;
  const PName = req.params.id;
  var condition = PName ? { ProductName: { [Op.like]: `%${PName}%` } }: null;
  var condition2 = CName ? { CategoryID: { [Op.like]: `%${CName}%` } }: null;
  var condition3 = BrandName ? { BrandName: { [Op.like]: `%${CName}%` } }: null;
  Prouduct.findAll({ 
    
     where:{
      [Op.or]:[ 
      condition,
      condition2,
      condition3
    ] },
      attributes: ['ProductName' ,'is_bublished'],
       include:[
         {
          model: ProductDetailes,
          attributes:['Size', 'Color'],
         },
    //    { 
    //      model: Category,
    //     attributes:['CategoryName'],
    //     include:[{
    //       model:Brand,
    //       attributes:['BrandName'],
    //       through: {
    //         attributes: [],
    //       }
    //     }
    //   ]
    //   }
      ]
     
    
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
exports.searchCategory = (req, res) => {
  const CName = req.params.CategoryName;
  const BrandName = req.query.brands;
  const PName = req.params.ProductName;
  // var condition = PName ? { ProductName: { [Op.like]: `%${PName}%` } }: null;
  var condition2 = CName ? { CategoryName: { [Op.like]: `%${CName}%` } }: null;
  Category.findAll({ 
    
     where:{
      [Op.or]:[ 
      // condition,
      condition2
    ] },
      //attributes: ['ProductName','Description','is_bublished'],
       include:[
         {
          model: Product,
          //attributes:['Size','Price','Color'],
         },
       { 
         model: Brand,
      //   attributes:['CategoryName'],
      //   include:[{
      //     model:Brand,
      //     attributes:['BrandName'],
      //     through: {
      //       attributes: [],
      //     }
      //   }
      // ]
      }
      ]
     
    
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};


// exports.updateProductInfo = function (req, res) {
//   const DetailesID = req.params.DetailesID;

//   ProductDetailes.findByPk(req.params)
   
//   //   where: { ProductID: ProductID },
//   // })
//     .then(data => {
     
//     //data.Price=data.Price
//     ProductDetailes.update(data,{
//       where:{DetailesID: data.DetailesID}
//     })
//     res.send(data);
//   })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Product with id=" + DetailesID,
//       });
//     });
// };

exports.addOrder = function(req, res){
    if (!req.body.OrderID || !req.body.TotalPrice  || !req.body.Quantity 
        || !req.body.OrderDate || !req.body.status) {
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
        CartID:req.body.CartID,
        TotalPrice: req.body.TotalPrice,
        Quantity: req.body.Quantity, 
        OrderDate: req.body.OrderDate,
        status: req.body.status
      };
    
       
      // Save Tutorial in the database
      Order.create(order)
        .then(data => {
           ProductDetailes.update(
               {
              Quantity: (Quantity- req.body.Quantity)
           },
          
        {
              where: { ProductID: req.body.ProductID }
        })
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Order."
          });
        });
}