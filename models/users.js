module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      Username: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Fullname: {
        type: Sequelize.STRING
      }, 
      Address: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.STRING
      },
      Gender: {
        type: Sequelize.STRING
      },
      BirthDate: {
        type: Sequelize.STRING
      }
    },{
      timestamps: false
    } );
  
    return user;
  };