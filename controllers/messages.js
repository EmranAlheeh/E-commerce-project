const db = require("../models");
const Message = db.messages;
const User = db.user;
const getAllMessages = function (req, res) {  // (req, res)=>{  
     Message.findAll({
        attributes: ['content', ['deletedAt','deleteDate']],
        order: [['createdAt', 'DESC']],
        include: [
            { 
              model: User, // load all users data
              attributes: ['username']  
            },
          ],
  
        //paranoid: false //to retrvie even the deleted records
     })
       .then(data => {
         res.send({
           'data': data,
           'message': "Messages retrieved successfully",
           'status': 200
         });
       })
       .catch(err => {
         res.status(500).send({
           message:
             err.message || "Some error occurred while retrieving Messages."
         });
       });
   
   }


  const sendMessage = function (req, res) {

      // Validate request
  if (!req.body.content || !req.body.userId ) {
    res.status(400).send({
      message: "The message must have content and user!!!"
    });
    return;
  }

  // Create a Tutorial
  const message = {
    content: req.body.content,
    userId: req.body.userId 
  };

  // Save Tutorial in the database
  Message.create(message)
    .then(data => {
      res.send(data);
      
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the message."
      });
    });
  
  }
  
  const deleteMessage = function (req, res) {

    const id = req.query.id;
    
    Message.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Message was deleted successfully."
          });
        } else {
          res.send({
            message: "Cannot delete Message with id=" + id + ". Maybe Message was not found!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Message with id=" + id
        });
      });
  
 }
module.exports = {
    sendMessage:sendMessage, 
    deleteMessage:deleteMessage,
    getAllMessages:getAllMessages

};
