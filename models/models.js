var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar DB SQLite
var sequelize = new Sequelize(null, null, null, {
	dialect: 'sqlite',
	storage: 'quiz.sqlite'
});

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// exportar la definición de la tabla Quiz
exports.Quiz = Quiz;

// sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function(){
	// then() ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		// la tabla se inicializa solo si está vacía
		if(count === 0){
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta : 'Roma'
			})
			// FIXME: esto no va a funcionar por la versión de sequelize, mirar promises
			.then(function(){
				console.log('Base de datos inicializada');
			});
		}
	});
});
