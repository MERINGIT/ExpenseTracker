module.exports = (sequelize, DataTypes) => {
    const expense = sequelize.define("expense", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          amount: {
            type: DataTypes.FLOAT, 
            allowNull: false,
          },
    });
  
    
    return expense;
  };
  