var port = 1337;

module.exports = {
	port: port,
<<<<<<< HEAD
	db: 'mongodb://127.0.0.1/todos',
=======
	// db: 'mongodb://127.0.0.1/todos',
	db: 'mongodb://newadmin:Blin420der1!@ec2-52-207-239-164.compute-1.amazonaws.com:27017/dummyDB',
>>>>>>> b5808900d1c782291c54f03bd7f4ab32f78c4f85
	facebook: {
		clientID: '513828288756645',
		clientSecret: '2d7cc991efddb864e9af61f307980b9a',
		callbackURL: 'http://localhost:'+ port +'/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'yFntGKkvMZkDKL47XGtzLNdRA',
		clientSecret: 'EAiPTjPYLX5nrkpRtxYQflbWpRTqqLwwBHRLh7WpdQ1P69Tre6',
		callbackURL: 'http://localhost:'+ port +'/oauth/twitter/callback'
	}
};
