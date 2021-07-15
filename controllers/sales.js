const sales = require('../services/sales');

const create = (req, res) => sales.create([...req.body])
  .then(({ status, data }) => res.status(status).json(data));

const getAll = (_req, res) => sales.getAll()
  .then(({ status, data }) => res.status(status).json({ 'sales': data }));

const getById = (req, res, next) => sales.getById(req.params.id)
  .then(({ status, data }) => data ? res.status(status).json(data)
    : next({ status: 404, err: { code: 'not_found', message: 'Sale not found' }}));

const update = ({ body: [...args], params: { id } }, res) => sales.update(id, args)
  .then(({ status }) => res.status(status).json({ _id: id, itensSold: args }));

const remove = (req, res) => sales.remove(req.params.id)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = { create, getAll, getById, update, remove };
