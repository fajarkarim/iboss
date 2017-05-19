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
  db.Department.findOne({
    where:{
      name: dept
    }
  }).then((departemen) => {
    console.log(departemen);
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
  let complete = req.body.complete
  db.Task.findOne({
    where: {
      id: id
    }
  })
  .then((tugas) => {
    tugas.update({
      name: ganti,
      completion: complete
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
  db.Department.findAll()
  .then( departements => {
    let promises = [];
    departements.forEach( (dept) =>{
      let promise = new Promise( (res, rej) =>{
        dept.getTasks().then( _tasks => {
          obj = {name: dept.name, tasks: _tasks }
          res(obj)
        })

      } )
      promises.push(promise)

    })
    Promise.all(promises)
    .then( _departements => {

      res.render('index', {departments: _departements})
    })
    .catch( err => {

    })
  })
  // db.Task.findAll({include: {model: db.Department}
  // })
  // .then((tasks) => {
  //   res.render('index', { data: tasks, percentage: percent})
  // })
})

router.get('/report', (req, res, next) => {
  db.Department.findAll()
  .then( departements => {
    let promises = [];
    departements.forEach( (dept) =>{
      let promise = new Promise( (res, rej) =>{
        dept.getTasks().then( _tasks => {
          obj = {name: dept.name, tasks: _tasks }
          res(obj)
        })

      } )
      promises.push(promise)

    })
    Promise.all(promises)
    .then( _departements => {

      res.render('report', {departments: _departements, percentage: percent})
    })
    .catch( err => {

    })
  })
})

//untuk search
router.post('/search/', (req, res, next) => {
  let search = req.body.search
  db.Task.findAll({
    include: {
      model: db.Department
    },
    where: {
      name: {
        $like: `%${search}%`
      }
    }
  })
  .then((tasks) => {
    res.render('search', { data: tasks})
  })
  .catch(err => {
    res.render('error')
  })
})



module.exports = router;
