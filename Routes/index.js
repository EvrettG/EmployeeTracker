// used to conect all the routes and exporth them
const router = require('express').Router();
// routes relateing to different table api calls
const departments = require('./departments');
const roles = require('./roles');
const employees = require('./employees')

router.use('/departments', departments);
router.use('/roles',roles);
router.use('/employees',employees);

module.exports = router;