var getSite = function(site_id) {
	if (!Meteor.user()) {
		throw new Meteor.error("You must be signed in to vote");
	}
	var site = Websites.findOne({_id: site_id});
	if (!site) {
		throw new Meteor.error("site not found");
	}
	return site;
};

var vote = function(site, modifier) {
	modifier.$inc = {};
	if (modifier.$pull) {
		if (modifier.$pull.up) {
			modifier.$inc.up_votes = -1;
		}
		if (modifier.$pull.down) {
			modifier.$inc.down_votes = -1;
		}
	};
	if (modifier.$push) {
		if (modifier.$push.up) {
			modifier.$inc.up_votes = 1;
		}
		if (modifier.$push.down) {
			modifier.$inc.down_votes = 1;
		}
	}
	Websites.update(site._id, modifier);
};

Meteor.methods({
	upvote: function(site_id) {
		var site = getSite(site_id);

		var modifier = {};
		if (_.contains(site.up, this.userId)) {
			modifier.$pull = { up: this.userId };
		} else {
			modifier.$push = { up: this.userId };
			if (_.contains(site.down, this.userId)) {
				modifier.$pull = { down: this.userId };
			}
		}
		vote(site, modifier);
	},
	downvote: function(site_id) {
		var site = getSite(site_id);

		var modifier = {};
		if (_.contains(site.down, this.userId)) {
			modifier.$pull = { down: this.userId };
		} else {
			modifier.$push = { down: this.userId };
			if (_.contains(site.up, this.userId)) {
				modifier.$pull = { up: this.userId };
			}
		}
		vote(site, modifier);
	}
});