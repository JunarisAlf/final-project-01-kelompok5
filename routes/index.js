const router = require('express').Router();
const usersRouter = require('./users-router');
const reflectionsRouter = require('./reflections-router');
const errorMiddleware = require('../middlewares/error-middleware');
const authMiddleware = require('../middlewares/auth-middleware');


router.use(usersRouter);

router.use(authMiddleware);

router.use(reflectionsRouter);


router.use((req, res, next) => {
  next({ name: 'PageNotFound' });
});

router.use(errorMiddleware);

module.exports = router;