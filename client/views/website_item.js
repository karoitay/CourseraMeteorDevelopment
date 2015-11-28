Template.website_item.helpers({
	upvote_btn_class: function(userId) {
		return userId && _.contains(this.up, userId) ? "btn-success" : "btn-default";
	},
	downvote_btn_class: function(userId) {
		return userId && _.contains(this.down, userId) ? "btn-success" : "btn-default";
	},
	commentCount: function() {
		return Comments.find({site_id: this._id}).count();
	}
});
Template.website_item.events({
	"click .js-upvote":function(event) {
		if (!Meteor.user()) {
			return;
		}
		var website_id = this._id;
		Meteor.call('upvote', website_id, function (error, result) {
			if (error) {
				alert("upvote error: " + error);
			}
		});

		return false;
	}, 
	"click .js-downvote":function(event) {
		if (!Meteor.user()) {
			return;
		}
		var website_id = this._id;
		Meteor.call('downvote', website_id, function (error, result) {
			if (error) {
				alert("downvote error: " + error);
			}
		});

		return false;
	}
});