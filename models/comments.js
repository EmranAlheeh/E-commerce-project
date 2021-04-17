module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
      CommentID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      MemberID: {
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'members',

          // This is the column name of the referenced model
          key: 'MemberID'
      }
      },
      ProductID: {
        type: Sequelize.UUID,
        references: {
          // This is a reference to another model
          model: 'products',

          // This is the column name of the referenced model
          key: 'ProductID'
      }
      },
      Message: {
        type: Sequelize.STRING
      }
    },{

       
  },{
    timestamps: false
  } );
     
    return Comment;
  };