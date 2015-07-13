var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var authorController = require('../controllers/author_controller');

// Home page
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Questions page
router.get('/quizes/question', quizController.question);

// Answers page
router.get('/quizes/answer', quizController.answer);

// Author page
router.get('/author', authorController.author);

module.exports = router;
