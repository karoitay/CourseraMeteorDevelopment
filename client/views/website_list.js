var getScores = function(userId, userVotedSites) {
	var scores = _.flatten(_.map(userVotedSites, function(site) {
		var upscore = 1;
		var downscore = -1;
		if (_.contains(site.down, userId)) {
			upscore = -1;
			downscore = 1;
		} else if (!_.contains(site.up, userId)) {
			console.log("User vote with no up or down");
			return [];
		}
		return _.map(site.up, function(upvote) {
			return { userId: upvote, score: upscore };
		}).concat( _.map(site.down, function(downvote) {
			return { userId: downvote, score: downscore };
		}));
	}));
	var userScores = _.groupBy(scores, function(score) {
		return score.userId;
	});
	
	scores = {};
	_.each(_.keys(userScores), function(userId) {
		scores[userId] = _.reduce(userScores[userId], function(sum, score) { return sum + score.score }, 0);
	});
	return scores;
}

Template.website_list.helpers({
	websites:function(){
		var allSites = Websites.find({}, {sort: {up_votes : -1, down_votes: 1, createdOn: -1}}).fetch();
		if (ActiveRoute.path('/') || !Meteor.user()) {
			return allSites;
		} else {
			var userId = Meteor.user()._id;
			var userVotedSites = _.filter(allSites, function(site) {
				return _.contains(site.up, userId) || _.contains(site.down, userId);
			});
			var userUnvotedSites = _.difference(allSites, userVotedSites);
			var scores = getScores(userId, userVotedSites);
			console.log(scores);
			console.log(userUnvotedSites);
			_.each(userUnvotedSites, function(site) {
				console.log("site " + site._id);
				var score = 0;
				_.each(site.up, function(userId) {
					score += scores[userId] || 0;
					console.log("up " + userId);
				});
				_.each(site.down, function(userId) {
					console.log("down " + userId);
					score -= scores[userId] || 0;
				});
				site.score = score;
			});
			return _.sortBy(userUnvotedSites, function(site) {
				return -site.score;
			});
		}
	}
});
