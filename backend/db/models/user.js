// 'use strict';
// const bcrypt = require('bcryptjs');
// const { Model } = require('sequelize');
// const { Validator } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     toSafeObject() {
//       const { firstName, lastName, id, username, email } = this;
//       return { firstName, lastName, id, username, email };
//     }
//     validatePassword(password) {
//       return bcrypt.compareSync(password, this.hashedPassword.toString());
//     }
//     static getCurrentUserById(id) {
//       return User.scope('currentUser').findByPk(id);
//     }
//     static async login({ credential, password }) {
//       const { Op } = require('sequelize');
//       const user = await User.scope('loginUser').findOne({
//         where: {
//           [Op.or]: {
//             username: credential,
//             email: credential,
//           },
//         },
//       });
//       if (user && user.validatePassword(password)) {
//         return await User.scope('currentUser').findByPk(user.id);
//       }
//     }
//     static async signup({ firstName, lastName, username, email, password }) {
//       const hashedPassword = bcrypt.hashSync(password);
//       const user = await User.create({
//         firstName,
//         lastName,
//         username,
//         email,
//         hashedPassword
//       });
//       return await User.scope('currentUser').findByPk(user.id);
//     }


//     static associate(models) {
//       User.hasMany(
//         models.Spot,
//         {
//           foreignKey: 'ownerId',
//           onDelete: 'CASCADE',
//           hooks: true,
//         }
//       );
//       User.hasMany(
//         models.Booking,
//         {
//           foreignKey: 'userId',
//           onDelete: 'CASCADE',
//           hooks: true,
//         }
//       );
//       User.hasMany(
//         models.Review,
//         {
//           foreignKey: 'userId',
//           onDelete: 'CASCADE',
//           hooks: true,
//         }
//       );
//     }
//   }

//   User.init(
//     {
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           len: [4, 30],
//           isNotEmail(value) {
//             if (Validator.isEmail(value)) {
//               throw new Error('Cannot be an email.');
//             }
//           }
//         }
//       },
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [3, 256],
//           isEmail: true
//         }
//       },
//       hashedPassword: {
//         type: DataTypes.STRING.BINARY,
//         allowNull: false,
//         validate: {
//           len: [60, 60]
//         }
//       }
//     },
//     {
//       sequelize,
//       modelName: 'User',
//       defaultScope: {
//         attributes: {
//           exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
//         }
//       },
//       scopes: {
//         currentUser: {
//           attributes: { exclude: ['hashedPassword', 'createdAt', 'updatedAt'] }
//         },
//         loginUser: {
//           attributes: {}
//         }
//       }
//     }
//   );
//   return User;
// };

'use strict';
const { Model } = require('sequelize');
//const { Validator } = require('sequelize');
const { validateEmail } = require('../../utils/validation');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, email, username } = this; // context will be the User instance
      return { id, firstName, lastName, email, username };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: { // allows user to sign in with either username or email
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        email,
        username,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here
      User.hasMany(models.Spot, { foreignKey: 'ownerId' })
      User.hasMany(models.Booking, { foreignKey: 'userId' })
      User.hasMany(models.Review, { foreignKey: 'userId' })
    }
  };

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          validateEmail
          // isNotEmail(value) {
          //   if (Validator.isEmail(value)) {
          //     throw new Error("Cannot be an email.");
          //   }
          // }
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
