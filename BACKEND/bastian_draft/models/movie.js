'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.hasMany(models.User);
    }
  };
  Movie.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Movie title must be filled ."
        }
      }
    },
    synopsis: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Movie synopsis must be filled ."
        }
      }
    },
    genre: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Movie genre must be filled ."
        }
      }
    },
    trailer:{
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Movie trailer must be filled ."
        },
        isUrl : {
          msg : "Movie trailer must be URL format thanks."
        }
      }
    },
    poster: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Movie poster must be filled ."
        },
        isUrl : {
          msg : "Movie poster must be URL format thanks."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};