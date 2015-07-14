var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question', {
			pregunta : quiz[0].pregunta
		});
	});
	res.render('quizes/question' , {pregunta: 'Capital de Italia', title: 'Pregunta'});
};

// GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer' , {respuesta: 'Correcto', title: 'Repuesta'});
		} else {
			res.render('quizes/answer' , {respuesta: 'Incorrecto', title: 'Repuesta'});
		}
	});
};
