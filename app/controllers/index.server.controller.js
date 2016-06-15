exports.render = function(req, res) {
    res.render('index', {
    	title: 'Tint MX',
    	user: JSON.stringify(req.user)
    });
};
