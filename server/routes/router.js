/* eslint-disable prefer-const */
const express = require('express');

const router = express.Router();
const apiRouter = express.Router({ mergeParams: true });
const { healthGet } = require('./health/health.controller');
const imageController = require('./image/image.controller');

// api routes All routes with the api should be prefixed with api/
router.use('/api',  apiRouter);

// Health check
apiRouter.get('/health', healthGet);

// betterRX routes
apiRouter
  .route('/image')
  .post(imageController.imagePost);

// Catch all other route requests
router.all('*', (req, res, next) => {
  let error = new Error(`No matching route found: ${req.path}`);
  error.statusCode = 404;
  next(error);
});

module.exports = router;
