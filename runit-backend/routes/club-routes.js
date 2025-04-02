const express = require('express');
const router = express.Router();
const controller = require('../controllers/club-controller');

router.post('', controller.createClub); // create
router.post('/:id', controller.updateClub); // update
router.get('/:id', controller.retrieveClub); // retrieve
router.delete('/:id', controller.deleteClub); // delete
router.get('', controller.listClubs); // retrieve all

module.exports = router;