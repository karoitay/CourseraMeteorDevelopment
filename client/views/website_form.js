var isValid = function(field, value) {
	if (!value) {
		alert(field + " cannot be empty");
		return false;
	}
	return true;
};

Template.website_form.events({
	"click .js-toggle-website-form":function(event) {
		$("#website_form").toggle('slow');
	}, 
	"submit .js-save-website-form":function(event) {
		var url = event.target.url.value;
		var title = event.target.title.value;
		var description = event.target.description.value;

		if (!isValid("url", url) || !isValid("description", description)) {
			return false;
		}

		var site = {
			url: url,
			title: title,
			description: description
		};
		Websites.insert(site, function (err) {
			if (err) {
				alert(err);
			} else {
				$("#website_form").toggle('slow');
			}
		});

		return false;
	}
});