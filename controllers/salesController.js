const {
  createSalesService,
  getSalesAllService,
  getSaleByIdService,
  updateSaleByIdService,
  deleteSaleByIdService,
} = require('../services/salesService');

const OK = 200;
const INVALID_DATA = 422;
const NOT_FOUND = 404;

const createSalesController = async (req, res) => {
  const sales = req.body;
  const result = await createSalesService(sales);

  if (result.err) return res.status(INVALID_DATA).json(result);

  res.status(OK).json(result);
};

const getSalesAllController = async (_req, res) => {
  const result = await getSalesAllService();

  res.status(OK).json(result);
};

const getSaleByIdController = async (req, res) => {
  const saleId = req.params.id;
  const result = await getSaleByIdService(saleId);

  if(result.err) return res.status(NOT_FOUND).json(result);

  res.status(OK).json(result);
};

const updateSaleByIdController = async (req, res) => {
  const saleId = req.params.id;
  const data = req.body;
  const result = await updateSaleByIdService(saleId, data);

  if (result.err) return res.status(INVALID_DATA).json(result);

  res.status(OK).json(result);
};

const deleteSaleByIdController = async (req, res) => {
  const saleId = req.params.id;
  const result = await deleteSaleByIdService(saleId);

  if (result.err) return res.status(INVALID_DATA).json(result);

  res.status(OK).json(result);
};

module.exports = {
  createSalesController,
  getSalesAllController,
  getSaleByIdController,
  updateSaleByIdController,
  deleteSaleByIdController,
};
