const express = require('express');
const router = express.Router();
const handler = require('../../controllers/{{version}}/{{name}}');

router.route('/')
    .get(handler.list)
    .post(handler.create);

router.route('/:id')
    .get(handler.one)
    .put(handler.update)
    .delete(handler.delete);


module.exports = router;