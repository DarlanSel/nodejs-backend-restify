const errors = require('restify-errors');
const Rate = require('../models/rate');
const config = require('../config');

module.exports = server => {
  // Get Rates
  server.get('/rates', async (req, res, next) => {
    try {
      res.send(await Rate.find({}));
      next();
    } catch (e) {
      return next(new errors.InvalidContentError(e));
    }
  });

  // Get Single Rate
  server.get('/rates/:id', async (req, res, next) => {
    try {
      res.send(await Rate.findById(req.params.id));
      next();
    } catch (e) {
      return next(new errors.ResourceNotFoundError(`There is no rate with the id of ${req.params.id}`));
    }
  });

  // Add Rate
  server.post('/rates', async (req, res, next) => {
      const { productId, userId, value } = req.body;

      const rate = new Rate({ productId, userId, value });

      try {
        const newRate = await rate.save();
        res.send(201, newRate);
        next();
      } catch (e) {
        return next(new errors.InternalError(e.message));
      }
    }
  );

  // Update Rate
  server.put('/rates/:id', async (req, res, next) => {
    const id = req.params.id;
    const { productId, userId, value } = req.body;

    var rate = await Rate.findById(id);
    if (!rate) return next(new errors.ResourceNotFoundError(`There is no rate with the id of ${req.params.id}`));

    try {
      await rate.updateOne({ productId, userId, value });
      res.send(201, rate);
      next();
    } catch (e) {
      return next(new errors.ResourceNotFoundError(e.message));
    }
  });

  // Delete Rate
  server.del('/rates/:id', async (req, res, next) => {
    const id = req.params.id;

    var rate = await Rate.findById(id);
    if (!rate) return next(new errors.ResourceNotFoundError(`There is no rate with the id of ${req.params.id}`));

    try {
      await rate.remove();
      res.send(200, rate);
      next();
    } catch (e) {
      return next(new errors.ResourceNotFoundError(e.message));
    }
  });
};
