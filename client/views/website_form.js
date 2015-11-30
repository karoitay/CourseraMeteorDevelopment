var isValid = function(field, value) {
	if (!value) {
		alert(field + " cannot be empty");
		return false;
	}
	return true;
};

Template.website_form.events({
	"click .js-toggle-website-form": function(event) {
		$("#website_form").toggle('slow');
	},
	"input, change, paste, keyup, mouseup #url": function(event) {
		if (event.target.value.trim() === "") {
			$(".js-get-metadata-button").attr('disabled','disabled');
		} else {
			$(".js-get-metadata-button").removeAttr("disabled");
		}
	},
	"click .js-get-metadata-button": function(event) {
		$("#website_form :input").attr("disabled", true);
		var form = $("#website_form");
		console.log(form);
		console.log(form.find("#url").val().trim());
		extractMeta(form.find("#url").val(), function(err, res) {
			$("#website_form :input").attr("disabled", false);
			if (err) {
				alert(err);
			} else {
				console.log(res);
				if (res.title) {
					form.find("#title").val(res.title);
				}
				if (res.description) {
					form.find("#description").val(res.description);
				}
			}
		});
	},
	"submit .js-save-website-form": function(event) {
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
				event.target.url.value = "";
				event.target.title.value = "";
				event.target.description.value = "";
				$("#website_form").toggle('slow');
			}
		});

		return false;
	}
});