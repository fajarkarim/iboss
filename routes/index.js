var express = require('express');
var router = express.Router();
const percent = require('../helpers/helper.js')
const db = require('../models')

//untuk create Task
router.get('/assign', (req, res, next) => {
  db.Department.findAll()
  .then((departments) => {
    res.render('create', { data: departments})
  })
})

//untuk Post setelah create
router.post('/assign', (req, res, next) => {
  let task = req.body.task
  let month = req.body.bulan
  let dept = req.body.department
  console.log(dept);
  db.Department.findOne({
    where:{
      name: dept
    }
  }).then((departemen) => {
    db.Task.create({
      name: task,
      deadline: month,
      DepartmentId: departemen.id,
      completion: false
    })
  })
  .then(() => {
    res.redirect('/')
  })
})

//untuk update
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  db.Task.findById(id)
  .then((task) => {
    res.render('edit', {data: task})
  })
})
//untuk post update
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  let ganti = req.body.task;
  db.Task.findOne({
    where: {
      id: id
    }
  })
  .then((tugas) => {
    tugas.update({
      name: ganti
    })
    .then(()=>{
      res.redirect('/')
    })
  })
})

//untuk delete
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id
  db.Task.destroy({
    where:{
      id: id
    }
  })
  .then(() => {
    res.redirect('/')
  })
});

//untuk view
router.get('/', (req, res, next) => {
  db.Task.findAll({include: {model: db.Department}
  })
  .then((tasks) => {
    res.render('index', { data: tasks, percentage: percent})
  })
})

//untuk persentase
// router.get('/', (req, res, next) => {
//   db.Task.findAll({include: {model: db.Department}
//   })
//   .then((tasks) => {
//     console.log(tasks.completion);
//   })
// })

module.exports = router;
