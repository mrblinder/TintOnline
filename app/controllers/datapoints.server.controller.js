var mongoose = require('mongoose'),
	Datapoint = mongoose.model('Datapoint');

var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

exports.create = function(req, res) {
	var datapoint = new Datapoint(req.body);
	datapoint.creator = req.user;
	datapoint.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(datapoint);
		}
	});
};

exports.list = function(req, res) {
	Datapoint.find().sort('-created').populate('creator', 'name username').exec(function(err, datapoints) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(datapoints);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.datapoint);
};

exports.datapointByID = function(req, res, next, id) {
	Datapoint.findById(id).populate('creator', 'name username').exec(function(err, datapoint) {
		if (err)
			return next(err);

		if (!datapoint)
			return next(new Error('Failed to load datapoint ' + id));

		req.datapoint = datapoint;
		next();
	});
};

exports.datapointsByUser = function(req, res, next, userId) {
	Datapoint.find({'creator': userId}).sort('-created').populate('creator', 'name username').exec(function(err, datapoints) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(datapoints);
		}
	});
};

exports.update = function(req, res) {
	var datapoint = req.datapoint;
	datapoint.val = req.body.val;
	datapoint.coords = req.body.coord;
	datapoint.comment = req.body.comment;
	datapoint.completed = req.body.completed;

	datapoint.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(datapoint);
		}
	});
};

exports.delete = function(req, res) {
	var datapoint = req.datapoint;
	datapoint.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(datapoint);
		}
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.datapoint.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
