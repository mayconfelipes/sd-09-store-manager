const {
  register,
  getAll,
  getById,
} = require('../services/salesServices');

const status200 = 200;

const salesRegister = async (req, res, next) => {
  const sales = req.body;
  try{
    const result = await register(sales);
    res.status(status200).json(result);
  } catch(error) {
    next(error);
  }
};

const getAllSales = async (req, res, next) => {
  try{
    const allSales = await getAll();
    res.status(status200).json({ sales: allSales});
  } catch(error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getById(id);
    res.status(status200).json(result);
  } catch(error) {
    next(error);
  }
};

module.exports = {
  salesRegister,
  getAllSales,
  getSaleById,
};
