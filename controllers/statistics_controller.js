// Requisitos:
// - El número de preguntas
// - El número de comentarios totales
// - El número medio de comentarios por pregunta
// - El número de preguntas sin comentarios
// - El número de preguntas con comentarios

var models = require('../models/models.js');
var Sequelize = require('sequelize');

exports.show = function(req, res) {
	var stats = {};

	Sequelize.Promise
		.all([
			models.Quiz.count(),
			models.Comment.count(),
			models.Quiz.findAll({
				include: [{
					model: models.Comment
				}]
			})
		])
		.then(function(values) {
			stats.num_quizes = values[0];
			stats.num_comments = values[1];

			stats.avg_comments = 0;
			if (stats.num_quizes > 0) {
				stats.avg_comments = (stats.num_comments / stats.num_quizes).toFixed(2);
			}

			stats.with_comment = 0;
			for (var i in values[2]) {
				if (values[2][i].Comments.length) {
					stats.with_comment++;
				}
			}
			stats.without_comment = stats.num_quizes - stats.with_comment;
		})
		.catch(function(err) {
			next(err);
		})
		.finally(function() {
			res.render('statistics/show', {
				title: 'Estadísticas',
				stats: stats,
				errors: []
			});
		});
};
