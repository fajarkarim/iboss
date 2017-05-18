var express = require('express');
var router = express.Router();
const db = require('../models')

/* GET home page. */
router.get('/', (req, res, next) => {
  db.Task.findAll({
    order: [['createdAt', 'ASC']], include: {model: db.Department}
  })
  .then((tasks) => {
    res.render('index', { data: tasks})
  })
})

module.exports = router;
