Router.configure({
	layoutTemplate: 'siteLayout'
});

Router.route('/', function () {
 	this.render('mainPage');
});

Router.route('/recommended', function () {
 	this.render('mainPage');
});

Router.route('/site/:_id', function () {
	this.render('siteDetails', {data: Websites.findOne({_id: this.params._id})});
});
