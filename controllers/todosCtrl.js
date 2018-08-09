var db = require('../models');
var Todo = db.Todo;
var util = require('./utils');
var seedTodos = require('../seeds/todos')

module.exports = {
  index: (req, res) => {
    Todo.find(function (err, allTodos) {
      err ? res.status(500).json({ error: err.message }) :
        res.json({ todos: allTodos });
    });
  },

  create: (req, res) => {
      var newTodo = req.body;
      Todo.create(newTodo, function (err, savedTodo) {
        err ? res.status(500).json({ error: err.message }) :
        res.json(savedTodo);
      });
  },

  show: (req, res) => {
      var todoId = req.params.todoId;
      Todo.findOne({ _id: todoId }, util.getSingularResponse.bind(res));
  },

  nuke: (req, res) => {
    Todo.remove({}, function (err, removedTodos) {
      err ? res.status(500).json({ error: err.message }) :
        Todo.create(seedTodos, function (err, createdTodos) {
          err ? res.status(500).json({ error: err.message }) :
            res.redirect('/todos');
        });
      });
  },

  destroy: (req, res) => {
    console.log(req.params)
    var todoId = req.params.todoId;
    Todo.findByIdAndRemove(todoId, function (err, removedTodo) {
      err ? res.status(500).json({ error: err.message }) :
      res.json(removedTodo);
    });
  },

  update: (req, res) => {
    // console.log(req.params)
    var todoId = req.params.todoId;
    var updateTodo = req.body;
    Todo.findByIdAndUpdate(todoId, req.body, { new: true }, function(err, updatedTodo) {
      err ? res.status(500).json({ error: err.message }) :
      res.json(updatedTodo);
    });
  }
};
