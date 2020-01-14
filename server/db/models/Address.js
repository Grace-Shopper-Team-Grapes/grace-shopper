const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('Address', {
  street1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  street2: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      max: 5,
      min: 5
    }
  }
})

const validateZip = address => {
  address.zip = +address.zip
}

Address.beforeValidate(validateZip)
