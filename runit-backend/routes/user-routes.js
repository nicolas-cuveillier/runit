const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');

router.post('', controller.createUser); // create
router.put('/:id', controller.updateUser); // update
router.post('/auth', controller.loginUser); // login
router.get('/:id', controller.retrieveUser); // retrieve
router.delete('/:id', controller.deleteUser); // delete
router.get('', controller.listUsers); // retrieve all


module.exports = router;