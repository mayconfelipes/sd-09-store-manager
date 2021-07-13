const salesServices = require('../services/salesService');

const ok = 200;
const badRequest = 422;

const addSales = async (req, res, next) => {
  const { body } = req;
  const result = await salesServices.addSales(body);

  if (result.err) return next(result);

  res.status(ok).json(result);
};

const getSales = async (req, res, next) => {
  const result = await salesServices.getSales();

  if (result.err) return next(result);

  res.status(ok).json({sales: result});
};

const getSalesById = async (req, res, next) => {
  const { id } = req.params;
  const result = await salesServices.getSalesById(id);

  if (result.err) return next(result);

  res.status(ok).json({sales: result});
};

const updateSaleById = async (req, res, next) => {
  const { id } = req.params;

  const response = await salesServices.updateSaleById(id, req.body);
  
  if (response.err) return next(response);

  res.status(ok).json(response);
};

const deleteSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await salesServices.deleteSaleById(id);

    if (data.err) return next(data);

    return res.status(ok).json(data);
  } catch (error) {
    res.status(badRequest).json({ message: error.message });
  }
};

module.exports = {
  addSales,
  getSales,
  getSalesById,
  updateSaleById,
  deleteSaleById,
};
