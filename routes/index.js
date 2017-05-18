var express = require('express');
var router = express.Router();
const db = require('../models')

//untuk create Task
router.get('/assign', (req, res, next) => {
  db.Department.findAll()
  .then((departments) => {
    res.render('create', { data: departments})
  })
})

//untuk Post setelah create
// router.post('/assign', (req, res, next) => {
//   let
//   db.Task.create({
//
//   })
//   .then((tasks) => {
//     res.render('namaAlamat', { data: Department})
//   })
// })

//untuk view
router.get('/', (req, res, next) => {
  db.Task.findAll({include: {model: db.Department}
  })
  .then((tasks) => {
    res.render('index', { data: tasks})
  })
})

module.exports = router;
