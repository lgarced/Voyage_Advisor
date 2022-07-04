const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //name this column whatever you want
    location: {
      //this is the type of data that will be stored in this column
      type: DataTypes.STRING,
      //each time a row of data is inserted, this column will need to have a value
      allowNull: false,
    },
    date: {
      type: DataTypes.INTEGER,
      //value in this column is optional (can be nullish)
      allowNull: false,
    },
    passangers: {
      type: DataTypes.INTEGER,
      //value in this column is optional (can be nullish)
      allowNull: false,
    },
  },
  {
    hooks: {
      // //this hook/function will run everytime before a new row is inserted
      // beforeCreate: async (data) => {
      //   //modify the data/payload if you want, hash password, normalize data, etc.
      //   data.column1 = data.column1 + ' WOW!';
      //   //value for column1 will always have 'WOW!' appended to it
      //   return data;
      // },
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;