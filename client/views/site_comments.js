Template.site_comments.helpers({
	comments: function() {
		return Comments.find({site_id: this._id}, {sort: {createdOn: -1}});
	}
});

Template.site_comments.events({
	"input, change, paste, keyup, mouseup .js-comment-textarea": function(event) {
		if (event.target.value.trim() === "") {
			$(".js-comment-submit-button").addClass("disabled");
		} else {
			$(".js-comment-submit-button").removeClass("disabled");
		}
	},
	"click .js-toggle-comment-form":function(event) {
		$("#comment_form").toggle('slow');
	}, 
	"click .js-comment-submit-button": function(event) {
		var comment = $("#commentTextArea").val().trim();
		$(".js-comment-submit-button").addClass("disabled");
		Comments.insert({comment: comment, site_id: this._id}, function(err) {
			if (err) {
				alert(err);
			} else {
				$("#commentTextArea").val("");
				$("#comment_form").hide('slow');
			}
		});
	}
});