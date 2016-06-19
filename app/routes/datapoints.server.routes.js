var users = require('../../app/controllers/users.server.controller'),
	datapoints = require('../../app/controllers/datapoints.server.controller');

module.exports = function(app) {
	app.route('/api/datapoints')
		.get(datapoints.list)
		.post(users.requiresLogin, datapoints.create);

	app.route('/api/datapoints/:datapointId')
		.get(datapoints.read)
		.put(users.requiresLogin, datapoints.hasAuthorization, datapoints.update)
		.delete(users.requiresLogin, datapoints.hasAuthorization, datapoints.delete);

	app.param('datapointId', datapoints.datapointByID);

	// app.route('/api/datapoints/u/:userId')
	app.route('/api/vis/:userId')
		.get(datapoints.datapointsByUser)
		.put(users.requiresLogin, datapoints.hasAuthorization, datapoints.update);

	app.param('userId', datapoints.datapointsByUser);
};
