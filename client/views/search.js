Template.registerHelper("searchTerm", function() {
	return (Session.get("searchTerm") || "").trim();
});
