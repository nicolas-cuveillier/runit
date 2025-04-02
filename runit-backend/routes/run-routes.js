const express = require('express');
const router = express.Router();
const controller = require('../controllers/run-controller');

router.post('', controller.createRun); // create
router.post('/:id', controller.updateRun); // update
router.get('/:id', controller.retrieveRun); // retrieve
router.delete('/:id', controller.deleteRun); // delete

// Daily job to create runs from recurrent
controller.createRunsFromRecurrent();

module.exports = router;