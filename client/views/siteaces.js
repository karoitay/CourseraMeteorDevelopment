Router.configure({
	layoutTemplate: "siteLayout"
});

Router.route("/", function () {
 	this.render("mainPage");
 	this.render("breadcrumbs", {to: "breadcrumbs"});
});

Router.route("/recommended", function () {
 	this.render("mainPage");
 	this.render("breadcrumbs", {to: "breadcrumbs"});
});

var renderSiteDetails = function(route) {
	var data = Websites.findOne({_id: route.params._id});
	route.render("siteDetails", {data: data});
	route.render("breadcrumbs", {to: "breadcrumbs", data: data});
};

Router.route("/site/:_id", function () {
	renderSiteDetails(this);
});

Router.route("/recommended/site/:_id", function () {
	renderSiteDetails(this);
});
