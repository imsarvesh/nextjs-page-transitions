const products  = require('./products.json');

export default (req, res) => {
    res.status(200).json(products)
  }
  